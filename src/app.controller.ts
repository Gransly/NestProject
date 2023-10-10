import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put, Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDto } from "./dto/createPostDto";
import { UpdatePostDto } from "./dto/updatePostDto";
import { PostService } from "./service/postService";

@Controller()
export class AppController {
  constructor(private readonly postService: PostService) {
  }

  @Get('posts')
  async getPosts(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number
  ): Promise<PostModel[]> {
    return this.postService.posts(page, limit);
  }

  @UsePipes(new ValidationPipe())
  @Post('post/create')
  async createPost(@Body() dto: CreatePostDto): Promise<PostModel> {
    return this.postService.createPost(dto);
  }

  @Get('post/:id')
  async getPostById(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    return this.postService.post({ id });
  }

  @Delete('post/:id')
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    return this.postService.deletePost({ id });
  }

  @Put('post/:id')
  async updatePost(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id },
      data: dto,
    });
  }
}
