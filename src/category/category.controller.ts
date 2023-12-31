import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from "@nestjs/common";
import { CategoryService } from './category.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Получение всех категорий' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успез' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Плохой запрос' })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
