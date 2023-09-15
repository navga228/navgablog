import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { Comment } from "../../comment/entities/comment.entity";
import { Blog } from "../../blog/entities/blog.entity";


@Entity()
export class Post {
  constructor(postContent: string, postTitle: string, userId : string, categories: Category[], blog: Blog) {
    this.content = postContent;
    this.title = postTitle;
    this.userId = userId;
    this.blog = blog;
    this.categories = categories;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  userId: string;

  @Column()
  content: string;

  @ManyToOne(type => Blog, blog => blog.posts,
    {
      onDelete: 'CASCADE'
    })
  blog: Blog;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

}