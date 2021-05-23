const BaseModel = require('../../application/model/baseModel');
const mongoose = require("mongoose");

class CategoryModel extends BaseModel {
    constructor(req) {
        super(req);
        this.setDocumentClass("Review");
    }

    async update(id, data) {
        try {
            return super.update(id, data, { creator: mongoose.Types.ObjectId(this.getLoggedUser()._id) });
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


    async setAllData(data, document) {
        try {
            this.setAllowedData(data, document);

            if ('ebookId' in data) {
                document = await this.setEbookId(document, data.ebookId);
            }

            if ('stars' in data) {
                document.stars = data.stars;
            }

            if ('comment' in data) {
                document.comment = data.comment;
            }

            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async setEbookId(document, ebookId) {
        try {
            let reviewDocument = await this.getModel(this.getDocumentClass()).findOne({ ebookId: ebookId, creator: this.getLoggedUser()._id }).lean();
            if (!reviewDocument) {
                let ebookDocument = await this.getModel("Ebook").findOne({ _id: ebookId }).lean();
                if (ebookDocument) {
                    document.ebookId = ebookDocument._id;
                } else {
                    this.addValidationError("Ebook nie istnieje", "ebookId");
                }
            } else {
                this.addValidationError("Dodano już ocenę do tego ebooka", "ebookId");
            }
            return document;
        } catch (err) {
            throw new AppError(err.message, err.status, err.field);
        }
    }

}

module.exports = CategoryModel;