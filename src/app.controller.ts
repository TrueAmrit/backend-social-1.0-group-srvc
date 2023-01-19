import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { GroupDto } from './submodules/backend-social-1.0-dtos/src/dtos/group.dto';

@Controller('group')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createGroup(@Body() group: GroupDto) {
    try {
      const createdGroup = await this.appService.createGroup(group);
      return createdGroup;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
