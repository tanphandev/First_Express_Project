import express from "express";
import { checkJWT } from "../middleware/checkJWT";
import CommentController from "../app/controllers/comment.controller";
import { checkIsAuthorComment } from "../middleware/checkIsAuthor";

const userRouter = express.Router();
userRouter.get("/all", CommentController.getAllComment);
userRouter.get("/:id", CommentController.getCommentById);
userRouter.post("/new", [checkJWT], CommentController.createNewComment);
userRouter.put(
  "/:id",
  [checkJWT, checkIsAuthorComment],
  CommentController.editComment
);
userRouter.delete(
  "/:id",
  [checkJWT, checkIsAuthorComment],
  CommentController.deleteComment
);
export default userRouter;
