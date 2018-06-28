const HttpError = require('./HttpError');
module.exports = class NotFound extends HttpError {
    constructor(message = 'Unauthorized') {
        super(401, message);
    }
}