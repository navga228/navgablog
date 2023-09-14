import { Module } from "@nestjs/common";
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../category/entities/category.entity";
import { Comment } from "../comment/entities/comment.entity";
import { Post } from "./entities/post.entity";
import { User } from "../user/entities/user.entity";
import { Blog } from "../blog/entities/blog.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Blog, Post, Comment, Category])],
  exports: [TypeOrmModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
