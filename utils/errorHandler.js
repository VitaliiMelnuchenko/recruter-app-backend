class ProjectError extends Error {
    constructor (message) {
      super(message);
      this.message = message;
      this.name = 'projectError';
      this.error = message;
    }
};

module.exports.serverError = (err) => {
    const error = new ProjectError('SERVER_ERROR');
    if (err) error.message = err;
    error.status = 500;
    return error;
};

module.exports.notFound = (err) => {
    const error = new ProjectError('NOT_FOUND');
    if (err) error.message = err;
    error.status = 404;
    return error;
};

module.exports.badRequest = (err) => {
    const error = new ProjectError('BAD_REQUEST');
    if (err) error.message = err;
    error.status = 400;
    return error;
};

module.exports.forbidden = (err) => {
    const error = new ProjectError('FORBIDDEN');
    if (err) error.message = err;
    error.status = 403;
    return error;
};

module.exports.unauthorized = (err) => {
    const error = new ProjectError('Unauthorize');
    if (err) error.message = err;
    error.status = 401;
    return error;
};

module.exports.invalidJoi = (err) => {
    let result = '';
    for (const error of err.details) {
      result += error.message + '; ';
    }
    return this.badRequest(result);
};