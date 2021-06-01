const express = require("express");
const Router = express.Router();
const multer = require('multer');
const upload = multer({ dest: __dirname + '/../../tmp', limits: { fileSize: 20971520 } });
const cpUpload = upload.any();
const requireAuth = require("../../middleware/requireAuth");
const UserController = require("./controller/userController");
const LibraryController = require("./controller/libraryController");

//Biblioteka
Router.get("/library", (req, res, next) => requireAuth(req, res, next, "Library", "DISPLAY"), cpUpload, (req, res, next) => {
    const Controller = new LibraryController(req);
    Controller.getList(req, res, next);
});

Router.get("/library/:id", (req, res, next) => requireAuth(req, res, next, "Library", "DISPLAY"), cpUpload, (req, res, next) => {
    const Controller = new LibraryController(req);
    Controller.get(req, res, next);
});

Router.post("/library", (req, res, next) => requireAuth(req, res, next, "Library", "CREATE"), cpUpload, (req, res, next) => {
    const Controller = new LibraryController(req);
    Controller.create(req, res, next);
});

Router.put("/library/:id", (req, res, next) => requireAuth(req, res, next, "Library", "EDIT"), cpUpload, (req, res, next) => {
    const Controller = new LibraryController(req);
    Controller.update(req, res, next);
});

Router.delete("/library/:id", (req, res, next) => requireAuth(req, res, next, "Library", "DELETE"), cpUpload, (req, res, next) => {
    const Controller = new LibraryController(req);
    Controller.delete(req, res, next);
});

//Użytkownicy
Router.get("/user", (req, res, next) => requireAuth(req, res, next, "User", "DISPLAY"), (req, res, next) => {
    const Controller = new UserController(req);
    Controller.getList(req, res, next);
});

Router.get("/user/:id", (req, res, next) => requireAuth(req, res, next, "User", "DISPLAY"), (req, res, next) => {
    const Controller = new UserController(req);
    Controller.get(req, res, next);
});

Router.post("/user", (req, res, next) => requireAuth(req, res, next, "User", "CREATE"), (req, res, next) => {
    const Controller = new UserController(req);
    Controller.create(req, res, next);
});

Router.put("/user/:id", (req, res, next) => requireAuth(req, res, next, "User", "EDIT"), (req, res, next) => {
    const Controller = new UserController(req);
    Controller.update(req, res, next);
});

Router.delete("/user/:id", (req, res, next) => requireAuth(req, res, next, "User", "DELETE"), (req, res, next) => {
    const Controller = new UserController(req);
    Controller.delete(req, res, next);
});

module.exports = Router;
