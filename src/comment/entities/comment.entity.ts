import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "../../post/entities/post.entity";

@Entity()
export class Comment {
  constructor(commentText: string, post: Post, userId: string) {
    this.userId = userId;
    this.text = commentText;
    this.post = post;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  userId: string;

  @ManyToOne(type => Post, post => post.comments, { onDelete: 'CASCADE'})
  post: Post;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}