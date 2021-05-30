const BaseModel = require('../../application/model/baseModel');
const mongoose = require("mongoose");
const _ = require("lodash");

class CategoryModel extends BaseModel {
    constructor(req) {
        super(req);
        this.setDocumentClass("Review");
    }

    async getList(params) {
        try {
            let result = await super.getList(params);
            result.documents = await this.joinCreator(result.documents);
            return result;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async get(id) {
        try {
            let document = await super.get(id);
            document = await this.joinCreator(document);
            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async joinCreator(documents) {
        try {
            await Promise.all(_.castArray(documents).map(async (document) => {
                let creatorDocument = await this.getModel("User").findOne({ _id: document.creator }).lean();
                if (creatorDocument) {
                    document.creator = {
                        name: creatorDocument.name,
                        _id: creatorDocument._id
                    };
                } else {
                    document.creator = {
                        name: "Anonimowy",
                        _id: document.creator
                    };
                }
                return document;
            }));
            return documents;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
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