const express = require("express");
const Router = express.Router();
const AuthController = require("./controller/authController");
const RegisterController = require("./controller/registerController");

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

module.exports = Router;
