const BaseModel = require("../model/baseModel");

class BaseController {

    constructor(req) {
        if (this.model === undefined) {
            this.model = new BaseModel(req);
        }
    }

    getModel() {
        return this.model;
    }

    async getList(req, res, next) {
        try {
            const params = req.query;
            const result = await this.getModel().getList(params);
            res.status(200).send({ success: true, documents: result.documents, total: result.total });
        } catch (err) {
            next(err);
        }
    }

    async get(req, res, next) {
        try {
            const id = req.params.id;
            const document = await this.getModel().get(id);
            res.status(200).send({ success: true, document });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const data = req.body;
            const result = await this.getModel().create(data);
            res.status(201).send({ success: true, document: result });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const result = await this.getModel().delete(id);
            res.status(209).send({ success: true });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const data = req.body;
            const id = req.params.id;
            const result = await this.getModel().update(id, data);
            res.status(201).send({ success: true, document: result });
        } catch (err) {
            next(err);
        }
    }

}

module.exports = BaseController;
