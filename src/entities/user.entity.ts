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
import { Length, IsNotEmpty, IsEmail, Matches, IsDate } from "class-validator";
import * as bcrypt from "bcrypt";
import Post from "./post.entity";
import Article from "./article.entity";
import Comment from "./comment.entity";

@Entity("User")
@Unique(["email"])
export class User extends BaseEntity {
  constructor() {
    super();
    this.username = null;
    this.createAt = new Date();
    this.updateAt = new Date();
  }
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "varchar", nullable: true })
  public username: string | null;

  @Column()
  @IsEmail()
  public email!: string;

  @Column({ select: false })
  @Length(8, 20, { message: "Password must be between 8 and 20 characters" })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number.",
  })
  public password!: string;

  @Column()
  @CreateDateColumn({
    type: "timestamp",
  })
  public createAt!: Date;

  @Column()
  @UpdateDateColumn({
    type: "timestamp",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updateAt!: Date;

  /* relationship */
  @OneToMany(() => Post, (post) => post.user)
  public posts!: Post[];

  @OneToMany(() => Article, (article) => article.author)
  public articles!: Article[];

  @OneToMany(() => Comment, (comment) => comment.user)
  public comments!: Comment[];

  /* encrypt password */
  public encryptPassword = async () => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    console.log(">>hash", hash);
    this.password = hash;
  };

  public checkPassword = (password: string) => {
    return bcrypt.compare(password, this.password);
  };
}
