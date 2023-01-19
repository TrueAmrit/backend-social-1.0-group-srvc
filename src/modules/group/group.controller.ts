import { Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { RMQPayloadDto } from 'src/submodules/backend-social-1.0-rmq/src/dtos/rmqPayload.dto';
import { RmqTopics } from 'src/submodules/backend-social-1.0-rmq/src/enums/rmqTopics';
import { GroupService } from './group.service';

@Controller('group')
export default class ContentController {
  constructor(private readonly groupService: GroupService) {}

  @EventPattern(RmqTopics.GROUP_CREATION_TOPIC) // localhost:4000/group -ex: {"tittle": "group tittle","type": "public","users":[{"id":1}]} to create new group
  async createGroup(data: any) {
    // localhost:4000/group -ex: {"id": 2, tittle": "updated tittle","type": "public"} to update existing group
    try {
      const rmqPayload: RMQPayloadDto = data.payload;
      console.log('Group DTO here', rmqPayload);
      await this.groupService.createGroup(rmqPayload.payload);
    } catch (err) {
      console.log(err);
    }
  }

  @Put('/add')
  async addUserToGroup(@Query() query: { userId: number; groupId: number }) {
    try {
      const { userId, groupId } = query;
      const addedRelation = await this.groupService.addUserToGroup(
        userId,
        groupId,
      );
      return addedRelation;
    } catch (err) {
      console.log(err);
    }
  }

  @Delete('/delete/:id') // localhost:4000/group/delete/6
  async deleteUser(@Param('id') groupId: number) {
    try {
      const deletedGroup = await this.groupService.deleteGroup(groupId);
      return deletedGroup;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Get('/users') //localhost:4000/group/users?groupId=2 (for fetching all users of a group)
  async getUsersByGroup(@Query() query: { groupId: number }) {
    try {
      const { groupId } = query;
      const fetchedUsers = await this.groupService.getUsersByGroup(groupId);

      return fetchedUsers;
    } catch (error) {
      console.log(error);
    }
  }
}
