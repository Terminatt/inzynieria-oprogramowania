const BaseModel = require('../../application/model/baseModel');
const fs = require('fs');
const _ = require('lodash');
const mongoose = require("mongoose");
const moment = require("moment");
const findNextFileName = require('find-next-file-name');

class EbookModel extends BaseModel {
    constructor(req) {
        super(req);
        this.setDocumentClass("Ebook");
    }

    async setAllData(data, document) {
        try {
            this.setAllowedData(data, document);

            if ('title' in data) {
                document = await this.setTitle(document, data.title);
            }

            if ('author' in data) {
                document.author = data.author;
            }

            if ('publisher' in data) {
                document.publisher = data.publisher;
            }

            if ('releaseDate' in data) {
                document.releaseDate = data.releaseDate;
            }

            if ('numberOfPages' in data) {
                document.numberOfPages = data.numberOfPages;
            }

            if ('releaseDate' in data) {
                document.releaseDate = moment(data.releaseDate, "X").toDate();
            }

            if ('categories' in data) {
                document = await this.setCategories(document, data.categories);
            }

            if (!_.isEmpty(this.getReq().files)) {
                document = await this.setFiles(document, this.getReq().files);
            }

            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async setTitle(document, title) {
        try {
            let categoryDocument = await this.getModel(this.getDocumentClass()).findOne({ title: title, creator: this.getLoggedUser()._id, _id: { $ne: document._id } }).lean();
            if (categoryDocument) {
                this.addValidationError("Ebook o tym tytule już istnieje", "title");
            }
            document.title = title;
            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async setCategories(document, categories) {
        try {
            document.categories = [];
            let loggedUser = this.getLoggedUser();

            let promises = categories.map(async (category, index) => {
                let categoryDocument = await this.getModel("Category").findOne({ _id: category, creator: loggedUser._id }).lean();
                if (categoryDocument) {
                    document.categories.push(categoryDocument);
                } else {
                    this.addValidationError("Kategoria nie istnieje", `categories.${index}`);
                }
            });
            await Promise.all(promises);
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

    async setFiles(document, files) {
        try {
            if (_.isArray(files)) {
                let promises = files.map(async (file) => {
                    if (file.fieldname === "coverImage") {
                        document.coverImage = await this.setFile(file);
                    } else if (file.fieldname === "file") {
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
                return `${process.env.API_HOST}/media/${fileName}`;
            } else {
                throw new AppError("No file", 404);
            }
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

}

module.exports = EbookModel;