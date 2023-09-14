import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../post/entities/post.entity";

@Entity()
export class Category {
  constructor(categoryName: string) {
    this.name = categoryName;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @ManyToMany(() => Post)
  posts: Post[];
}