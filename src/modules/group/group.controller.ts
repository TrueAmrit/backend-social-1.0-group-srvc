import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { RMQPayloadDto } from 'src/submodules/backend-social-1.0-rmq/src/dtos/rmqPayload.dto';
import { RmqTopics } from 'src/submodules/backend-social-1.0-rmq/src/enums/rmqTopics';
import { GroupService } from './group.service';

@Controller('group')
export default class ContentController {
  constructor(private readonly groupService: GroupService) {}

  @EventPattern(RmqTopics.GROUP_CREATION_TOPIC)
  async createGroup(data: any) {
    try {
      const rmqPayload: RMQPayloadDto = data.payload;
      console.log('Group DTO here', rmqPayload);
      await this.groupService.createGroup(rmqPayload.payload);
    } catch (err) {
      console.log(err);
    }
  }
}
