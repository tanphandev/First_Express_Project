import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  PrimaryColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import Post from "./post.entity";
import Article from "./article.entity";
import Comment from "./comment.entity";

@Entity("User")
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createAt!: Date;

  @Column()
  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updateAt!: Date;

  /* relationship */
  @OneToMany(() => Post, (post) => post.user)
  public posts!: Post[];

  @OneToMany(() => Article, (article) => article.author)
  public articles!: Article[];

  @OneToMany(() => Comment, (comment) => comment.user)
  public comments!: Comment[];
}
