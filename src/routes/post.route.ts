import express from "express";
import PostController from "../app/controllers/post.controller";
import { checkJWT } from "../middleware/checkJWT";
import { checkIsAuthorPost } from "../middleware/checkIsAuthor";
const postRouter = express.Router();

postRouter.get("/all", PostController.getAllPost);
postRouter.get("/:id", PostController.getPostById);
postRouter.post("/new", [checkJWT], PostController.createNewPost);
postRouter.put("/:id", [checkJWT, checkIsAuthorPost], PostController.editPost);
postRouter.delete(
  "/:id",
  [checkJWT, checkIsAuthorPost],
  PostController.deletePost
);
export default postRouter;
