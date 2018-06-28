const { get, defaults } = require('lodash');

module.exports = (req, res, next) => {
    req.context = {
        user: get(req, 'user', null),
        params: defaults({}, req.params, req.headers, req.headers),
        payload: req.body,
    };
    next();
};