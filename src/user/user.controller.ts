import { Controller, Post, Body, Param, Delete, HttpStatus, HttpException, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { Session } from "../auth/session/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";
import { AuthGuard } from "../auth/auth.guard";
import { UserDto } from "./dto/user.dto";

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Пользователь создан' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  create(@Body() createUserDto: UserDto, @Session() session : SessionContainer) {
    if (session) {
      throw new HttpException('Ты зареган', HttpStatus.BAD_REQUEST );
    }
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Пользователь удален' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiSecurity('basic')
  @UseGuards(new AuthGuard())
  remove(@Param('id') id: string, @Session() session : SessionContainer) {
    if (session.getUserId() !== id)
      throw new HttpException('Чужой айди удаляешь', HttpStatus.BAD_REQUEST );
    return this.userService.remove(id);
  }
}
