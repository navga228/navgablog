import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [CommentModule, PostModule, CategoryModule, UserModule, BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
