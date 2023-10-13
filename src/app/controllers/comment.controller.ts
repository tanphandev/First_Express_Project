import { NextFunction, Request, Response } from "express";
import { ValidationError, validate } from "class-validator";
import PostService from "../services/post.service";
import UserService from "../services/user.service";
import ArticleService from "../services/article.service";
import CommentService from "../services/comment.service";
import { userResponse } from "../../HTTP/response/user.response";
import templateResponse from "../../HTTP/response/template.response";
import { commentResponse } from "../../HTTP/response/comment.response";
import { postResponse } from "../../HTTP/response/post.response";
import { articleResponse } from "../../HTTP/response/article.response";
import successStatusCode from "../../HTTP/status_code/success.status-code";
import { clientErrorCode } from "../../HTTP/status_code/error.status-code";
import { ServerException } from "../../utils/customError";
import { User } from "../../entities/user.entity";
import Comment from "../../entities/comment.entity";
import { IRequest } from "../../interface/http.interface";

const commentService = new CommentService();
class CommentController {
  /* get all comment */
  public static getAllComment = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    commentService
      .getAllComment()
      .then((comments) => {
        res
          .status(successStatusCode.Success)
          .json(
            templateResponse.success("get all comment successed", comments)
          );
      })
      .catch((err) => {
        next(new ServerException("error occured"));
      });
  };

  /* get comment by id */
  public static getCommentById = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    commentService
      .getCommentById(id)
      .then((comment) => {
        return res
          .status(successStatusCode.Success)
          .json(templateResponse.success("get comment successed", comment));
      })
      .catch((err) => {
        return res
          .status(clientErrorCode.NotFound)
          .json(commentResponse.NotFound());
      });
  };

  /* create new comment */
  public static createNewComment = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { id: userId } = req.payloadJWT;
    const { text, postId, articleId } = req.body;
    const newComment = new Comment();
    let user: User | null;

    if (!postId && !articleId) {
      return res
        .status(clientErrorCode.BadRequest)
        .json(
          templateResponse.error(
            "You must provide either postId or articleId",
            "BadRequest",
            clientErrorCode.BadRequest
          )
        );
    }

    try {
      user = await new UserService().getOneUserById(userId);
      if (!user) {
        return res
          .status(clientErrorCode.NotFound)
          .json(userResponse.NotFound());
      }
      newComment.user = user;
    } catch (e: any) {
      return res.status(clientErrorCode.NotFound).json(userResponse.NotFound());
    }

    if (postId) {
      try {
        const post = await new PostService().getPostById(postId);
        newComment.post = post;
      } catch (e: any) {
        return res
          .status(clientErrorCode.BadRequest)
          .json(postResponse.NotFound());
      }
    }

    if (articleId) {
      try {
        const article = await new ArticleService().getArticleById(articleId);
        newComment.article = article;
      } catch (e: any) {
        return res
          .status(clientErrorCode.BadRequest)
          .json(articleResponse.NotFound());
      }
    }
    newComment.text = text ?? "";
    const errors: ValidationError[] = await validate(newComment);
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
    /* save into comment repository */
    commentService
      .createNewComment(newComment)
      .then((response) => {
        res
          .status(successStatusCode.Created)
          .json(templateResponse.success("comment created"));
      })
      .catch((e: Error) => {
        next(new ServerException("error occured"));
      });
  };

  /* edit comment */
  public static editComment = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { id: currentCommentId } = req.params;
    const { text } = req.body;
    if (text !== undefined) {
      if (!text)
        return res
          .status(clientErrorCode.BadRequest)
          .json(
            templateResponse.error(
              "text not empty",
              null,
              clientErrorCode.BadRequest
            )
          );
    }
    try {
      const updateResult = await commentService.updateComment(
        currentCommentId,
        text
      );
      if (updateResult.affected !== 0) {
        return res
          .status(successStatusCode.Success)
          .json(templateResponse.success("comment updated"));
      } else {
        return res
          .status(clientErrorCode.NotFound)
          .json(commentResponse.NotFound());
      }
    } catch (e: any) {
      next(new ServerException("error occured"));
    }
  };

  /* delete comment */
  public static deleteComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      const deleteResult = await commentService.deleteComment(id);
      if (deleteResult.affected !== 0) {
        res
          .status(successStatusCode.Success)
          .json(templateResponse.success("comment is deleted"));
      } else {
        return res
          .status(clientErrorCode.NotFound)
          .json(commentResponse.NotFound());
      }
    } catch (e: any) {
      next(new ServerException("error occured"));
    }
  };
}

export default CommentController;
