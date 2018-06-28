const { defaults } = require('lodash');
const jwt = require('jwt-simple');

module.exports = (secret) => {
    return {
        pack: (data, exp) => jwt.encode(defaults({ exp }, data), secret),
        unpack: (token) => jwt.decode(token, secret)
    };
};
