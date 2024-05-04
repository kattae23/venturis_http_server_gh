class ApiError extends Error {
  private readonly statusCode: number;
  private readonly isOperational: boolean;
  readonly stack?: string | undefined;
  constructor(
    statusCode: number,
    isOperational = true,
    stack = '',
    message = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;

module.exports = ApiError;
