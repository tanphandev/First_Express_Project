import {
  clientErrorCode,
  serverErrorCode,
} from "../status_code/error.status-code";

const templateResponse = {
  general(data: any) {
    return data;
  },
  /**
   * Returns standard success response
   * @param {*} data
   * @param {String} message
   */
  success(message: any, data?: any) {
    return {
      success: true,
      message: message || "success",
      data,
    };
  },
  error(message: any, err: any, code: number) {
    return {
      success: false,
      message: message || "some error occurred",
      error:
        err || "error occurred on server, please try again after some time.",
      code: code || serverErrorCode.InternalServerError,
    };
  },
};

export default templateResponse;
