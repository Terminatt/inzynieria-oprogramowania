const BaseModel = require('../../application/model/baseModel');
const _ = require("lodash");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

class UserModel extends BaseModel {
    constructor(req) {
        super(req);
        this.setDocumentClass("User");
    }

    async getPopulatedList(params, filter = {}) {
        try {
            params = Object.assign({}, params);
            params = this.parseRequestParams(params);
            if (!_.isEmpty(filter)) {
                params.unshift({ $match: filter });
            }
            let results = await this.getModel(this.getDocumentClass()).find({}).populate('role');
            let total = await this.getModel(this.getDocumentClass()).find({}).count();
            
            return { documents: results, total };
        } catch (err) {
            throw new AppError(err.message);
        }
    }

    async getList(params) {
        try {
            let result = await this.getPopulatedList(params);
            result.documents = result.documents.map((user) => {
                delete user.password;
                return user;
            });
            return result;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async get(id) {
        try {
            let document = await super.get(id);
            delete document.password;
            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async setAllData(data, document) {
        try {
            this.setAllowedData(data, document);

            if ('email' in data) {
                document = await this.setEmail(document, data.email);
            }

            if ('role' in data) {
                document = await this.setRole(document, data.role);
            }

            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    setAllowedData(data, document) {
        try {
            super.setAllowedData(data, document);

            if ('active' in data) {
                document.active = !!data.active;
            }

            if ('name' in data) {
                document.name = data.name;
            }

            if ('sex' in data) {
                document.sex = data.sex;
            }

            if ('password' in data && !_.isEmpty(data.password)) {
                document = this.setPassword(document, data.password);
            }

            return document;
        } catch (err) {
            throw new AppError(err.message);
        }
    }

    async setEmail(document, email) {
        try {
            let exists = await this.getModel(this.getDocumentClass()).findOne({ email: email, _id: { $ne: document._id } });
            if (exists) {
                this.addValidationError("Użytkownik o tym mailu już istnieje", "email");
            }
            document.email = email;
            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async setRole(document, roleId) {
        try {
            let roleDocument = await this.getModel("Role").findOne({ _id: roleId }).lean();
            if (!roleDocument) {
                this.addValidationError("Rola nie istnieje", "role");
            }
            document.role = roleId;
            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    setPassword(document, password) {
        try {
            let passwordError = [];
            if (password.length < 6) {
                passwordError.push("Hasło musi mieć minimum 6 znaków");
            }
            if (!(/[A-Z]/.test(password))) {
                passwordError.push("Hasło musi zawierać przynajmniej jedną wielką literę");
            }
            if (!(/\d/.test(password))) {
                passwordError.push("Hasło musi zawierać przynajmniej jedną cyfrę");
            }
            if (!_.isEmpty(passwordError)) {
                this.addValidationError(`${_.join(passwordError, ", ")}`, "password");
            } else {
                document.password = this.encryptPassword(password);
            }
            return document;
        } catch (err) {
            throw new AppError(err.message);
        }
    }

    encryptPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

}

module.exports = UserModel;