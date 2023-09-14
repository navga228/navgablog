import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CommentDto {
  @ApiProperty({ description: "Текст комментария", nullable: false })
  @IsString()
  @IsNotEmpty()
  text: string;
}