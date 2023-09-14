import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import {Comment} from "./entities/comment.entity";
import { Post } from "../post/entities/post.entity";
import { PostService } from "../post/post.service";
import { Category } from "../category/entities/category.entity";
import { User } from "../user/entities/user.entity";
import { Blog } from "../blog/entities/blog.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Blog, Post, Comment, Category])],
  exports: [TypeOrmModule],
  controllers: [CommentController],
  providers: [CommentService, PostService]
})
export class CommentModule {}
