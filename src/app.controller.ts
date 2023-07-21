import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  getHello() {
    return {
      data: {
        title: 'Cocochat',
        copyright: 'Coconut Silo',
      },
    };
  }
}
