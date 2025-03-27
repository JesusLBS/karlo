const {
    validJWTMiddleware,
} = require("../../middlewares/auth/auth.middleware");
const purchaseorderRouter = require("./v1/index");

module.exports = (router) => {
    router.use("/purchaseorder", validJWTMiddleware, purchaseorderRouter);
};
