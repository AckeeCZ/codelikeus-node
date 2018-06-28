const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('tiny'));

module.exports = {
    app,
    jsonParser: bodyParser.json,
    start: (port) => {
        return new Promise((resolve, reject) =>
            app.listen(port, (err, ...results) =>
                err ? reject(err) : resolve(port)
            )
        )
    },
};
