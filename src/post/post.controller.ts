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

  @ApiOperation({ summary: 'Создание публикации' })
  @ApiBody({ type: PostDto, description: 'Тело создающейся публикации' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Post()
  @UseGuards(new AuthGuard())
  @ApiSecurity('basic')
  create(@Body() PostDto: PostDto, @Session() session: SessionContainer) {
    let userId = session.getUserId();
    return this.postService.create(PostDto, userId);
  }

  @ApiOperation({ summary: 'Получение всех публикаций' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Get()
  findAll(@Param('id', new ParseIntPipe()) id: number) {
    return this.postService.findAll(id);
  }

  @ApiOperation({ summary: 'Получение определенной публикации по идентификатору' })
  @ApiParam({name: 'id', type: 'number', description: 'Идентификатор публикации'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.postService.findOne(+id);
  }

  @ApiOperation({summary: 'Обновление публикации '})
  @ApiParam({name: 'id', type: 'number', description: 'Идентификатор публикации'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Put(':id')
  @UseGuards(new AuthGuard())
  @ApiSecurity('basic')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: PostDto,
         @Session() session: SessionContainer) {
    let userId = session.getUserId();
    return this.postService.update(id, dto, userId);
  }

  @ApiOperation({summary: 'Удаление публикации'})
  @ApiParam({name: 'id', type: 'number', description: 'Идентификатор публикации'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Delete(':id')
  @UseGuards(new AuthGuard())
  @ApiSecurity('basic')
  remove(@Param('id', new ParseIntPipe()) id: number, @Session() session: SessionContainer) {
    let userId = session.getUserId();
    return this.postService.remove(+id, userId);
  }
}
