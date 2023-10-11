import express from "express";
import AuthController from "../app/controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/login", AuthController.loginByEmailPassword);

export default authRouter;
