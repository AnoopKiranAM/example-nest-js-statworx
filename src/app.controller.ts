import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render("home")
  async getHello(){
    const data = await this.appService.getData();
    return { lists: Array.isArray(data.docs) ? data.docs : [] };
  }
}
