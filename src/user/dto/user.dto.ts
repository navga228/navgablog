import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({ description: "Идентификатор пользователя", nullable: false })
  @IsString()
  @IsNotEmpty()
  id: string;
}
