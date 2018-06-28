const compose = require('compose-middleware').compose;
const bearer = require('./bearer');
const withHttpContext = require('./withHttpContext');

exports.httpList = (serviceMethod) => {
    return compose([
        bearer,
        withHttpContext,
        (req, res, next) => {
            serviceMethod(req.query, req.context)
                .then(out => res.json(out))
                .catch(next);
        },
    ]);
};

exports.httpDetail = (serviceMethod, idParamName) => {
    return compose([
        bearer,
        withHttpContext,
        (req, res, next) => {
            serviceMethod(req.params[idParamName], req.context)
                .then(out => res.json(out))
                .catch(next);
        },
    ]);
};

exports.httpCreate = (serviceMethod) => {
    return compose([
        bearer,
        withHttpContext,
        (req, res, next) => {
            serviceMethod(req.body, req.context)
                .then(out => res.json(out))
                .catch(next);
        },
    ]);
};

exports.httpUpdate = (serviceMethod, idParamName) => {
    return compose([
        bearer,
        withHttpContext,
        (req, res, next) => {
            serviceMethod(req.params[idParamName], req.body, req.context)
                .then(out => res.json(out))
                .catch(next);
        },
    ]);
};

exports.httpDelete = (serviceMethod, idParamName) => {
    return compose([
        bearer,
        withHttpContext,
        (req, res, next) => {
            serviceMethod(req.params[idParamName], req.context)
                .then(out => res.json(out))
                .catch(next);
        },
    ]);
};
