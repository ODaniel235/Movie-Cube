class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // Fixed the status value to "fail"
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor); // Fixed the Error.captureStackTrace call
  }
}

export default AppError;
