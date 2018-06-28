const server = require('./app/server');

server.start(3000)
    .then((port) => console.log(`Server listening on ${port}`))
    .catch(error => console.error(`Server failed to start: ${error.message}`));
