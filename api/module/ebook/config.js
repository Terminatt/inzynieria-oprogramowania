const express = require("express");
const Router = express.Router();
const multer = require('multer');
const upload = multer({ dest: __dirname + '/../../tmp', limits: { fileSize: 20971520 } });
const cpUpload = upload.any();
const requireAuth = require("../../middleware/requireAuth");
const EbookController = require("./controller/ebookController");
const ReviewController = require("./controller/reviewController");
const CategoryController = require("./controller/categoryController");

//Kategorie

Router.get("/category", (req, res, next) => requireAuth(req, res, next, "Category", "DISPLAY"), (req, res, next) => {
    const Controller = new CategoryController(req);
    Controller.getList(req, res, next);
});

Router.get("/category/:id", (req, res, next) => requireAuth(req, res, next, "Category", "DISPLAY"), (req, res, next) => {
    const Controller = new CategoryController(req);
    Controller.get(req, res, next);
});

Router.put("/category/:id", (req, res, next) => requireAuth(req, res, next, "Category", "EDIT"), (req, res, next) => {
    const Controller = new CategoryController(req);
    Controller.update(req, res, next);
});

Router.delete("/category/:id", (req, res, next) => requireAuth(req, res, next, "Category", "DELETE"), (req, res, next) => {
    const Controller = new CategoryController(req);
    Controller.delete(req, res, next);
});

Router.post("/category", (req, res, next) => requireAuth(req, res, next, "Category", "CREATE"), (req, res, next) => {
    const Controller = new CategoryController(req);
    Controller.create(req, res, next);
});

//Ebooki

Router.get("/ebook", (req, res, next) => requireAuth(req, res, next, "Ebook", "DISPLAY"), (req, res, next) => {
    const Controller = new EbookController(req);
    Controller.getList(req, res, next);
});

Router.get("/ebook/:id", (req, res, next) => requireAuth(req, res, next, "Ebook", "DISPLAY"), (req, res, next) => {
    const Controller = new EbookController(req);
    Controller.get(req, res, next);
});

Router.post("/ebook", (req, res, next) => requireAuth(req, res, next, "Ebook", "CREATE"), cpUpload, (req, res, next) => {
    const Controller = new EbookController(req);
    Controller.create(req, res, next);
});

Router.put("/ebook/:id", (req, res, next) => requireAuth(req, res, next, "Ebook", "EDIT"), cpUpload, (req, res, next) => {
    const Controller = new EbookController(req);
    Controller.update(req, res, next);
});

Router.delete("/ebook/:id", (req, res, next) => requireAuth(req, res, next, "Ebook", "DELETE"), (req, res, next) => {
    const Controller = new EbookController(req);
    Controller.delete(req, res, next);
});

//Ebooki

Router.get("/review", (req, res, next) => requireAuth(req, res, next, "Review", "DISPLAY"), (req, res, next) => {
    const Controller = new ReviewController(req);
    Controller.getList(req, res, next);
});

Router.get("/review/:id", (req, res, next) => requireAuth(req, res, next, "Review", "DISPLAY"), (req, res, next) => {
    const Controller = new ReviewController(req);
    Controller.get(req, res, next);
});

Router.post("/review", (req, res, next) => requireAuth(req, res, next, "Review", "EDIT"), cpUpload, (req, res, next) => {
    const Controller = new ReviewController(req);
    Controller.create(req, res, next);
});

Router.put("/review/:id", (req, res, next) => requireAuth(req, res, next, "Review", "EDIT"), cpUpload, (req, res, next) => {
    const Controller = new ReviewController(req);
    Controller.update(req, res, next);
});

Router.delete("/review/:id", (req, res, next) => requireAuth(req, res, next, "Review", "DELETE"), (req, res, next) => {
    const Controller = new ReviewController(req);
    Controller.delete(req, res, next);
});

module.exports = Router;
