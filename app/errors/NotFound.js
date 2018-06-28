const HttpError = require('./HttpError');
module.exports = class NotFound extends HttpError {
    constructor(message = 'NotFound') {
        super(404, message);
    }
}