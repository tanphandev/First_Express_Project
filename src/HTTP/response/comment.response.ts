import { clientErrorCode } from "../status_code/error.status-code";
import templateResponse from "./template.response";

export const commentResponse = {
  NotFound: () => {
    return templateResponse.error(
      "Comment not found",
      "Not found",
      clientErrorCode.NotFound
    );
  },
};
