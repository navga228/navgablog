import { Injectable, NotFoundException } from "@nestjs/common";
import { Post } from "../post/entities/post.entity";
import { Comment } from "../comment/entities/comment.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PostService } from "../post/post.service";
import { CommentDto } from "./dto/comment.dto";

@Injectable()
export class CommentService {
  @InjectRepository(Comment)
  private readonly commentRepository: Repository<Comment>;

  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>;


  constructor(private readonly postService: PostService) {
  }

  async findAllByPost(postId: number): Promise<Comment[]> {
    const found = await this.postRepository.findBy({id : postId})
    return await this.commentRepository.findBy({ post : found})
  }

  async create(postId: number, dto: CommentDto, userId : string) {
    let post = await this.postService.findOne(postId);
    if (!post) {
      throw new Error('Публикация не найдена!')
    }
    let comment: Comment;
    comment = new Comment(dto.text, post, userId);
    return await this.commentRepository.save(comment);
  }

  async remove(id: number, userId: string): Promise<void> {
    const found = await this.commentRepository.findOneBy({id : id})
    if (!found) {
      throw new Error('Комментарий не найден!')
    }
    if (found.userId !== userId) {
      throw new Error('Идентификаторы пользоваталей не совпадают. ' +
        'У вас нету прав сделать это!')
    }
    await this.commentRepository.delete(id);
  }
}
