import { clientErrorCode } from "../status_code/error.status-code";
import templateResponse from "./template.response";

const authResponse = {
  emailOrPasswordEmpty() {
    return templateResponse.error(
      "Email or Password empty",
      null,
      clientErrorCode.BadRequest
    );
  },
  userNotExist() {
    return templateResponse.error(
      "User not exist, please use another email",
      "Unauthorized",
      clientErrorCode.Unauthorized
    );
  },
  PasswordInvalid() {
    return templateResponse.error(
      "Password Invalid",
      "Unauthorized",
      clientErrorCode.Unauthorized
    );
  },
  TokenNotProvided() {
    return templateResponse.error(
      "Auth token not provided",
      "Unauthorized",
      clientErrorCode.Unauthorized
    );
  },
  InvalidTokenProvided() {
    return templateResponse.error(
      "Invalid token provided",
      "Unauthorized",
      clientErrorCode.Unauthorized
    );
  },
  userAlreadyExist() {
    return templateResponse.error(
      "Sorry, this email already exists 😿",
      "User with same email already exist in System, please use another email",
      clientErrorCode.Conflict
    );
  },
};

export default authResponse;
