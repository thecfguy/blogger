import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { UsersModule } from '@app/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Permissions } from './entities/permission.entity';
import { User } from '@app/users/entities/user.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Group,Permissions,User])],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
