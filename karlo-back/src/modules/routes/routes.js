const routerv1 = require('./v1/index.router');
const route = `/karlo/api/`;

module.exports = (app) => {
    app.use(`${route}v1`, routerv1);
};