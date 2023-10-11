import express from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";

const apiRoute = express();

apiRoute.use("/v1/auth", authRouter);
apiRoute.use("/v1/user", userRouter);

export default apiRoute;
