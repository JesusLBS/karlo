const {
    validJWTMiddleware,
} = require("../../middlewares/auth/auth.middleware");
const userRouter = require("./v1/index");

module.exports = (router) => {
    router.use("/admin/user", userRouter);
};
