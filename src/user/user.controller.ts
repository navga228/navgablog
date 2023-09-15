import { Controller, Post, Body, Param, Delete, HttpStatus, HttpException, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { Session } from "../auth/session/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";
import { AuthGuard } from "../auth/auth.guard";
import { UserDto } from "./dto/user.dto";

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: UserDto, description: 'Тело пользователя' })
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Пользователь создан' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Плохой запрос' })
  @UseGuards(new AuthGuard())
  create(@Body() createUserDto: UserDto, @Session() session : SessionContainer) {
    return this.userService.create(createUserDto, session.getUserId());
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление пользователя, используя его идентификатор' })
  @ApiParam({name: 'id', type: 'number', description: 'Идентификатор пользователя'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Успех' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Плохой запрос' })
  @ApiSecurity('basic')
  @UseGuards(new AuthGuard())
  remove(@Param('id') id: string, @Session() session : SessionContainer) {
    if (session.getUserId() !== id)
      throw new HttpException('Внимание! Удаление чужого id!', HttpStatus.BAD_REQUEST );
    return this.userService.remove(id);
  }
}
