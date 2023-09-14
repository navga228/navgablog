import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as hbs from 'express-handlebars';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
