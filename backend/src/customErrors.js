const statusCodes = require("./statusCodes");

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = statusCodes.BAD_REQUEST;
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = statusCodes.UNAUTHORIZED;
    }
}

module.exports = {
    BadRequestError,
    UnauthorizedError
}