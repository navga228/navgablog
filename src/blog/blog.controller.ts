import { Body, Controller, Get, HttpStatus, Param, Put } from "@nestjs/common";
import { BlogService } from './blog.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BlogDto } from "./dto/blog.dto";
import { UserDto } from "../user/dto/user.dto";

@Controller('blog')
@ApiTags('Blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}


  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Успех' })
  @ApiOperation({ summary: 'Получение всех блогов' })
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение одного блога по айди пользователя' })
  @ApiParam({name: 'id', type: 'number', description: 'Идентификатор пользователя'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Успех' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Плохой запрос' })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновление одного блога' })
  @ApiBody({ type: UserDto, description: 'Тело блога' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успех' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Плохой запрос' })
  updateTitle(@Param('id') id: string, @Body() dto: BlogDto) {
    return this.blogService.updateTitle(id, dto);
  }
}
