const express = require("express");
const UserController = require("../../interfaces/controllers/user-controller");
const {
  UserRequest,
  UserValidation,
} = require("../../../../../request/UserRequest");
const {
  UserUidBodyRequest,
  UserUidBodyValidation,
} = require("../../../../../request/UserUidBodyRequest");
const {
  UserUidParamRequest,
  UserUidParamValidation,
} = require("../../../../../request/UserUidParamRequest");

const router = express.Router();
const controller = new UserController();

router
  .get("/:limit/:page/:sort/:direction/:withTrashed/:search", controller.index)
  .post("/", UserRequest, UserValidation, controller.store)
  .put("/", UserRequest, UserValidation, controller.update)
  .post(
    "/deactivate",
    UserUidBodyRequest,
    UserUidBodyValidation,
    controller.deactivate,
  )
  .post(
    "/restore",
    UserUidBodyRequest,
    UserUidBodyValidation,
    controller.activate,
  )
  .delete(
    "/:dataId",
    UserUidParamRequest,
    UserUidParamValidation,
    controller.destroy,
  )
  .get(
    "/:dataId",
    UserUidParamRequest,
    UserUidParamValidation,
    controller.show,
  );

module.exports = router;
