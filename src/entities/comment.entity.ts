import { IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import Post from "./post.entity";
import Article from "./article.entity";

@Entity("Comment")
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column()
  @IsNotEmpty()
  public text!: string;

  @Column()
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public createAt!: Date;

  @Column()
  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public updateAt!: Date;

  /* relationship */
  @ManyToOne(() => User, (user) => user.comments, {
    eager: true,
    onDelete: "CASCADE",
  })
  public user!: User;

  @ManyToOne(() => Post, (post) => post.comments, {
    eager: true,
    onDelete: "CASCADE",
  })
  public post!: Post;

  @ManyToOne(() => Article, (article) => article.comments, {
    eager: true,
    onDelete: "CASCADE",
  })
  public article!: Article;
}

export default Comment;
