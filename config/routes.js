const createRouter = require('express').Router;

module.exports = app => {
    const router = createRouter();

    router.all('/', (req, res, next) => {
        res.json({ Hello: 'there!'});
    });

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
