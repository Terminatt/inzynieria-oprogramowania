const AclModel = require("../model/aclModel");
const BaseController = require("./baseController");
const { PERMISSIONS } = require("../../../constants");

class AclController extends BaseController {
    constructor(req) {
        super(req);
        this.model = new AclModel(req);
    }

    async getList(req, res, next) {
        try {
            const params = req.query;
            const result = await this.getModel().getList(params, {role: this.model.parseObjectId(req.params.roleId)});
            res.status(200).send({ success: true, documents: result.documents, total: result.total });
        } catch (err) {
            next(err);
        }
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

  async getPermissionTypes(req, res, next) {
    try {
        res.status(201).send({ success: true, document: PERMISSIONS });
    } catch (err) {
        next(err);
    }
}

}

module.exports = AclController;
