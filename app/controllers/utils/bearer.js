const { get } = require('lodash');
const userService = require('../../services/userService');

module.exports = (req, res, next) => {
    req.user = null;
    const bearerToken = get(String(req.headers['authorization']).match(/^Bearer (.*)/), 1);
    return userService.authenticateAccessToken(bearerToken)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(next);
};
