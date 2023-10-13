import { clientErrorCode } from "../status_code/error.status-code";
import templateResponse from "./template.response";

export const postResponse = {
  NotFound: () => {
    return templateResponse.error(
      "Post not found",
      "Not found",
      clientErrorCode.NotFound
    );
  },
};
