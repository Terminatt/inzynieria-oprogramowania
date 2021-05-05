const express = require("express");
const Router = express.Router();
const multer = require('multer');
const upload = multer({ dest: __dirname + '/../../tmp', limits: { fileSize: 20971520 } });
const cpUpload = upload.any();
const requireAuth = require("../../middleware/requireAuth");
const EbookController = require("./controller/ebookController");
const CategoryController = require("./controller/categoryController");

//Kategorie

Router.get("/category", requireAuth, (req, res, next) => {
    const Controller = new CategoryController(req);
    Controller.getList(req, res, next);
});

Router.get("/category/:id", requireAuth, (req, res, next) => {
    const Controller = new CategoryController(req);
    Controller.get(req, res, next);
});

Router.put("/category/:id", requireAuth, (req, res, next) => {
    const Controller = new CategoryController(req);
    Controller.update(req, res, next);
});

Router.delete("/category/:id", requireAuth, (req, res, next) => {
    const Controller = new CategoryController(req);
    Controller.delete(req, res, next);
});

Router.post("/category", requireAuth, (req, res, next) => {
    const Controller = new CategoryController(req);
    Controller.create(req, res, next);
});

//Ebooki

Router.get("/ebook", requireAuth, (req, res, next) => {
    const Controller = new EbookController(req);
    Controller.getList(req, res, next);
});

Router.get("/ebook/:id", requireAuth, (req, res, next) => {
    const Controller = new EbookController(req);
    Controller.get(req, res, next);
});

Router.post("/ebook", requireAuth, cpUpload, (req, res, next) => {
    const Controller = new EbookController(req);
    Controller.create(req, res, next);
});

Router.put("/ebook/:id", requireAuth, cpUpload, (req, res, next) => {
    const Controller = new EbookController(req);
    Controller.update(req, res, next);
});

Router.delete("/ebook/:id", requireAuth, (req, res, next) => {
    const Controller = new EbookController(req);
    Controller.delete(req, res, next);
});

module.exports = Router;
