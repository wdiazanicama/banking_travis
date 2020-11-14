import { Controller, Get } from '@nestjs/common';
import { AppService } from '../application/services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHome(): string {
    return this.appService.getHome();
  }
}
