import { Body, Controller, Get, HttpStatus, Param, Put } from "@nestjs/common";
import { BlogService } from './blog.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BlogDto } from "./dto/blog.dto";

@Controller('blog')
@ApiTags('Blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}


  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение одного блога по айди пользователя' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Блог получен' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновление одного блога' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Блог получен' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  updateTitle(@Param('id') id: string, @Body() dto: BlogDto) {
    return this.blogService.updateTitle(id, dto);
  }
}
