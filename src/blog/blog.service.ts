import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Blog } from './entities/blog.entity';
import { Repository } from "typeorm";
import { BlogDto } from "./dto/blog.dto";

@Injectable()
export class BlogService {
  @InjectRepository(Blog)
  private readonly blogRepository: Repository<Blog>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;


  async create(user: User) {
    let blog = new Blog(user, user.id);
    return await this.blogRepository.save(blog);
  }

  async findAll() {
    return await this.blogRepository.find();
  }

  async findOne(id: string) {
    let foundUser = await this.userRepository.findOneBy({id : id})
    if (!foundUser) {
      throw new HttpException('А ты уверен, что ты тот пользователь?', HttpStatus.NOT_FOUND);
    }

    let foundBlog= await this.blogRepository.findOneBy({ user: foundUser});

    if (!foundBlog) {
      throw new HttpException('Блога нету!', HttpStatus.NOT_FOUND);
    }

    return foundBlog;
  }

  async updateTitle(id: string, dto: BlogDto) {
    let foundUser = await this.userRepository.findOneBy({id : id})
    if (!foundUser) {
      throw new HttpException('А ты уверен, что ты тот пользователь?', HttpStatus.NOT_FOUND);
    }

    let foundBlog= await this.blogRepository.findOneBy({ user: foundUser});

    if (!foundBlog) {
      throw new HttpException('Блога нету!', HttpStatus.NOT_FOUND);
    }

    foundBlog.title = dto.title;
    return await this.blogRepository.save(foundBlog);
  }
}
