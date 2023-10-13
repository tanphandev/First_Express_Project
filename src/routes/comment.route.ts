import express from "express";
import UserController from "../app/controllers/user.controller";
import { checkJWT } from "../middleware/checkJWT";
import { checkIsUser } from "../middleware/checkIsUser";
const userRouter = express.Router();

userRouter.get("/all", UserController.getAllUser);
userRouter.get("/:id", UserController.getUserById);
userRouter.post("/register", UserController.newUser);
userRouter.put("/edit", [checkJWT], UserController.editUser);
userRouter.delete("/:id", [checkJWT, checkIsUser], UserController.deleteUser);
export default userRouter;
