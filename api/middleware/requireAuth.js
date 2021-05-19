const config = require("../config/config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userSchema = require("../module/application/schema/user");
const _ = require("lodash");

module.exports = async (req, res, next, entity, action) => {
  try {
    const token = req.headers['authorization'];
    if (token) {
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!!decoded) {
        if (mongoose.modelNames().indexOf("User") === -1) {
          mongoose.model("User", userSchema);
        }
        let loggedUser = await mongoose.model("User").findOne({ _id: decoded._id })
          .populate('role');
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
        if (loggedUser.role.name !== "superAdmin") {
          const acl = await mongoose.model("Acl").findOne({
            entityName: entity,
            role: loggedUser.role._id
          });

          if (!acl || !acl.permissions.includes(action)) {
            throw new AppError("Brak autoryzacji", 401);
          }
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