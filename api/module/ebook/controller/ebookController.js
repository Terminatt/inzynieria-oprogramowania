const BaseController = require("../../application/controller/baseController");
const EbookModel = require("../model/ebookModel");

class EbookController extends BaseController {
    constructor(req) {
        super(req);
        this.model = new EbookModel(req);
    }
}

module.exports = EbookController;
