const _ = require('lodash');
const moment = require('moment');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const EntityManager = require("../service/entityManager");

class BaseModel {
    constructor(req) {
        this.req = req;
        this.loggedUser = req ? req.loggedUser || null : null;
        this.validationErrors = {};
        this.edit = false;
    }

    getReq() {
        return this.req;
    }

    //Funkcja zwraca dane zalogowanego użytkownika
    getLoggedUser() {
        return this.loggedUser;
    }

    parseObjectId(id) {
        return mongoose.Types.ObjectId(id);
    }

    getModel(name) {
        EntityManager.checkInit();
        if (EntityManager.isRegistered(name)) {
            return mongoose.model(name);
        } else {
            EntityManager.initModel(name);
            return mongoose.model(name);
        }
    }

    setDocumentClass(name) {
        this.documentClass = name;
    }

    getDocumentClass() {
        return this.documentClass;
    }

    setIdEdit() {
        this.edit = true;
    }

    isEdit() {
        return this.edit;
    }

    isUserType(type) {
        return _.get(this.loggedUser, "type") === type;
    }


    getSchemaFields() {
        let paths = [];
        let schema = this.getModel(this.getDocumentClass()).schema;
        schema.eachPath((path) => {
            paths.push(path);
        });
        //Dodane zwracanie także ścieżek z embedów
        _.each(schema.childSchemas, (childSchema) => {
            childSchema.schema.eachPath((path) => {
                paths.push(`${childSchema.model.path}.${path}`);
            });
        });
        return paths;
    }

    async getList(params, filter = {}) {
        try {
            params = Object.assign({}, params);
            params = this.parseRequestParams(params);
            if (!_.isEmpty(filter)) {
                params.unshift({ $match: filter });
            }
            let results = await this.getModel(this.getDocumentClass()).aggregate(params);
            let total = _.get(results, '[0].total', 0);
            results = _.get(results, '[0].results', []);;

            return { documents: results, total };
        } catch (err) {
            throw new AppError(err.message);
        }
    }

