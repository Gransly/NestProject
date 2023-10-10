import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostService } from './service/postService';
import { DatabaseModule } from './database/database.module';
import { UtilService } from "./service/utilService";

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [PostService, UtilService],
})
export class AppModule {}
