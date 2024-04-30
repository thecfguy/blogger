import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Roles } from '@app/common/decorator/roles.decorator';
import { RoleGuard } from '@app/common/guard/role.guard';
import { Permission } from '@app/common/decorator/permissions.decorator';
import { PermissionGuard } from '@app/common/guard/permission.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // @Roles('user')
  // @UseGuards(RoleGuard)
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: UserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('username and email must be unique');
      } else {
        throw error;
      }
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedGroup = await this.usersService.update(+id, updateUserDto);
      return updatedGroup;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email and username must be unique');
      } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new NotFoundException('group not exist');
      } else {
        throw error;
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
