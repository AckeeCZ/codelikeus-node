
module.exports = class HttpError extends Error {
    constructor(code = null, message = 'Error') {
        super(message);
        this.code = code;
        Error.captureStackTrace(this, HttpError);
    }
};
