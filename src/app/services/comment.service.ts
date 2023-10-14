import { DeleteResult, UpdateResult } from "typeorm";
import { dataSource } from "../../../ormconfig";
import Article from "../../entities/article.entity";
import Comment from "../../entities/comment.entity";

class CommentService {
  constructor(private commentRepository = dataSource.getRepository(Comment)) {}

  async getAllComment(): Promise<Comment[]> {
    try {
      const comments = await this.commentRepository.find({
        relations: ["user", "post", "article"],
      });
      return comments;
    } catch (e: any) {
      throw e;
    }
  }

  async getCommentById(id: string): Promise<Comment> {
    try {
      return await this.commentRepository.findOneOrFail({
        relations: ["user", "post", "article"],
        where: { id },
      });
    } catch (e: any) {
      throw e;
    }
  }

  async createNewComment(newComment: Comment) {
    try {
      return await this.commentRepository.save(newComment);
    } catch (e: any) {
      throw e;
    }
  }

  async updateComment(id: string, text: string): Promise<UpdateResult> {
    try {
      return await this.commentRepository.update(
        { id: id },
        {
          text,
        }
      );
    } catch (e: any) {
      throw e;
    }
  }

  async deleteComment(id: string): Promise<DeleteResult> {
    try {
      return await this.commentRepository.delete({
        id,
      });
    } catch (e: any) {
      throw e;
    }
  }
}

export default CommentService;
