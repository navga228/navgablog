import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Blog } from "../blog/entities/blog.entity";
import { Post } from "../post/entities/post.entity";
import { Comment } from "../comment/entities/comment.entity";
import { Category } from "../category/entities/category.entity";
import { BlogService } from "../blog/blog.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Blog, Post, Comment, Category])],
  controllers: [UserController],
  providers: [UserService, BlogService],
})
export class UserModule {}
