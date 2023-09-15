import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class BlogDto {
  @ApiProperty({ description: "The title of the Blog", nullable: false })
  @IsString()
  @IsNotEmpty()
  title: string;
}