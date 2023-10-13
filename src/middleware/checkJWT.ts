import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/environment/config";
import { clientErrorCode } from "../HTTP/status_code/error.status-code";
import authResponse from "../HTTP/response/auth.response";
import { IRequest } from "../interface/http.interface";
const checkJWT = async (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] ?? "";
  if (!token) {
    return res
      .status(clientErrorCode.Unauthorized)
      .json(authResponse.TokenNotProvided());
  }
  const secretKey = config["SECRET_KEY_JWT"];
  let payloadJWT;
  /* verify token */
  try {
    payloadJWT = jwt.verify(token, secretKey);
  } catch (e: any) {
    return res
      .status(clientErrorCode.Unauthorized)
      .json(authResponse.InvalidTokenProvided());
  }
  req.payloadJWT = payloadJWT;
  next();
};

export { checkJWT };
