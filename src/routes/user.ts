import express from "express";
import UserController from "../app/controllers/user.controller";
const userRouter = express.Router();

userRouter.get("/users", UserController.getAllUser);
userRouter.get("/user/:id", UserController.getOneUser);

export default userRouter;
