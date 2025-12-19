export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Specific error types for common HTTP errors
export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

export class ConflictError extends ApiError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message = 'Too Many Requests') {
    super(message, 429);
  }
}

export class ValidationError extends ApiError {
  constructor(message = 'Validation Failed') {
    super(message, 422);
  }
}
export class AuthenticationError extends ApiError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
  }
}