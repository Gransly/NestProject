import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { PostService } from './postService';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDto } from "./dto/createPostDto";
import { UpdatePostDto } from "./dto/updatePostDto";

@Controller()
export class AppController {
  constructor(private readonly postService: PostService) {
  }

  @Get('posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString?: string
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            body: { contains: searchString },
          },
        ],
      },
    });
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
