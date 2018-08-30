const httpStatus = require('http-status');

class ExtendableError extends Error {
  constructor(message, status, isPublic, code) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.status = status;
    this.isPublic = isPublic;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor.name);
  }
}

class LoginError1 extends ExtendableError {
  constructor(message = 'Email is not Registered !', status = httpStatus.NOT_FOUND,
    isPublic = true, code = 401) {
    super(message, status, isPublic, code);
    this.name = 'LoginError';
  }
}

class LoginError2 extends ExtendableError {
  constructor(message = 'Wrong Password !', status = httpStatus.NOT_FOUND,
    isPublic = true, code = 401) {
    super(message, status, isPublic, code);
    this.name = 'LoginError';
  }
}

module.exports = {
  LoginError1,
  LoginError2
};
