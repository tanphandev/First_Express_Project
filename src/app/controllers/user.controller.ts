import { Request, Response } from "express";
import UserService from "../services/user.service";
import ResponseTemplate from "../../global/response";
import { ServerException } from "../../utils/customError";
const userService = new UserService();
class UserController {
  public static getAllUser = (req: Request, res: Response, next: any) => {
    userService
      .get()
      .then((users) => {
        res.json(ResponseTemplate.success(users, "get all user successed"));
      })
      .catch((err) => {
        next(new ServerException("error occured"));
      });
  };

  public static getOneUser = (req: Request, res: Response, next: any) => {
    const id = req.params.id;
    userService
      .getOneBy(parseInt(id))
      .then((user) => {
        res.json(ResponseTemplate.success(user, "get user successed"));
      })
      .catch((err) => {
        next(new ServerException("error occured"));
      });
  };
}

export default UserController;
