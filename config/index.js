const { defaultsDeep } = require('lodash');
const defaultConfig = require('./defaultConfig');

const env = process.env.NODE_ENV;
let envConfig = null;

try {
    envConfig = require(`./env/${env}`);
    console.info(`Using configuration for \`${env}\``);
} catch (error) {
    console.error(`Cannot use config \`${env}\`: ${error.message}`);
};

module.exports = defaultsDeep({}, envConfig, defaultConfig);
