const helloService = require('../../services/helloService');

exports.getHello = (req, res, next) => {
    helloService.sayHello()
        .then(out => res.json(out))
        .catch(next);
};
