const BadRequestException = class BadRequestException extends Error {};
const NotFoundException = class NotFoundException extends Error {};
const ServerException = class ServerException extends Error {};
class APIError extends Error {
  public ErrorID: any;
  public code: any;
  constructor(message: string, ErrorID: number, code = null) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = "api error";
    this.message = message;
    if (ErrorID) this.ErrorID = ErrorID;
    if (code) this.code = code;
  }
}

export { BadRequestException, NotFoundException, ServerException, APIError };
