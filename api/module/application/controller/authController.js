const BaseController = require("./baseController");
const AuthModel = require("../model/authModel");

class AuthController extends BaseController {
    constructor(req) {
        super(req);
        this.model = new AuthModel(req);
    }

    async login(req, res, next) {
        try {
            const data = req.body;
            const result = await this.getModel().login(data);
            if (result.success) {
                res.status(200).send({ ...result });
            } else {
                return res.status(401).send({ success: false, err: { message: "Brak autoryzacji" } });
            }
        } catch (err) {
            next(err);
        }
    }

    async isAuth(req, res, next) {
        try {
            const data = req.headers['authorization'];
            let result = await this.getModel().isAuth(data);
            if (result) {
                res.status(200).send({ ...result });
            } else {
                return res.status(401).send({ success: false, err: { message: "Brak autoryzacji" } });
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;
