import { NextFunction, Request, Response } from "express";
import PostService from "../services/post.service";
import successStatusCode from "../../HTTP/status_code/success.status-code";
import templateResponse from "../../HTTP/response/template.response";
import { ServerException } from "../../utils/customError";
import { clientErrorCode } from "../../HTTP/status_code/error.status-code";
import { userResponse } from "../../HTTP/response/user.response";
import Post from "../../entities/post.entity";
import { ValidationError, validate } from "class-validator";
import { IRequest } from "../../interface/http.interface";
import { User } from "../../entities/user.entity";
import UserService from "../services/user.service";
import { postResponse } from "../../HTTP/response/post.response";

const postService = new PostService();
class PostController {
  /* get all posts */
  public static getAllPost = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    postService
      .getAllPost()
      .then((posts) => {
        res
          .status(successStatusCode.Success)
          .json(templateResponse.success("get all post successed", posts));
      })
      .catch((err) => {
        next(new ServerException("error occured"));
      });
  };

  /* get post by id */
  public static getPostById = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    postService
      .getPostById(id)
      .then((post) => {
        return res
          .status(successStatusCode.Success)
          .json(templateResponse.success("get post successed", post));
      })
      .catch((err) => {
        return res
          .status(clientErrorCode.NotFound)
          .json(postResponse.NotFound());
      });
  };

  //   /* create new post */
  public static createNewPost = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { id: userId } = req.payloadJWT;
    const { title, url, text } = req.body;
    const newPost = new Post();
    let user: User | null;
    try {
      user = await new UserService().getOneUserById(userId);
      if (!user) {
        return res
          .status(clientErrorCode.NotFound)
          .json(userResponse.NotFound());
      }
    } catch (e: any) {
      return res.status(clientErrorCode.NotFound).json(userResponse.NotFound());
    }
    newPost.title = title ?? "";
    newPost.url = url ?? "";
    newPost.text = text ?? "";
    newPost.user = user;
    const errors: ValidationError[] = await validate(newPost);
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
    /* save into post repository */
    postService
      .createNewPost(newPost)
      .then((response) => {
        res
          .status(successStatusCode.Created)
          .json(templateResponse.success("post created"));
      })
      .catch((e: Error) => {
        next(new ServerException("error occured"));
      });
  };

  /* edit post */
  public static editPost = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { id: currentPostId } = req.params;
    const { title, url, text } = req.body;
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
      const updateResult = await postService.updatePost(
        currentPostId,
        title,
        url,
        text
      );
      if (updateResult.affected !== 0) {
        return res
          .status(successStatusCode.Success)
          .json(templateResponse.success("post updated"));
      } else {
        return res
          .status(clientErrorCode.NotFound)
          .json(postResponse.NotFound());
      }
    } catch (e: any) {
      next(new ServerException("error occured"));
    }
  };

  /* delete user */
  public static deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      const deleteResult = await postService.deletePostById(id);
      if (deleteResult.affected !== 0) {
        res
          .status(successStatusCode.Success)
          .json(templateResponse.success("post is deleted"));
      } else {
        return res
          .status(clientErrorCode.NotFound)
          .json(postResponse.NotFound());
      }
    } catch (e: any) {
      next(new ServerException("error occured"));
    }
  };
}

export default PostController;
