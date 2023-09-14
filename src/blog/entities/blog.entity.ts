import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Post } from "../../post/entities/post.entity";

@Entity()
export class Blog {
  constructor(user: User) {
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => User, user => user.blog)
  @JoinColumn()
  user: User;

  @OneToMany(type => Post, post => post.blog)
  posts: Post[];
}
