import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Repository } from "typeorm";
import { Category } from "../category/entities/category.entity";
import { PostDto } from "./dto/post.dto";
import { User } from "../user/entities/user.entity";

@Injectable()
export class PostService {

  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>;

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(dto: PostDto, userId: string) {

    let foundUser = await this.userRepository.findOneBy({id : userId});
    if (!foundUser) {
      throw new HttpException('Юзер не найден!', HttpStatus.NOT_FOUND)
    }

    let post: Post;
    let categories = [];
    for (let i = 0; i < dto.categories.length; i++) {
      // @ts-ignore
      let foundCategory = await this.categoryRepository.findOneBy({ name: dto.categories[i].name })
      // @ts-ignore
      if (foundCategory) {
        categories.push(foundCategory);
      }
    }
    post = new Post(dto.content, dto.title, userId, categories, foundUser.blog)
    return await this.postRepository.save(post);
  }

  async findAll(id: number) {
    let posts = await this.postRepository.find({
      where : {
        id: id
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        userId: true,
        comments: {
          userId: true,
          id: true,
          text: true,
        }
      },
      relations:
        ['comments', 'categories'],
      order: {
        createdAt: 'DESC',
        comments : {
          createdAt : 'ASC',
        }
      }
    });

    return posts;
  }
  async findOne(id: number) {
    let post = await this.postRepository.findOne({
      where : {
        id : id,
      },
      relations: {
        categories: true,
      }
    })

    if (!post)
      throw new NotFoundException()
    return post;
  }

  async remove(id: number, userId: string) {
    const found = await this.postRepository.findOneBy({id : id})
    if (found.userId !== userId) {
      throw new Error('Идентификаторы пользоваталей не совпадают. ' +
        'У вас нету прав сделать это!')
    }

    await this.postRepository.delete(id);
  }

  async update(postId: number, dto: PostDto,  userId: string) {
    let foundPost = await this.postRepository.findOne({
      where: { id: postId }
    });

    if (!foundPost) {
      throw new NotFoundException()
    }

    if (foundPost.userId !== userId) {
      throw new Error('Идентификаторы пользоваталей не совпадают. ' +
        'У вас нету прав сделать это!')
    }


    let categories = [];

    for (let i = 0; i < dto.categories.length; i++) {
      // @ts-ignore
      let foundCategory = await this.categoryRepository.findOneBy({ name: dto.categories[i].name })
      // @ts-ignore
      if (foundCategory) {
        categories.push(foundCategory);
      }
    }

    foundPost.categories = categories
    foundPost.content = dto.content
    foundPost.title = dto.title

    return this.postRepository.save({ ...foundPost });
  }
}
