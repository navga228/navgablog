import { Controller, Get, Param, ParseIntPipe, Render, Res, UseGuards } from "@nestjs/common";
import { AppService } from './app.service';
import { AuthGuard } from "./auth/auth.guard";
import { Session } from "./auth/session/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";
import { ApiExcludeController } from "@nestjs/swagger";

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('')
  @Render('index')
  getIndex(@Res() res: Response) {
    return { layout: 'main' };
  }

  @Get('index')
  @Render('index')
  getMain(@Res() res: Response) {
    return { layout: 'main' };
  }

  @Get('blog')
  @Render('blog')
  getBlogs(@Res() res: Response) {
    return { layout: 'main' };
  }

  @Get('userBlog/:id')
  @Render('userBlog')
  getPosts(@Param('id', new ParseIntPipe()) id: number) {
    return { layout: 'main', id: id };
  }

  @UseGuards(new AuthGuard())
  @Get('myProfile')
  @Render('myProfile')
  getProfile(@Res() res: Response, @Session() session : SessionContainer) {
    return { layout: 'main' };
  }

  @UseGuards(new AuthGuard())
  @Get('postCreator')
  @Render('postCreator')
  getPostCreator(@Res() res: Response, @Session() session : SessionContainer) {
    return { layout: 'main' };
  }

  @Get('auth/callback/google')
  @Render('callbackGoogle')
  getCallBack(@Res() res: Response, @Session() session : SessionContainer) {
    return { layout : 'main' }
  }
}
