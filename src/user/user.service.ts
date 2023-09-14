import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { BlogService } from "../blog/blog.service";
import { deleteUser } from "supertokens-node";

@Injectable()
export class UserService {

  constructor(private readonly blogService: BlogService,
  ) {}

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(createUserDto: UserDto) {
    let found = await this.userRepository.findOneBy({ id: createUserDto.id })
    if (found)
      throw new HttpException('Такой id пользователя существует!', HttpStatus.CONFLICT);

    let user = await this.userRepository.save(new User(createUserDto.id));

    await this.blogService.create(user);

    return user;
  }

  async remove(id: string) {
     await this.userRepository.delete(id);
     await deleteUser(id);
     return;
  }
}
