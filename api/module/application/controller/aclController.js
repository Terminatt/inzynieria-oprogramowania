const AclModel = require("../model/aclModel");
const BaseController = require("./baseController");

class AclController extends BaseController {
    constructor(req) {
        super(req);
        this.model = new AclModel(req);
    }

    async createOrUpdate(req, res, next) {
      try {
          const data = req.body;
          const result = await this.getModel().createOrUpdate(data);
          res.status(201).send({ success: true, document: result });
      } catch (err) {
          next(err);
      }
  }

}

module.exports = AclController;
