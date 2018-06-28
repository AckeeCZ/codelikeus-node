const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.set('debug', true);

let instance = {
    mongoose: null,
};

const connectMongo = (connectionString, name = 'mongoose') => {
    const connection = mongoose.createConnection(connectionString);
    connection.on('error', (error) => {
        console.log(`Mongo Error: ${error.message}`);
    });
    connection.on('disconnected', () => {
        console.log(`Mongo disconnected: ${error.message}`);
        setTimeout(() => connectMongo(connectionString), 1000);
    });
    connection.once('open', () => {
        console.log('Mongo connected');
    });

    fs.readdirSync(path.join(__dirname, 'models'))
        .forEach(modelFile => require(path.join(__dirname, 'models', modelFile))(connection, mongoose));

    instance[name] = connection;
    return connection;
};

const init = dbConfig => {
    connectMongo(dbConfig.mongo.connection);
};

module.exports = {
    init,
    instance,
};
