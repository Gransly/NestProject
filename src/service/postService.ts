import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { DatabaseService } from "../database/database.service";
import { UtilService } from "./utilService";

@Injectable()
export class PostService {
  constructor(private db: DatabaseService, private utils: UtilService) {
  }
  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.db.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(page: number, limit: number): Promise<Post[]> {
    return this.db.post.findMany({
      skip: this.utils.calculateSkip(page, limit),
      take: limit,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.db.post.create({ data });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    const post = await this.post(where)
    if(!post) {
      throw new HttpException('Not found post with this id', HttpStatus.NOT_FOUND)
    }
    return this.db.post.delete({
      where,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;
    return this.db.post.update({
      data,
      where,
    });
  }

}
