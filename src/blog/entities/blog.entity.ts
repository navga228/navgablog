import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Post } from "../../post/entities/post.entity";

@Entity()
export class Blog {
  constructor(user: User, title : string) {
    this.user = user;
    this.title = title;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => User, user => user.blog,
    {
      onDelete: 'CASCADE'
    })
  @JoinColumn()
  user: User;

  @Column()
  title: string;

  @OneToMany(type => Post, post => post.blog)
  posts: Post[];
}
