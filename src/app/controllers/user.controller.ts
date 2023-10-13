import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import templateResponse from "../../HTTP/response/template.response";
import { ServerException } from "../../utils/customError";
import { User } from "../../entities/user.entity";
import { validate } from "class-validator";
import authResponse from "../../HTTP/response/auth.response";
import { clientErrorCode } from "../../HTTP/status_code/error.status-code";
import { userResponse } from "../../HTTP/response/user.response";
import successStatusCode from "../../HTTP/status_code/success.status-code";
import { IRequest } from "../../interface/http.interface";
import { dataSource } from "../../config/database/dataSource";

const userService = new UserService();
class UserController {
  /* get all users */
  public static getAllUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    userService
      .getAllUser()
      .then((users) => {
        res
          .status(successStatusCode.Success)
          .json(templateResponse.success("get all user successed", users));
      })
      .catch((err) => {
        next(new ServerException("error occured"));
      });
  };

  /* get user by id */
  public static getUserById = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    userService
      .getOneUserById(id)
      .then((user) => {
        if (!user)
          return res
            .status(clientErrorCode.NotFound)
            .json(userResponse.NotFound());

        return res
          .status(successStatusCode.Success)
          .json(templateResponse.success("get user successed", user));
      })
      .catch((err) => {
        next(new ServerException("error occured"));
      });
  };

  /* create new user */
  public static newUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id, email, password } = req.body;
    const newUser = new User();
    newUser.id = id;
    newUser.email = email;
    newUser.password = password;
    const errors = await validate(newUser);
    if (errors.length > 0) {
      res.status(400).json(errors);
    }
    /* encript password */
    await newUser.encryptPassword();

    /* save into User repository */
    userService
      .createNewUser(newUser)
      .then((response) => {
        res.status(201).json(templateResponse.success("user created"));
      })
      .catch((e: Error) => {
        res.status(409).json(authResponse.userAlreadyExist());
      });
  };

  /* edit user */
  public static editUser = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.payloadJWT;
    const { username } = req.body;
    if (!username) {
      return res
        .status(clientErrorCode.BadRequest)
        .json(
          templateResponse.error(
            "username not empty",
            "Bad Request",
            clientErrorCode.BadRequest
          )
        );
    }
    try {
      const updateResult = await userService.updateUser(id, username);
      if (updateResult.affected !== 0) {
        return res
          .status(successStatusCode.Success)
          .json(templateResponse.success("user updated"));
      } else {
        return res
          .status(clientErrorCode.NotFound)
          .json(userResponse.NotFound());
      }
    } catch (e: any) {
      next(new ServerException("error occured"));
    }
  };

  /* delete user */
  public static deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    let user;
    try {
      user = await userService.getOneUserById(id);
    } catch (e: any) {
      return res.status(clientErrorCode.NotFound).json(userResponse.NotFound());
    }

    try {
      const deleteResult = await userService.deleteUserById(id);
      if (deleteResult.affected !== 0) {
        res
          .status(successStatusCode.Success)
          .json(templateResponse.success("user is deleted"));
      } else {
        next(new ServerException("error occured"));
      }
    } catch (e: any) {
      next(new ServerException("error occured"));
    }
  };
}

export default UserController;
