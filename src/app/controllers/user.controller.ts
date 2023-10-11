import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import templateResponse from "../../HTTP/response/template.response";
import { ServerException } from "../../utils/customError";
import { User } from "../../entities/user.entity";
import { validate } from "class-validator";
import authResponse from "../../HTTP/response/auth.response";

const userService = new UserService();
class UserController {
  public static getAllUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    userService
      .get()
      .then((users) => {
        res.json(templateResponse.success(users, "get all user successed"));
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
}

export default UserController;
