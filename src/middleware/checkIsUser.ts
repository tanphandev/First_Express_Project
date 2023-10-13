import { NextFunction, Response } from "express";
import { IRequest } from "../interface/http.interface";
import { clientErrorCode } from "../HTTP/status_code/error.status-code";
import templateResponse from "../HTTP/response/template.response";

const checkIsUser = (req: IRequest, res: Response, next: NextFunction) => {
  const { id: currentUserId } = req.payloadJWT;
  const id = req.params.id;
  if (currentUserId === id) {
    next();
  } else {
    return res
      .status(clientErrorCode.Unauthorized)
      .json(
        templateResponse.error(
          "you are not allowed for this operations",
          "Unauthorized",
          clientErrorCode.Unauthorized
        )
      );
  }
};

export { checkIsUser };
