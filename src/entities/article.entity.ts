import {
  BaseEntity,
  BeforeUpdate,
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

@Entity("Article")
class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @IsNotEmpty()
  public slug!: string;

  @Column()
  @IsNotEmpty()
  public title!: string;

  @Column({ default: "default description" })
  public description!: string;

  @Column({ default: "default content" })
  public body!: string;

  @Column("simple-array")
  public tagList!: string[];

  @Column({
    type: "int",
    width: 11,
    default: 0,
  })
  public favoriteCount!: number;

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

  @BeforeUpdate()
  updateTimestamp() {
    this.updateAt = new Date();
  }

  /* relationship */
  @ManyToOne(() => User, (user) => user.articles)
  public author!: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  public comments!: Comment[];
}

export default Article;
