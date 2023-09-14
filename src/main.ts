import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as hbs from 'express-handlebars';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import supertokens from "supertokens-node";
import { ResponseTimeInterceptor } from "./timeload";
import { SupertokensExceptionFilter } from "./auth/auth.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://127.0.0.1:3000/'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalInterceptors(new ResponseTimeInterceptor());
  app.useGlobalFilters(new SupertokensExceptionFilter());

  app.setViewEngine('hbs');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.engine('hbs', hbs({
    extname: 'hbs',
    partialsDir: join(__dirname, '..', 'views/partials'),
    layoutsDir: join(__dirname, '..', 'views/layouts'),
    defaultLayout: 'main',
  }));

  const config = new DocumentBuilder()
    .setTitle('Navga Blog Service')
    .setDescription('Блоги, посты, категории & комменты')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
