import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {

  @InjectRepository(Category)
  private readonly repository: Repository<Category>;

  async findAll(): Promise<Category[]> {
    return await this.repository.find()
  }
}
