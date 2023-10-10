import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  constructor() {
  }
  calculateSkip (page?: number, limit?: number) {
    if(!page){
      return 0;
    }
    return page * (limit ? limit : 10);
  }
}
