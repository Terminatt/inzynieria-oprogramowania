const BaseController = require("../../application/controller/baseController");
const CategoryModel = require("../model/categoryModel");

class CategoryController extends BaseController {
    constructor(req) {
        super(req);
        this.model = new CategoryModel(req);
    }
}

module.exports = CategoryController;
