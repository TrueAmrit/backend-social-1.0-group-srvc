import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupDto } from 'src/submodules/backend-social-1.0-dtos/src/dtos/group.dto';
import { Content } from 'src/submodules/backend-social-1.0-entities/src/entities/content.entity';
import { Group } from 'src/submodules/backend-social-1.0-entities/src/entities/group.entity';
import { User } from 'src/submodules/backend-social-1.0-entities/src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async createGroup(Group: GroupDto) {
    try {
      const GroupEntity = this.groupRepository.create(Group);
      // const userEntity = this.userRepository.create(Group.users[0]);
      // console.log(userEntity);

      GroupEntity.users = Group.users;
      const createdGroup = await this.groupRepository.save(GroupEntity);
      return createdGroup;
    } catch (err) {
      throw err;
    }
  }

  async addUserToGroup(userId: number, groupId: number) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      const group = await this.groupRepository.findOneBy({ id: groupId });
      if (user && group) {
        // group.users = user.groups;
        // const toUpdate = await this.userRepository.preload(group);
        // noteRepo.save(toUpdate);
        // console.log(user, group);
        // user[0].groups = groupId[0];
        // const addedRelation = await this.groupRepository.save(toUpdate);
        // const updatedUser = await this.userRepository.update(
        //   user[0].id,
        //   addedRelation,
        // );
        // return addedRelation;
        // const addedRelation = await this.groupRepository
        //   .createQueryBuilder('group')
        //   .relation(User, 'groups')
        //   .of(User)
        //   .add(userId)
        //   .execute();
      } else {
        return 'user or group not exist';
      }
    } catch (err) {
      throw err;
    }
  }

  async deleteGroup(groupId: number) {
    try {
      const deletedGroup = await this.groupRepository.delete(groupId);
      return deletedGroup;
    } catch (error) {
      throw error;
    }
  }

  async getUsersByGroup(groupId: number) {
    try {
      const fetchedUsers = await this.userRepository.find({
        where: {
          groups: { id: groupId },
        },
      });
      return fetchedUsers;
    } catch (error) {
      throw error;
    }
  }
}
