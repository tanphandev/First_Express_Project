import express from "express";
import UserController from "../app/controllers/user.controller";
const userRouter = express.Router();

userRouter.get("/", UserController.getAllUser);
userRouter.post("/register", UserController.newUser);

export default userRouter;
