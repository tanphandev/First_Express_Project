import { clientErrorCode } from "../status_code/error.status-code";
import templateResponse from "./template.response";

export const articleResponse = {
  NotFound: () => {
    return templateResponse.error(
      "Article not found",
      "Not found",
      clientErrorCode.NotFound
    );
  },
};
