const createRouter = require('express').Router;
const helloController = require('../app/controllers/api/helloController');

module.exports = app => {
    const router = createRouter();

    router.all('/', helloController.getHello);

    router.use((req, res, next) => {
        next(new Error('Not found'));
    });
    router.use((error, req, res, next) => {
        res.status(500);
        res.json({ 
            message: error.message,
            stack: error.stack,
        });
    });

    app.use(router);
};
