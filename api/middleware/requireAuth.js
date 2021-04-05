const config = require("../config/config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userSchema = require("../module/application/schema/user");
const _ = require("lodash");

module.exports = async (req, res, next) => {
  try {
    const tokenExists = req.headers['authorization'] ? req.headers['authorization'].startsWith('JWT:') : null;
    if (tokenExists) {
      const token = req.headers['authorization'].split(":")[1];
      let decoded = jwt.verify(token, config.application.JWT_SECRET);
      if (!!decoded) {
        if (mongoose.modelNames().indexOf("User") === -1) {
          mongoose.model("User", userSchema);
        }
        let loggedUser = await mongoose.model("User").findOne({ _id: decoded._id }).lean();
        if (!loggedUser) {
          throw new AppError("Brak autoryzacji", 401);
        } else {
          if (!loggedUser.active) {
            throw new AppError("Konto nieaktywne", 401);
          }
          delete loggedUser.password;
          loggedUser._id = loggedUser._id.toString();
          req.loggedUser = loggedUser;
        }
        next();
      } else {
        throw new AppError("Brak autoryzacji", 401);
      }
    } else {
      throw new AppError("Brak autoryzacji", 401);
    }
  } catch (error) {
    let err = new AppError("Brak autoryzacji", 401);
    next(err);
  }
};