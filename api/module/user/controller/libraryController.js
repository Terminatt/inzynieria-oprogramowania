const BaseController = require("../../application/controller/baseController");
const LibraryModel = require("../model/libraryModel");

class LibraryController extends BaseController {
    constructor(req) {
        super(req);
        this.model = new LibraryModel(req);
    }
}

module.exports = LibraryController;
