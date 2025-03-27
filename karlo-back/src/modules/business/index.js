const {
    validJWTMiddleware,
} = require("../../middlewares/auth/auth.middleware");
const businessRouter = require("./v1/index");

module.exports = (router) => {
    router.use("/admin/business", validJWTMiddleware, businessRouter);
};
