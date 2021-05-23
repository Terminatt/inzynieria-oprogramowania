const BaseController = require("../../application/controller/baseController");
const ReviewModel = require("../model/reviewModel");

class ReviewController extends BaseController {
    constructor(req) {
        super(req);
        this.model = new ReviewModel(req);
    }
}

module.exports = ReviewController;
