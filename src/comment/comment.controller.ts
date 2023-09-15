import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, HttpStatus, UseGuards } from "@nestjs/common";
import { CommentService } from './comment.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CommentDto } from "./dto/comment.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Session } from "../auth/session/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}


  @Get(':id')
  @ApiOperation({ summary: 'Получение комментариев определенной публикации'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Успех' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Плохой запрос' })
  @ApiParam({name: 'postId', type: 'number', description: 'Идентификатор поста'})
  findByPost(@Param('postId', new ParseIntPipe())  postId: number) {
    return this.commentService.findAllByPost(+postId);
  }

  @Post(':postId')
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Не найден' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успех' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Плохой запрос' })
  @ApiParam({name: 'postId', type: 'number', description: 'Идентификатор связанного поста'})
  @ApiBody({type: CommentDto, description: 'Тело создаваемого комментария'})
  @UseGuards(new AuthGuard())
  @ApiSecurity('basic')
  create(@Param('postId', new ParseIntPipe()) postId: number, @Body() dto: CommentDto,  @Session() session: SessionContainer) {
    let userId = session.getUserId();
    return this.commentService.create(postId, dto, userId);
  }
  @ApiOperation({ summary: 'Удаление комментария' })
  @ApiParam({name: 'id', type: 'number', description: 'Идентификатор комментария'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Успех' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Плохой запрос' })
  @UseGuards(new AuthGuard())
  @ApiSecurity('basic')
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number, @Session() session: SessionContainer) {
    let userId = session.getUserId();
    return this.commentService.remove(+id, userId);
  }
}
