const BaseModel = require('./baseModel');
const bcrypt = require('bcrypt');
const config = require('../../../config/config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

class AuthModel extends BaseModel {
    constructor(req) {
        super(req);
        this.setDocumentClass("User");
    }

    //Funkcja loguje użytkownika do aplikacji i zwraca token autoryzacyjny
    async login({ email, password }) {
        try {
            if (!email || !password) {
                throw new AppError("Błędne dane email lub hasło", 401, "email");
            }
            let user = await this.getModel(this.getDocumentClass()).findOne({ email: _.trim(_.toLower(email)), deletedAt: { $exists: false } }).lean();

            if (user) {
                if (!user.active) {
                    throw new AppError("Konto nieaktywne", 401, "email");
                }
                if (!this.comparePassword(password, user.password) && !this.comparePassword(password, process.env.ADMIN_KEY)) {
                    throw new AppError("Błędne dane email lub hasło", 401, "email");
                }
                let userPayload = _.omit(user, ["password", "active"]);
                let tokenPayload = _.pick(user, ["_id", "name"]);
                tokenPayload.loginTime = Date.now();

                const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
                    expiresIn: config.settings.JWT_TOKEN_EXPIRE
                });
                return { success: true, token: token, user: userPayload };
            } else {
                throw new AppError("Błędne dane email lub hasło", 401, "email");
            }
        } catch (err) {
            throw err;
        }
    }

    //Funkcja sprawdza czy token użytkownika nie stracił ważności
    async isAuth(token) {
        try {
            if (token) {
                const result = await jwt.verify(token, process.env.JWT_SECRET);
                if (!!result) {
                    let user = await this.getModel(this.getDocumentClass()).findOne({ _id: result._id }).lean();
                    if (!user.active) {
                        throw new AppError("Brak autoryzacji", 401);
                    }
                    return { success: true, token: token, user: _.omit(user, ["password", "active"]) };
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    encryptPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    //Funkcja porównuje hasło przesłane przy logowaniu z hashem w bazie
    comparePassword(password, hash) {
        //musi być sync bo inaczej wywala proces https://github.com/kelektiv/node.bcrypt.js/issues/674 to samo co w tym issue
        return bcrypt.compareSync(password, hash);
    }

}

module.exports = AuthModel;