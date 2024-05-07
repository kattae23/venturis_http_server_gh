class ApiError {
  readonly statusCode: number;
  readonly isOperational?: boolean;
  readonly stack?: string | undefined;
  readonly message?: string | string[];
  constructor(
    statusCode: number,
    message = [''],
    isOperational = true,
    stack = '',
  ) {
    this.message = message;
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