    async get(id, filter = {}) {
        try {
            if (!this.isValidObjectId(id)) {
                throw new AppError('Nieprawidłowe id dokumentu', 422);
            }
            let result = await this.getModel(this.getDocumentClass()).findOne({ _id: id, ...filter }).lean();
            if (result) {
                return result;
            } else {
                throw new AppError('Nie znaleziono dokumentu', 404);
            }
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async create(data, returnAll = false) {
        try {
            let documentClass = this.getDocumentClass();
            let model = this.getModel(documentClass);
            let document = new model();

            document = await this.setAllData(data, document);
            let errors = this.validateDocument(document);
            if (errors) {
                throw errors;
            }
            let result = await model.create([document]);
            if (result instanceof Array) {
                return result[0];
            } else {
                throw new AppError("Wystąpił błąd przy zapisie dokumentu", 422);
            }
        } catch (err) {
            if (err.name === 'ValidationError') {
                throw new AppError(this.parseValidationErrors(err), 422);
            } else {
                throw new AppError(err.message, err.status);
            }
        }
    }

    async update(id, data, filter = {}) {
        try {
            if (!this.isValidObjectId(id)) {
                throw new AppError('Nieprawidłowe id dokumentu', 422);
            }
            this.setIdEdit();
            let model = this.getModel(this.getDocumentClass());
            let document = await model.findOne({ _id: id, ...filter });
            if (document) {
                document = await this.setAllData(data, document);
                let errors = this.validateDocument(document);
                if (errors) {
                    throw errors;
                }
                await model.updateOne({ _id: id }, { $set: document });
                return document.toObject();
            } else {
                throw new AppError('Nie znaleziono dokumentu', 404);
            }
        } catch (err) {
            if (err.name === 'ValidationError') {
                throw new AppError(this.parseValidationErrors(err), 422);
            } else {
                throw new AppError(err.message, err.status);
            }
        }
    }

    async delete(id) {
        try {
            if (!this.isValidObjectId(id)) {
                throw new AppError('Nieprawidłowe id dokumentu', 422);
            }
            let model = this.getModel(this.getDocumentClass());
            let document = await model.findOne({ _id: id });
            if (document) {
                let result = await model.updateOne({ _id: id }, { $set: { deletedAt: new Date() } });
                return result;
            } else {
                throw new AppError('Nie znaleziono dokumentu', 404);
            }
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    parseRequestParams(params, lookup = null) {
        let { select, limit, offset, sort } = params;

        let pipeline = [];
        let match = this.parseQueryFields(params);
        pipeline.push({ $match: match });

        if (lookup) {
            pipeline.push({ $lookup: lookup });
        }

        if (sort && _.isObject(sort)) {
            let sortQuery = {};
            _.forEach(sort, (value, param) => {
                sortQuery[param] = parseInt(value);
            });
            pipeline.push({ $sort: sortQuery });
        }
        pipeline.push({ $group: { '_id': null, 'total': { '$sum': 1 }, 'results': { '$push': '$$ROOT' } } });

        limit = limit ? parseInt(limit) : 20;
        offset = offset ? parseInt(offset) : 0;
        pipeline.push({ $project: { total: 1, results: { $slice: ['$results', offset, limit] } } });

        if (select) {
            select = select.split(',');
            let project = {};
            select.map((field) => {
                _.set(project, `results.${field}`, 1);
            });
            project.total = 1;
            project.results._id = 1;
            pipeline.push({ $project: project });
        }

        return pipeline;
    }

    isValidObjectId(id) {
        let objIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
        return objIdRegex.test(id);
    }

    parseQueryFields(params) {
        let match = {};
        let cmp_operators = ['gt', 'gte', 'lt', 'lte', 'exists'];
        let arr_operators = ['in', 'nin', 'ne'];
        let complex_operators = ['orgt', 'orgte', 'orlt', 'orlte', 'orexists', 'orin', 'ornin', 'orne'];
        let orFields = [];
        let fields = this.getSchemaFields();
        _.forEach(params, (value, param) => {
            if (_.includes(fields, param)) {
                if (_.isObject(value)) {
                    _.each(value, (val, key) => {
                        let isOperator = false;
                        let isOr = false
                        if (_.includes(arr_operators, key)) {
                            isOperator = true;
                            val = val.split(',');
                            val = val.map((v) => this.parseAggregateValue(v, param));
                        } else if (_.includes(cmp_operators, key)) {
                            isOperator = true;
                            val = this.parseAggregateValue(val, param);
                        } else if (key === "or") {
                            isOr = true;
                            let cond = {};
                            val = this.parseAggregateValue(val, param);
                            cond[param] = val;
                            orFields.push(cond);
                        } else if (_.includes(complex_operators, key)) {
                            isOr = true
                            let splitKey = _.replace(key, "or", "")
                            if (arr_operators.includes(splitKey)) {
                                val = val.split(',');
                                val = val.map((v) => this.parseAggregateValue(v, param));
                            } else {
                                val = this.parseAggregateValue(val, param, splitKey);
                            }
                            let cond = { [param]: { ["$" + splitKey]: val } };
                            orFields.push(cond);
                        }

                        if (!isOr) {
                            if (isOperator) {
                                key = '$' + key;
                                if (match[param]) {
                                    match[param][key] = val;
                                } else {
                                    match[param] = { [key]: val };
                                }
                            } else {
                                match[`${param}.${key}`] = val;
                            }
                        }
                    });
                } else {
                    match[param] = this.parseAggregateValue(value, param);
                }
            }
        });
        match['deletedAt'] = { $exists: false };
        if (!_.isEmpty(orFields)) {
            match.$or = orFields;
        }
        return match;
    }

    parseAggregateValue(value, key, modifier) {
        let schema = this.getModel(this.getDocumentClass()).schema;
        let schemaPath = schema.path(key);
        let type = schemaPath ? schemaPath.instance : undefined;
        let searchExact = schemaPath ? _.get(schemaPath, "options.searchExact", false) : false;
        if (modifier === "exists") {
            type = "Boolean";
        }
        if (type === "Array") {
            type = schemaPath['$embeddedSchemaType'].instance;
        }
        switch (type) {
            case "ObjectID": {
                let objIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
                return objIdRegex.test(value) ? mongoose.Types.ObjectId(value) : value;
            }
            case "Date": {
                if (value instanceof Date) {
                    return moment(value).isValid() ? moment(value).toDate() : value;
                } else {
                    return moment(value, "X").isValid() ? moment(value, "X").toDate() : value;
                }
            }
            case "String": {
                if (searchExact) {
                    return value;
                } else {
                    return new RegExp(_.escapeRegExp(value), "gi");
                }
            }
            case "Boolean": {
                if (value === 'true') {
                    return true;
                } else if (value === 'false') {
                    return false;
                } else {
                    return !!value;
                }
            }
            case "Number": {
                return !isNaN(value) ? parseInt(value) : value;
            }
            default: {
                return value;
            }
        }
    }

    setAllowedData(data, document) {
        if (document) {
            let user = this.getLoggedUser();

            if (!document.createdAt) {
                document.createdAt = new Date();
            }

            if (!document.creator) {
                if (user) {
                    document.creator = _.get(user, '_id', null);
                }
            }
        }
        return document;
    }


    parseValidationErrors(err) {
        let parsedErrors = {};
        if (err && err.errors) {
            _.each(err.errors, (obj, path) => {
                _.setWith(parsedErrors, path, obj.message, Object);
            });
        }
        if (_.isEmpty(parsedErrors)) {
            parsedErrors["message"] = "Wystąpił nieznany błąd";
        }
        return JSON.stringify(parsedErrors);
    }

    validateDocument(document) {
        if (_.isFunction(_.get(document, 'validateSync'))) {
            let errors = document.validateSync();
            if (errors) {
                return errors
            }
        }
        if (this.hasValidationErrors()) {
            let to_parse = this.getValidationErrors();
            let validationError = new mongoose.Error.ValidationError(null);

            _.each(to_parse, (message, path) => {
                validationError.addError(path, new mongoose.Error.ValidatorError({ message: message }));
            });
            return validationError;
        }
    }

}

module.exports = BaseModel;