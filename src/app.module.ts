import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostService } from './postService';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [PostService],
})
export class AppModule {}
