const config = require('./config');

require('./app/database').init(config.database);

const server = require('./app/server');
const routes = require('./config/routes');

routes(server.app);

server.start(config.server.port)
    .then((port) => console.log(`Server listening on ${port}`))
    .catch(error => console.error(`Server failed to start: ${error.message}`));
