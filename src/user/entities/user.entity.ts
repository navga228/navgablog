import { Entity, JoinTable, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "../../blog/entities/blog.entity";

@Entity()
export class User {
  constructor(id: string) {
    this.id = id;
  }

  @PrimaryColumn()
  id: string;

  @OneToOne(type => Blog, blog => blog.user)
  @JoinTable()
  blog: Blog;
}
