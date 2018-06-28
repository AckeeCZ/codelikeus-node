const createRouter = require('express').Router;
const helloController = require('../app/controllers/api/helloController');
const userController = require('../app/controllers/api/userController');

module.exports = app => {
    const router = createRouter();

    router.all('/', helloController.getHello);

    router.get('/api/v1/users', userController.getUsers);
    router.get('/api/v1/users/:userId', userController.getUser);
    router.post('/api/v1/users', userController.postUsers);
    router.delete('/api/v1/users/:userId', userController.deleteUser);
    router.put('/api/v1/users/:userId', userController.putUser);

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
