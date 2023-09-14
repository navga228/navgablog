import { Injectable } from '@nestjs/common';
import { User } from "../user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Blog } from './entities/blog.entity';
import { Repository } from "typeorm";

@Injectable()
export class BlogService {
  @InjectRepository(Blog)
  private readonly blogRepository: Repository<Blog>;


  async create(user: User) {
    let blog = new Blog(user);
    return await this.blogRepository.save(blog);
  }

  async findAll() {
    return await this.blogRepository.find();
  }

  async findOne(id: number) {
    return await this.blogRepository.findOneBy({ id: id });
  }
}
