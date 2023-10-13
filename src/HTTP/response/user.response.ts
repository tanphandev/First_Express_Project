import { clientErrorCode } from "../status_code/error.status-code";
import templateResponse from "./template.response";

export const userResponse = {
  NotFound: () => {
    return templateResponse.error(
      "User not found",
      "Not found",
      clientErrorCode.NotFound
    );
  },
};
