import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import authResponse from "../../HTTP/response/auth.response";
import templateResponse from "../../HTTP/response/template.response";
import { clientErrorCode } from "../../HTTP/status_code/error.status-code";
import successStatusCode from "../../HTTP/status_code/success.status-code";
import { User } from "../../entities/user.entity";
import UserService from "../services/user.service";
import config from "../../config/environment/config";

const userService = new UserService();
class AuthController {
  public static loginByEmailPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    let user: User | null;
    if (!email || !password) {
      return res
        .status(clientErrorCode.BadRequest)
        .json(authResponse.emailOrPasswordEmpty());
    }

    /* find user on Database */
    try {
      user = await userService.findOneUserbyEmail(email);
      if (!user)
        return res
          .status(clientErrorCode.Unauthorized)
          .json(authResponse.userNotExist());

      /* check password */
      const isPasswordValid: boolean = await user.checkPassword(password);
      if (!isPasswordValid)
        return res
          .status(clientErrorCode.Unauthorized)
          .json(authResponse.PasswordInvalid());

      /* JWT decode */
      const { password: _, ...userNonePassword } = user;
      const token = jwt.sign(userNonePassword, config["SECRET_KEY_JWT"], {
        expiresIn: "1h",
      });
      return res
        .status(successStatusCode.Success)
        .json(templateResponse.success("login success", token));
    } catch (e: any) {
      res
        .status(clientErrorCode.Unauthorized)
        .json(templateResponse.error(null, null, clientErrorCode.Unauthorized));
    }
  };
}

export default AuthController;
