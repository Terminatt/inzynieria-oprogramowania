const BaseController = require("../../application/controller/baseController");
const UserModel = require("../model/userModel");

class UserController extends BaseController {
    constructor(req) {
        super(req);
        this.model = new UserModel(req);
    }

}

module.exports = UserController;
