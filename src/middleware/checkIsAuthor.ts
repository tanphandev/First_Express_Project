import { NextFunction, Response } from "express";
import { IRequest } from "../interface/http.interface";
import { clientErrorCode } from "../HTTP/status_code/error.status-code";
import templateResponse from "../HTTP/response/template.response";
import Post from "../entities/post.entity";
import PostService from "../app/services/post.service";
import { postResponse } from "../HTTP/response/post.response";
import ArticleService from "../app/services/article.service";
import Article from "../entities/article.entity";
import Comment from "../entities/comment.entity";
import CommentService from "../app/services/comment.service";
import { commentResponse } from "../HTTP/response/comment.response";

const checkIsAuthorPost = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: currentUserId } = req.payloadJWT;
  const postId = req.params.id;
  let currentPost: Post;
  try {
    currentPost = await new PostService().getPostById(postId);
  } catch (e: any) {
    return res.status(clientErrorCode.NotFound).json(postResponse.NotFound());
  }

  if (currentPost.user.id === currentUserId) {
    next();
  } else {
    return res
      .status(clientErrorCode.Unauthorized)
      .json(
        templateResponse.error(
          "you are not allowed for this operations, you is not author this post",
          "Unauthorized",
          clientErrorCode.Unauthorized
        )
      );
  }
};

const checkIsAuthorArticle = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: currentUserId } = req.payloadJWT;
  const articleId = req.params.id;
  let currentArticle: Article;
  try {
    currentArticle = await new ArticleService().getArticleById(articleId);
  } catch (e: any) {
    return res.status(clientErrorCode.NotFound).json(postResponse.NotFound());
  }

  if (currentArticle.author.id === currentUserId) {
    next();
  } else {
    return res
      .status(clientErrorCode.Unauthorized)
      .json(
        templateResponse.error(
          "you are not allowed for this operations, you is not author this article",
          "Unauthorized",
          clientErrorCode.Unauthorized
        )
      );
  }
};

const checkIsAuthorComment = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: currentUserId } = req.payloadJWT;
  const commentId = req.params.id;
  let currentComment: Comment;
  try {
    currentComment = await new CommentService().getCommentById(commentId);
  } catch (e: any) {
    return res
      .status(clientErrorCode.NotFound)
      .json(commentResponse.NotFound());
  }

  if (currentComment.user.id === currentUserId) {
    next();
  } else {
    return res
      .status(clientErrorCode.Unauthorized)
      .json(
        templateResponse.error(
          "you are not allowed for this operations, you is not author this comment",
          "Unauthorized",
          clientErrorCode.Unauthorized
        )
      );
  }
};
export { checkIsAuthorPost, checkIsAuthorArticle, checkIsAuthorComment };
