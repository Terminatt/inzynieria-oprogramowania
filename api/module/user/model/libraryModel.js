const BaseModel = require('../../application/model/baseModel');
const _ = require('lodash');
const fs = require("fs");
const mongoose = require("mongoose");
const findNextFileName = require('find-next-file-name');

class LibraryModel extends BaseModel {
    constructor(req) {
        super(req);
        this.setDocumentClass("Library");
    }

    async getAverageRating(documents) {
        try {
            await Promise.all(_.castArray(documents).map(async (document) => {
                let documentRatings = await this.getModel("Review").find({ ebookId: document._id }).lean();
                if (documentRatings.length > 0) {
                    let sum = 0;
                    _.each(documentRatings, (rating) => sum += rating.stars);
                    document.nrOfRatings = _.size(documentRatings);
                    document.averageRating = _.round(sum / _.size(documentRatings), 1)
                } else {
                    document.nrOfRatings = 0;
                    document.averageRating = null;
                }
                return document;
            }));
            return documents;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async get(id, filter = {}) {
        try {
            if (!this.isValidObjectId(id)) {
                throw new AppError('Nieprawidłowe id dokumentu', 422);
            }
            let result = await this.getModel(this.getDocumentClass()).findOne({ _id: id, ...filter }).populate("Ebook").lean();
            if (result) {
                return result;
            } else {
                throw new AppError('Nie znaleziono dokumentu', 404);
            }
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async setAllData(data, document) {
        try {
            this.setAllowedData(data, document);

            if ('ebookId' in data && !document.ebookId) {
                document = await this.setEbookId(document, data.ebookId);
            }

            if (!_.isEmpty(this.getReq().files)) {
                document = await this.setFiles(document, this.getReq().files);
            }

            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async setEbookId(document, ebookId) {
        try {
            let libraryDocument = await this.getModel(this.getDocumentClass()).findOne({ ebookId: ebookId, creator: this.getLoggedUser()._id }).lean();
            if (!libraryDocument) {
                let ebookDocument = await this.getModel("Ebook").findOne({ _id: ebookId }).lean();
                if (ebookDocument) {
                    document.ebookId = ebookDocument._id;
                } else {
                    this.addValidationError("Ebook nie istnieje", "ebookId");
                }
            } else {
                this.addValidationError("Ebook został już dodany do biblioteki użytkownika", "ebookId");
            }
            return document;
        } catch (err) {
            throw new AppError(err.message, err.status, err.field);
        }
    }

    async getList(params) {
        try {
            let result = await super.getList(params, { creator: mongoose.Types.ObjectId(this.getLoggedUser()._id) });
            result.documents = await this.joinEbookData(result.documents);
            
            result.documents = result.documents.filter((el) => !!el.ebook);

            for (const el of result.documents) {
                el.ebook = await this.getAverageRating(el.ebook);
            }
            return result;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async get(id) {
        try {
            let document = await super.get(id, { creator: mongoose.Types.ObjectId(this.getLoggedUser()._id) });
            document = await this.joinEbookData(document);
            return document;
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

    async joinEbookData(documents) {
        try {
            await Promise.all(_.castArray(documents).map(async (document) => {
                document.ebook = await this.getModel("Ebook").findOne({ _id: document.ebookId }).lean();
                return document;
            }));
            return documents;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async setFiles(document, files) {
        try {
            if (_.isArray(files)) {
                let promises = files.map(async (file) => {
                    if (file.fieldname === "file") {
                        document.file = await this.setFile(file);
                    }
                });
                await Promise.all(promises);
            }
            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async setFile(file) {
        try {
            if (file) {
                let dir = `${__dirname}/../../../media`;
                //Tworzenie folderu z mediami jeśli nie istnieje
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                let fileName = findNextFileName(dir, _.deburr(file.originalname));
                let src = dir + `/${fileName}`;
                fs.writeFileSync(src, fs.readFileSync(file.path));
                // document.name = fileName;
                return fileName;
            } else {
                throw new AppError("No file", 404);
            }
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

}

module.exports = LibraryModel;