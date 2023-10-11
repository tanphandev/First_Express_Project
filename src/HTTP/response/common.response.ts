import { clientErrorCode } from "../status_code/error.status-code";
import templateResponse from "./template.response";

const commonResponse = {
  commonAuthUserDataError(data: any) {
    return templateResponse.error(
      data.message || "Authentication error",
      data.error || "token verification failed, Please try again",
      data.code || clientErrorCode.Unauthorized
    );
  },
  emptyContent() {
    return templateResponse.error(
      "empty content found",
      `you must provide valid data and it must not be empty
		ref: http://stackoverflow.com/questions/18419428/what-is-the-minimum-valid-json`,
      clientErrorCode.BadRequest
    );
  },
  invalidContentType() {
    return templateResponse.error(
      "invalid content type",
      `you must specify content type and it must be application/json',
		ref: 'http://stackoverflow.com/questions/477816/what-is-the-correct-json-content-type`,
      clientErrorCode.BadRequest
    );
  },
  routeNotFound(req: any) {
    return templateResponse.error(
      "api not found",
      `${req.method} ${req.url}`,
      clientErrorCode.NotFound
    );
  },
  userNotFound() {
    return templateResponse.error(
      "user not found",
      "the user you're looking for doesn't exist or you dont have permissions to access it.",
      clientErrorCode.NotFound
    );
  },
};

export default commonResponse;
