import express from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import postRouter from "./post.route";
import articleRouter from "./article.route";
import commentRouter from "./comment.route";

const apiRoute = express();

apiRoute.use("/auth", authRouter);
apiRoute.use("/user", userRouter);
apiRoute.use("/post", postRouter);
apiRoute.use("/article", articleRouter);
apiRoute.use("/comment", commentRouter);

export default apiRoute;
