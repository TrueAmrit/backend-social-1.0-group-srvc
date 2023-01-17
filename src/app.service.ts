import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GroupDto } from './submodules/backend-social-1.0-dtos/src/dtos/group.dto';
import { RMQPayloadDto } from './submodules/backend-social-1.0-rmq/src/dtos/rmqPayload.dto';
import { PlatformEvents } from './submodules/backend-social-1.0-rmq/src/enums/platformEvents';
import { RmqTopics } from './submodules/backend-social-1.0-rmq/src/enums/rmqTopics';
import { MsgBrokerService } from './submodules/backend-social-1.0-rmq/src/module/msg-broker-ops/msg-broker-ops.service';

@Injectable()
export class AppService {
  constructor(
    @Inject('GROUP_SERVICE_QUEUE') private groupQueueClient: ClientProxy,
    private readonly msgBrokerService: MsgBrokerService,
  ) {}

  async createGroup(group: GroupDto) {
    const rmqPayload: RMQPayloadDto = {
      event: PlatformEvents.GROUP_CREATION,
      payload: group,
    };

    this.msgBrokerService.emitToQueue(
      rmqPayload,
      RmqTopics.GROUP_CREATION_TOPIC,
      this.groupQueueClient,
    );
    return 'Group Created successfully';
  }
}
