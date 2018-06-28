const createRouter = require('express').Router;
const HttpError = require('../app/errors/HttpError');
const NotFound = require('../app/errors/NotFound');
const { jsonParser } = require('../app/server');
const { httpDetail, httpCreate, httpDelete, httpUpdate, httpList } = require('../app/controllers/utils/httpServiceController');
const userService = require('../app/services/userService');
const helloController = require('../app/controllers/api/helloController');
const userController = require('../app/controllers/api/userController');

module.exports = app => {
    const router = createRouter();
    router.use(jsonParser());

    router.all('/', helloController.getHello);

    router.post('/api/v1/auth', userController.getAuth);
    router.get('/api/v1/users', httpList(userService.userList));
    router.get('/api/v1/users/:userId', httpDetail(userService.userDetail, 'userId'));
    router.post('/api/v1/users', httpCreate(userService.userCreate));
    router.delete('/api/v1/users/:userId', httpDelete(userService.userDelete, 'userId'));
    router.put('/api/v1/users/:userId', httpUpdate(userService.userUpdate, 'userId'));

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
