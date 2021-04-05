const BaseController = require("./baseController");
const RegisterModel = require("../model/registerModel");

class RegisterController extends BaseController {
    constructor(req) {
        super(req);
        this.model = new RegisterModel(req);
    }

    async register(req, res, next) {
        try {
            const data = req.body;
            const result = await this.getModel().register(data);
            res.status(201).send({ success: true, document: result });
        } catch (err) {
            next(err);
        }
    }

    async activateAccount(req, res, next) {
        try {
            const token = req.params.token;
            await this.getModel().activateAccount(token);
            res.sendFile("registerSuccess.html", { root: './html' });
        } catch (err) {
            res.sendFile("registerFail.html", { root: './html' });
        }
    }
}

module.exports = RegisterController;
