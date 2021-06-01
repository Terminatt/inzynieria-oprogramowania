const RoleModel = require("../model/roleModel");
const BaseController = require("./baseController");

class RolesController extends BaseController {
    constructor(req) {
        super(req);
        this.model = new RoleModel(req);
    }

    async getList(req, res, next) {
      try {
          const params = { role: req.params.roleId }
          const result = await this.getModel().getList(params);
          res.status(200).send({ success: true, documents: result.documents, total: result.total });
      } catch (err) {
          next(err);
      }
  }

}

module.exports = RolesController;
