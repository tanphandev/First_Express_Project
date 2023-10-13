import { NextFunction, Request, Response } from "express";
import { ValidationError, validate } from "class-validator";
import UserService from "../services/user.service";
import ArticleService from "../services/article.service";
import templateResponse from "../../HTTP/response/template.response";
import { userResponse } from "../../HTTP/response/user.response";
import { articleResponse } from "../../HTTP/response/article.response";
import successStatusCode from "../../HTTP/status_code/success.status-code";
import { clientErrorCode } from "../../HTTP/status_code/error.status-code";
import { ServerException } from "../../utils/customError";
import { User } from "../../entities/user.entity";
import Article from "../../entities/article.entity";
import { IRequest } from "../../interface/http.interface";

const articleService = new ArticleService();
class ArticleController {
  /* get all articles */
  public static getAllArticle = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    articleService
      .getAllArticles()
      .then((articles) => {
        res
          .status(successStatusCode.Success)
          .json(
            templateResponse.success("get all article successed", articles)
          );
      })
      .catch((err) => {
        next(new ServerException("error occured"));
      });
  };

  /* get article by id */
  public static getArticleById = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    articleService
      .getArticleById(id)
      .then((article) => {
        return res
          .status(successStatusCode.Success)
          .json(templateResponse.success("get article successed", article));
      })
      .catch((err) => {
        return res
          .status(clientErrorCode.NotFound)
          .json(articleResponse.NotFound());
      });
  };

  /* create new article */
  public static createNewArticle = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { id: userId } = req.payloadJWT;
    const { title, description, body, tagList, favoriteCount } = req.body;
    const newArticle = new Article();
    let author: User | null;
    try {
      author = await new UserService().getOneUserById(userId);
      if (!author) {
        return res
          .status(clientErrorCode.NotFound)
          .json(userResponse.NotFound());
      }
    } catch (e: any) {
      return res.status(clientErrorCode.NotFound).json(userResponse.NotFound());
    }

    newArticle.title = title ?? "";
    newArticle.description = description ?? "";
    newArticle.body = body ?? "";
    newArticle.tagList = tagList ?? [];
    newArticle.favoriteCount = favoriteCount ?? 0;
    newArticle.author = author;
    const errors: ValidationError[] = await validate(newArticle);
    if (errors.length > 0) {
      const errorArray = errors.map((error) => ({
        property: error.property,
        message: error.constraints
          ? error.constraints[Object.keys(error.constraints)[0]]
          : "",
      }));
      return res
        .status(clientErrorCode.BadRequest)
        .json(
          templateResponse.error(errorArray, null, clientErrorCode.BadRequest)
        );
    }

    /* save into article repository */
    articleService
      .createNewArticle(newArticle)
      .then((response) => {
        res
          .status(successStatusCode.Created)
          .json(templateResponse.success("article created"));
      })
      .catch((e: Error) => {
        next(new ServerException("error occured"));
      });
  };

  /* edit article */
  public static editArticle = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { id: currentArticleId } = req.params;
    const { title, description, body, tagList, favoriteCount } = req.body;
    if (title !== undefined) {
      if (!title)
        return res
          .status(clientErrorCode.BadRequest)
          .json(
            templateResponse.error(
              "title not empty",
              null,
              clientErrorCode.BadRequest
            )
          );
    }

    if (body !== undefined) {
      if (!body)
        return res
          .status(clientErrorCode.BadRequest)
          .json(
            templateResponse.error(
              "body not empty",
              null,
              clientErrorCode.BadRequest
            )
          );
    }
    try {
      const updateResult = await articleService.updateArticle(
        currentArticleId,
        title,
        description,
        body,
        tagList,
        favoriteCount
      );
      if (updateResult.affected !== 0) {
        return res
          .status(successStatusCode.Success)
          .json(templateResponse.success("post updated"));
      } else {
        return res
          .status(clientErrorCode.NotFound)
          .json(articleResponse.NotFound());
      }
    } catch (e: any) {
      next(new ServerException("error occured"));
    }
  };

  /* delete article */
  public static deleteArticle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      const deleteResult = await articleService.deleteArticleById(id);
      if (deleteResult.affected !== 0) {
        res
          .status(successStatusCode.Success)
          .json(templateResponse.success("article is deleted"));
      } else {
        return res
          .status(clientErrorCode.NotFound)
          .json(articleResponse.NotFound());
      }
    } catch (e: any) {
      next(new ServerException("error occured"));
    }
  };
}

export default ArticleController;
