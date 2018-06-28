const userService = require('../../services/userService');

exports.getUsers = (req, res, next) => {
    userService.userList(req.query)
        .then(out => res.json(out))
        .catch(next);
};

exports.getUser = (req, res, next) => {
    userService.userDetail(req.params.userId)
        .then(out => res.json(out))
        .catch(next);
};

exports.postUsers = (req, res, next) => {
    userService.userCreate(req.body)
        .then(out => {
            res.status(201);
            res.json(out);
        })
        .catch(next);
};

exports.putUser = (req, res, next) => {
    userService.userUpdate(req.params.userId, req.body)
        .then(out => res.json(out))
        .catch(next);
};

exports.deleteUser = (req, res, next) => {
    userService.userDelete(req.params.userId)
        .then(out => {
            res.status(204).end();
        })
        .catch(next);
};

exports.getAuth = (req, res, next) => {
    userService.userLogin(req.body)
        .then(out => {
            res.json(out);
        })
        .catch(next);
};