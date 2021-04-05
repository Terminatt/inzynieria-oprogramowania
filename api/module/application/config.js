const express = require("express");
const Router = express.Router();
const AuthController = require("./controller/authController");

Router.post("/login", (req, res, next) => {
    const Controller = new AuthController(req);
    Controller.login(req, res, next);
});

Router.get("/isAuth", (req, res, next) => {
    const Controller = new AuthController(req);
    Controller.isAuth(req, res, next);
});

module.exports = Router;
