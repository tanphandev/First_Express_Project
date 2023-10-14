import { DeleteResult, UpdateResult } from "typeorm";
import { dataSource } from "../../../ormconfig";
import Post from "../../entities/post.entity";

class PostService {
  constructor(private postRepository = dataSource.getRepository(Post)) {}

  async getAllPost(): Promise<Post[]> {
    try {
      const posts = await this.postRepository.find({
        relations: ["user", "comments"],
      });
      return posts;
    } catch (e: any) {
      throw e;
    }
  }

  async getPostById(id: string): Promise<Post> {
    try {
      return await this.postRepository.findOneOrFail({
        relations: ["user", "comments"],
        where: { id: id },
      });
    } catch (e: any) {
      throw e;
    }
  }

  async createNewPost(newPost: Post) {
    try {
      return await this.postRepository.save(newPost);
    } catch (e: any) {
      throw e;
    }
  }

  async updatePost(
    id: string,
    title: string,
    url: string,
    text: string
  ): Promise<UpdateResult> {
    try {
      return await this.postRepository.update(
        { id: id },
        {
          title,
          url,
          text,
        }
      );
    } catch (e: any) {
      throw e;
    }
  }

  async deletePostById(id: string): Promise<DeleteResult> {
    try {
      return await this.postRepository.delete({
        id,
      });
    } catch (e: any) {
      throw e;
    }
  }
}

export default PostService;
