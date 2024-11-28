import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class AppService {

  constructor(
    protected readonly httpService: HttpService,
  ) {}


  getHello(): string {
    return 'Hello World!';
  }


  async getData() {
    return await this.httpService.axiosRef
      .get('http://openlibrary.org/search/lists.json?q=book&limit=20&offset=0')
      .catch((error) => {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      })
      .then((res) => res.data);
  }
}
