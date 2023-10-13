import { DeleteResult, UpdateResult } from "typeorm";
import { dataSource } from "../../config/database/dataSource";
import Article from "../../entities/article.entity";

class ArticleService {
  constructor(private articleRepository = dataSource.getRepository(Article)) {}

  async getAllArticles(): Promise<Article[]> {
    try {
      const articles = await this.articleRepository.find({
        relations: ["author", "comments"],
      });
      return articles;
    } catch (e: any) {
      throw e;
    }
  }

  async getArticleById(id: string): Promise<Article> {
    try {
      return await this.articleRepository.findOneOrFail({
        relations: ["author", "comments"],
        where: { id },
      });
    } catch (e: any) {
      throw e;
    }
  }

  async createNewArticle(newArticle: Article) {
    try {
      return await this.articleRepository.save(newArticle);
    } catch (e: any) {
      throw e;
    }
  }

  async updateArticle(
    id: string,
    title: string,
    description: string,
    body: string,
    tagList: string[],
    favoriteCount: number
  ): Promise<UpdateResult> {
    try {
      return await this.articleRepository.update(
        { id: id },
        {
          title,
          description,
          body,
          tagList,
          favoriteCount,
        }
      );
    } catch (e: any) {
      throw e;
    }
  }

  async deleteArticleById(id: string): Promise<DeleteResult> {
    try {
      return await this.articleRepository.delete({
        id,
      });
    } catch (e: any) {
      throw e;
    }
  }
}

export default ArticleService;
