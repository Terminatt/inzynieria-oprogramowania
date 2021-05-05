const BaseModel = require('../../application/model/baseModel');
const mongoose = require("mongoose");

class CategoryModel extends BaseModel {
    constructor(req) {
        super(req);
        this.setDocumentClass("Category");
    }

    async setAllData(data, document) {
        try {
            this.setAllowedData(data, document);

            if ('name' in data) {
                document = await this.setName(document, data.name);
            }

            if ('description' in data) {
                document.description = data.description;
            }

            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async setName(document, name) {
        try {
            let categoryDocument = await this.getModel(this.getDocumentClass()).findOne({ name: name, creator: this.getLoggedUser()._id, _id: { $ne: document._id } }).lean();
            if (categoryDocument) {
                this.addValidationError("Kategoria o tej nazwie już istnieje", "name");
            }
            document.name = name;
            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async getList(params) {
        try {
            return super.getList(params, { creator: mongoose.Types.ObjectId(this.getLoggedUser()._id) });
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async get(id) {
        try {
            return super.get(id, { creator: mongoose.Types.ObjectId(this.getLoggedUser()._id) });
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async delete(id) {
        try {
            return super.delete(id, { creator: mongoose.Types.ObjectId(this.getLoggedUser()._id) });
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }
}

module.exports = CategoryModel;