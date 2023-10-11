const clientErrorCode = {
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404,
  Conflict: 409,
  /* ... */
};

const serverErrorCode = {
  InternalServerError: 500,
  BadGateway: 502,
  ServiceUnavailable: 503,
  /* ... */
};

export { clientErrorCode, serverErrorCode };
