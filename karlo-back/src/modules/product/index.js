const {
    validJWTMiddleware,
} = require("../../middlewares/auth/auth.middleware");
const productRouter = require("./v1/index");

module.exports = (router) => {
    router.use("/product", productRouter);
};
