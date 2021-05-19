const express = require("express");
const requireAuth = require("../../middleware/requireAuth");
const Router = express.Router();
const AuthController = require("./controller/authController");
const RegisterController = require("./controller/registerController");
const RolesController = require("./controller/roleController");
const AclController = require("./controller/aclController");

Router.post("/register", (req, res, next) => {
    const Controller = new RegisterController(req);
    Controller.register(req, res, next);
});

Router.get("/activateAccount/:token", (req, res, next) => {
    const Controller = new RegisterController(req);
    Controller.activateAccount(req, res, next);
});

Router.post("/login", (req, res, next) => {
    const Controller = new AuthController(req);
    Controller.login(req, res, next);
});

Router.get("/isAuth", (req, res, next) => {
    const Controller = new AuthController(req);
    Controller.isAuth(req, res, next);
});

Router.get("/roles", requireAuth, (req, res, next) => {
    const Controller = new RolesController();
    Controller.getList(req, res, next);
})

Router.get("/roles/:id", requireAuth, (req, res, next) => {
    const Controller = new RolesController();
    Controller.get(req, res, next);
})

Router.post("/roles", requireAuth, (req, res, next) => {
    const Controller = new RolesController();
    Controller.create(req, res, next);
})

Router.put("/roles", requireAuth, (req, res, next) => {
    const Controller = new RolesController();
    Controller.update(req, res, next);
})

Router.delete("/roles", requireAuth, (req, res, next) => {
    const Controller = new RolesController();
    Controller.delete(req, res, next);
})

Router.get("/permissions/types", requireAuth, (req, res, next) => {
    const Controller = new AclController();
    Controller.getPermissionTypes(req, res, next);
})

Router.get("/permissions/:roleId", requireAuth, (req, res, next) => {
    const Controller = new AclController();
    Controller.getList(req, res, next);
})

Router.post("/permissions", requireAuth, (req, res, next) => {
    const Controller = new AclController();
    Controller.createOrUpdate(req, res, next);
})

module.exports = Router;
