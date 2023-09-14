import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommentModule } from "./comment/comment.module";
import { PostModule } from "./post/post.module";
import { CategoryModule } from "./category/category.module";
import { UserModule } from "./user/user.module";
import { BlogModule } from "./blog/blog.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post/entities/post.entity";
import { Comment } from "./comment/entities/comment.entity";
import { Category } from "./category/entities/category.entity";
import { Blog } from "./blog/entities/blog.entity";
import { User } from "./user/entities/user.entity";
import { AuthModule } from "./auth/auth.module";
import * as SuperTokensConfig from "./auth/supertokens/supertokens.config";


@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "dpg-ck1h1h9gbqfc738vnphg-a.frankfurt-postgres.render.com",
    port: 5432,
    username: "navgaweb_db_user",
    password: "r25H1gsAC3bKiGH9Uev56BkXlkCGy3MV",
    database: "navgaweb_db",
    entities: [User, Blog, Post, Comment, Category],
    synchronize: true,
    ssl: {
      ca: process.env.SSL_CERT
    },
    autoLoadEntities: true
  }),
    AuthModule.forRoot({
      connectionURI: SuperTokensConfig.connectionUri,
      apiKey: SuperTokensConfig.apiKey,
      appInfo: SuperTokensConfig.appInfo
    }),
    CommentModule, PostModule, CategoryModule, UserModule, BlogModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
