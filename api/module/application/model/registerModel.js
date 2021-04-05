const BaseModel = require('./baseModel');
const _ = require('lodash');
const config = require('../../../config/config');
const bcrypt = require('bcrypt');
const moment = require("moment");
const MailService = require("../service/mailService");

class RegisterModel extends BaseModel {
    constructor(req) {
        super(req);
        this.setDocumentClass("User");
    }

    async register(data) {
        try {
            let model = this.getModel(this.getDocumentClass());
            let document = new model();
            document = await this.setAllData(data, document);
            let errors = this.validateDocument(document);
            if (errors) {
                throw errors;
            }
            let result = await model.create([document]);
            if (result instanceof Array) {
                let userId = _.get(result, '[0]._id', null);
                let tokenModel = this.getModel("Token");
                let registerToken = new tokenModel();
                registerToken.user = userId;
                const tokenString = this.generateToken(10) + userId;
                registerToken.token = tokenString
                registerToken.action = "register";
                registerToken.activeUntil = moment().add(config.settings.REGISTER_TOKEN_EXPIRE, "minutes").toDate();

                await registerToken.save();
                await MailService.sendRegisterMail(document, tokenString);
                return _.omit(result[0], ["password"]);
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

    async activateAccount(token) {
        try {
            let tokenDocument = await this.getModel("Token").findOne({ token: token, action: "register" });

            if (tokenDocument) {
                let userDocument = await this.getModel("User").findOne({ _id: tokenDocument.user });
                if (userDocument) {
                    if (userDocument.active) {
                        throw new AppError("Konto zostało już aktywowane", 403);
                    } else {
                        await this.getModel("User").updateOne({ _id: tokenDocument.user }, { $set: { active: true } });
                        await this.getModel("Token").updateOne({ token: token }, { $set: { deletedAt: new Date() } });
                        return true;
                    }
                } else {
                    throw new AppError("Nie znaleziono powiązanego konta", 404);
                }
            } else {
                throw new AppError("Nieprawidłowy token", 404);
            }
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

            return document;
        } catch (err) {
            throw new AppError(err.message, err.status);
        }
    }

    setAllowedData(data, document) {
        try {
            super.setAllowedData(data, document);

            if ('name' in data) {
                document.name = data.name;
            }

            if ('sex' in data) {
                document.sex = data.sex;
            }

            if ('password' in data && !document.password) {
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

    generateToken(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}

module.exports = RegisterModel;