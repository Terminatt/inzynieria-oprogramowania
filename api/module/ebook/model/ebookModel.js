const BaseModel = require('../../application/model/baseModel');
const LibraryModel = require('../../user/model/libraryModel');
const fs = require('fs');
const _ = require('lodash');
const moment = require("moment");
const findNextFileName = require('find-next-file-name');

class EbookModel extends BaseModel {
    constructor(req) {
        super(req);
        this.setDocumentClass("Ebook");
    }

    async create(data) {
        try {
            let result = await super.create(data);
            //Dodanie utworzonego ebooka do biblioteki użytkownika
            let libraryModel = new LibraryModel(this.getReq());
            await libraryModel.create({ ebookId: result._id });
            return result;
        } catch (err) {
            if (err.name === 'ValidationError') {
                throw new AppError(this.parseValidationErrors(err), 422);
            } else {
                throw new AppError(err.message, err.status);
            }
        }
    }

    async setAllData(data, document) {
        try {
            this.setAllowedData(data, document);

            if ('title' in data) {
                document.title = data.title;
            }

            if ('description' in data) {
                document.description = data.description;
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

            await this.checkExists(document);

            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async checkExists(document) {
        try {
            let ebookDocument = await this.getModel(this.getDocumentClass()).findOne({ title: document.title, author: document.author, _id: { $ne: document._id } }).lean();
            if (ebookDocument) {
                this.addValidationError("Ebook o tym tytule i autorze już istnieje", "title");
            }
            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    async setCategories(document, categories) {
        try {
            document.categories = [];

            let promises = categories.map(async (category, index) => {
                let categoryDocument = await this.getModel("Category").findOne({ _id: category }).lean();
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

    async setFiles(document, files) {
        try {
            if (_.isArray(files)) {
                let promises = files.map(async (file) => {
                    if (file.fieldname === "coverImage") {
                        document.coverImage = await this.setFile(file);
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

module.exports = EbookModel;