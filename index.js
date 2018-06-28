const server = require('./app/server');
const routes = require('./config/routes');

routes(server.app);

server.start(3000)
    .then((port) => console.log(`Server listening on ${port}`))
    .catch(error => console.error(`Server failed to start: ${error.message}`));
