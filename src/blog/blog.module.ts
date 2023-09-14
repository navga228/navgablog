import { Module } from "@nestjs/common";
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../category/entities/category.entity";
import { Post } from "../post/entities/post.entity";
import { Comment } from "../comment/entities/comment.entity";
import { User } from "../user/entities/user.entity";
import { Blog } from "./entities/blog.entity";


@Module({
  imports: [TypeOrmModule.forFeature([User, Blog, Post, Comment, Category])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
