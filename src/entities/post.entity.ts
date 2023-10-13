import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  constructor() {
    super();
    this.title = "";
    this.url = "";
    this.text = "";
    this.createAt = new Date();
    this.updateAt = new Date();
  }

  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column()
  @IsNotEmpty()
  public title: string;

  @Column()
  public url!: string;

  @Column()
  @IsNotEmpty()
  public text!: string;

  @Column()
  @CreateDateColumn({
    type: "timestamp",
  })
  public createAt!: Date;

  @Column()
  @UpdateDateColumn({
    type: "timestamp",
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
