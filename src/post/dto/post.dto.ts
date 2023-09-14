import { Category } from "../../category/entities/category.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CategoryDto } from "../../category/dto/category.dto";

export class PostDto {
  @ApiProperty({ description: "The title of the Post", nullable: false })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: "The contents of the post", nullable: false })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: "Category", nullable: true })
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => CategoryDto)
  categories: Category[];
}