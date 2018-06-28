const userService = require('../../services/userService');

exports.getAuth = (req, res, next) => {
    userService.userLogin(req.body)
        .then(out => {
            res.json(out);
        })
        .catch(next);
};
