import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { IsNotEmpty } from "class-validator";
import Comment from "./comment.entity";

@Entity("Post")
class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @IsNotEmpty()
  public title!: string;

  @Column()
  public url!: string;

  @Column()
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
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updateAt!: Date;

  /* Relationship */
  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
    onDelete: "CASCADE",
  })
  public user!: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  public comments!: Comment[];
}

export default Post;
