class apiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = apiError;
