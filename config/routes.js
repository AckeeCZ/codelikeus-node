const createRouter = require('express').Router;
const HttpError = require('../app/errors/HttpError');
const NotFound = require('../app/errors/NotFound');
const { jsonParser } = require('../app/server');
const helloController = require('../app/controllers/api/helloController');
const userController = require('../app/controllers/api/userController');

module.exports = app => {
    const router = createRouter();
    router.use(jsonParser());

    router.all('/', helloController.getHello);

    router.get('/api/v1/users', userController.getUsers);
    router.get('/api/v1/users/:userId', userController.getUser);
    router.post('/api/v1/users', userController.postUsers);
    router.delete('/api/v1/users/:userId', userController.deleteUser);
    router.put('/api/v1/users/:userId', userController.putUser);

    router.use((req, res, next) => {
        next(new NotFound('Route does not exist'));
    });
    router.use((error, req, res, next) => {
        if (error instanceof HttpError) {
            res.status(error.code);
        } else {
            res.status(500);
        }
        res.json({ 
            message: error.message,
            stack: error.stack,
        });
    });

    app.use(router);
};
