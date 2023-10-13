import express from "express";
import ArticleController from "../app/controllers/article.controller";
import { checkJWT } from "../middleware/checkJWT";
import { checkIsAuthorArticle } from "../middleware/checkIsAuthor";

const articleRouter = express.Router();
articleRouter.get("/all", ArticleController.getAllArticle);
articleRouter.get("/:id", ArticleController.getArticleById);
articleRouter.post("/new", [checkJWT], ArticleController.createNewArticle);
articleRouter.put(
  "/:id",
  [checkJWT, checkIsAuthorArticle],
  ArticleController.editArticle
);
articleRouter.delete(
  "/:id",
  [checkJWT, checkIsAuthorArticle],
  ArticleController.deleteArticle
);
export default articleRouter;
