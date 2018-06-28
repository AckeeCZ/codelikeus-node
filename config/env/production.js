const { defaultsDeep } = require('lodash');
const config = require('./development');

module.exports = defaultsDeep(
    {
        auth: {
            jwtSecret: 'dw5e4tgzs25415sdzs1v025',
        },
        database: {
            mongo: {
                connection: 'mongodb://root:root123@ds121461.mlab.com:21461/clu-node'
            },
        },
    },
    config
);
