import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { BlogService } from './blog.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('blog')
@ApiTags('Blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}


  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение одного блога' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Блог получен' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }
}
