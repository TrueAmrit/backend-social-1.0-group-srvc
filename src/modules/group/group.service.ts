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

      const createdGroup = await this.groupRepository.save(GroupEntity);
      return createdGroup;
    } catch (err) {
      throw err;
    }
  }
}
