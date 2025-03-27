const authRouter = require('./v1/index');

module.exports = (router) => {
    router.use('/auth', authRouter);
};
