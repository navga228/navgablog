import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
  Put,
  UseGuards,
  HttpException
} from "@nestjs/common";
import { PostService } from './post.service';
import { PostDto } from "./dto/post.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { Session } from "../auth/session/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";


@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Создание поста' })
  @ApiBody({ type: PostDto, description: 'Тело поста' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успех' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Плохой запрос' })
  @Post()
  @UseGuards(new AuthGuard())
  @ApiSecurity('basic')
  create(@Body() PostDto: PostDto, @Session() session: SessionContainer) {
    let userId = session.getUserId();
    return this.postService.create(PostDto, userId);
  }

  @ApiOperation({ summary: 'Получение всех постов' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успех' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Плохой запрос' })
  @ApiParam({name: 'id', type: 'number', description: 'Идентификатор блога'})
  @Get(':id')
  findAll(@Param('id', new ParseIntPipe()) id: number) {
    return this.postService.findAll(id);
  }

  @ApiOperation({ summary: 'Получение одного поста' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успех' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Плохой запрос' })
  @ApiParam({name: 'id', type: 'number', description: 'Идентификатор поста'})
  @Get('/one/:id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.postService.findOne(id);
  }

  @ApiOperation({summary: 'Обновление поста '})
  @ApiParam({name: 'id', type: 'number', description: 'Идентификатор поста'})
  @ApiBody({ type: PostDto, description: 'Тело поста' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успех' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Плохой запрос' })
  @Put(':id')
  @UseGuards(new AuthGuard())
  @ApiSecurity('basic')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: PostDto,
         @Session() session: SessionContainer) {
    let userId = session.getUserId();
    return this.postService.update(id, dto, userId);
  }

  @ApiOperation({summary: 'Удаление поста'})
  @ApiParam({name: 'id', type: 'number', description: 'Идентификатор поста'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Успех' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Плохой запрос' })
  @Delete(':id')
  @UseGuards(new AuthGuard())
  @ApiSecurity('basic')
  remove(@Param('id', new ParseIntPipe()) id: number, @Session() session: SessionContainer) {
    let userId = session.getUserId();
    return this.postService.remove(+id, userId);
  }
}
