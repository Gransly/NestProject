import { Injectable } from '@nestjs/common';
import { DatabaseService } from "./database/database.service";
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private db: DatabaseService) {
  }
  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.db.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.db.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.db.post.create({ data });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    //TODO if found post then delete
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
