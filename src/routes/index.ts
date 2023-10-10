import express from "express";
import router from "./user";
import userRouter from "./user";

const apiRoute = express();

apiRoute.use("/v1", userRouter);

export default apiRoute;
