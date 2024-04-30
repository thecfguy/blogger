import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { User } from '@app/users/entities/user.entity';
import { GroupFilterDto } from './dto/group-filter.dto';
import { GroupFindDto } from './dto/group-find.dto';
import { sortTransform } from '@app/common/service/sort-transform';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private group: Repository<Group>,
    @InjectRepository(Permission)
    private permission: Repository<Permission>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(groupDto: CreateGroupDto): Promise<Group> {
    const group = new Group();
    group.name = groupDto.name;
    const permissions: Permission[] = await Promise.all(
      groupDto.permissions.map(async (permissionDto) => {
        const permission = new Permission();
        permission.module = permissionDto.module;
        permission.access = permissionDto.access;
        permission.ownership = permissionDto.ownership;
        return permission;
      }),
    );

    group.permission = permissions;
    return this.group.save(group);
  }

  async findAll({ filter, pagination, sort }: GroupFindDto) {
    //Pagination Logic
    const { page, maxRows } = pagination;
    const skip = ((page - 1) * maxRows) | 0;
    const take = maxRows;

    let totalNumber = 0;
    // let totalPage = totalNumber;
    // total number of comment count
    totalNumber = await this.group.count();

    //Find Logic

    const where: any = { ...filter };
    if (where.id && Array.isArray(where.id)) {
      where.id = In(where.id);
    }
    //Sort Logic
    const order = sortTransform(sort);

    const group = await this.group.find({
      take,
      skip,
      where,
      order,
      relations: ['permission', 'users'],
      select: {
        id: true,
        name: true,
        permission: {
          id: true,
          access: true,
          ownership: true,
          module: true,
        },
        users: {
          id: true,
          name: true,
        },
      },
    });
    return { data: group, count: totalNumber };
  }

  async findOne(filter: GroupFilterDto) {
    const modifiedFilter: any = {};
    if (typeof filter.id === 'number') {
      modifiedFilter.id = filter.id;
    }
    const group = await this.group.findOne({
      where: modifiedFilter,
      relations: ['permission', 'users'],
      select: {
        id: true,
        name: true,
        permission: {
          id: true,
          access: true,
          ownership: true,
          module: true,
        },
        users: {
          id: true,
          name: true,
        },
      },
    });
    return group;
  }
  async update(groupId: number, createGroupDto: UpdateGroupDto) {
    const group = await this.findOne({ id: groupId });
    group.name = createGroupDto.name;

    // get existing permissions for the group
    const existingPermissions = await this.permission.find({
      where: { group: group },
    });

    // filter out permissions to delete
    if (createGroupDto.permissions.length === 0) {
      group.permission = [];
    } else {
      // filter out permissions to delete
      const permissionsToDelete = existingPermissions.filter(
        (existingPermission) => {
          return !createGroupDto.permissions.some(
            (newPermission) => newPermission.id === existingPermission.id,
          );
        },
      );
      // // delete permissions that are not present in dto
      await this.permission.remove(permissionsToDelete);

      // create or update permissions
      const newPermissions: Permission[] = await Promise.all(
        createGroupDto.permissions.map(async (permissionDto) => {
          if (permissionDto.id) {
            // If permission ID is provided, try to find the existing permission
            const existingPermission = existingPermissions.find(
              (existingPermission) =>
                existingPermission.id === permissionDto.id,
            );

            if (existingPermission) {
              // Update existing permission
              existingPermission.module = permissionDto.module;
              existingPermission.access = permissionDto.access;
              existingPermission.ownership = permissionDto.ownership;
              return await this.permission.save(existingPermission);
            }
          } else {
            // No permission ID provided, create a new permission
            const newPermission = new Permission();
            newPermission.module = permissionDto.module;
            newPermission.access = permissionDto.access;
            newPermission.ownership = permissionDto.ownership;
            return await this.permission.save(newPermission);
          }
        }),
      );
      // Update group permissions
      group.permission = newPermissions;
    }
    return this.group.save(group);
  }

  remove(id: number) {
    return this.group.delete(id);
  }
}
