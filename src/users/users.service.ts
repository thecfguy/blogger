import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Group } from '@app/group/entities/group.entity';
import { GroupService } from '@app/group/group.service';
import {
  CreateGroupDto,
  CreatePermissionDto,
} from '@app/group/dto/create-group.dto';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  mapUserDtoToEntity(createUserDto: UserDto | UpdateUserDto): User {
    const user = new User();
    user.id = createUserDto.id;
    user.name = createUserDto.name;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    if (createUserDto?.role) {
      user.role = createUserDto.role;
    }
    if (createUserDto.address) {
      user.street = createUserDto.address.street;
      user.suite = createUserDto.address.suite;
      user.city = createUserDto.address.city;
      user.zipcode = createUserDto.address.zipcode;
      user.lat = createUserDto.address.geo.lat;
      user.lng = createUserDto.address.geo.lng;
    }
    user.phone = createUserDto.phone;
    user.website = createUserDto.website;
    if (createUserDto.company) {
      user.companyName = createUserDto.company.name;
      user.companyCatchPhrase = createUserDto.company.catchPhrase;
      user.companyBs = createUserDto.company.bs;
    }

    return user;
  }

  mapUserEntityToDto(user: User): UserDto {
    const createUserDto = new UserDto();
    console.log('called');
    createUserDto.id = user.id;
    createUserDto.name = user.name;
    createUserDto.username = user.username;
    createUserDto.email = user.email;
    createUserDto.password = user.password;
    (createUserDto.role = user.role),
      (createUserDto.address = {
        street: user.street,
        suite: user.suite,
        city: user.city,
        zipcode: user.zipcode,
        geo: {
          lat: user.lat,
          lng: user.lng,
        },
      });
    createUserDto.phone = user.phone;
    createUserDto.website = user.website;
    createUserDto.company = {
      name: user.companyName,
      catchPhrase: user.companyCatchPhrase,
      bs: user.companyBs,
    };
    createUserDto.groups = user?.groups?.map((group) => {
      const groupDto = new CreateGroupDto();
      groupDto.id = group?.id;
      groupDto.name = group?.name;
      groupDto.permissions = group?.permission?.map((permission) => {
        const permissionDto = new CreatePermissionDto();
        permissionDto.id = permission?.id;
        permissionDto.module = permission?.module;
        permissionDto.access = permission?.access;
        permissionDto.ownership = permission?.ownership;
        return permissionDto;
      });
      return groupDto;
    });

    return createUserDto;
  }

  async create(createUserDto: UserDto) {
    const user = this.repo.create(this.mapUserDtoToEntity(createUserDto));
    return this.mapUserEntityToDto(await this.repo.save(user)) as UserDto;
  }

  async findAll(filter?: unknown | null): Promise<UserDto[]> {
    const users = await this.repo.find({
      where: filter,
      relations: ['groups', 'groups.permission'],
      select: {
        groups: {
          id: true,
          name: true,
          permission: true,
        },
      },
    });
    return users.map((user) => this.mapUserEntityToDto(user));
  }

  async findOne(id: number) {
    return this.mapUserEntityToDto(
      await this.repo.findOne({
        where: { id: id },
        relations: ['groups', 'groups.permission'],
        select: {
          groups: {
            id: true,
            name: true,
            permission: true,
          },
        },
      }),
    ) as UserDto;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      return null;
    }
    if (updateUserDto.groups && updateUserDto.groups.length > 0) {
      user.groups = updateUserDto.groups.map(
        (group) => ({ id: group.id }) as Group,
      );
    } else {
      user.groups = [];
    }
    return this.repo.save(user);
  }

  async findByUsername(userName: string) {
    const user = await this.repo.findOne({ where: { username: userName } });
    return user;
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
