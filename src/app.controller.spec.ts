import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PostService } from './service/postService';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [PostService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

});
