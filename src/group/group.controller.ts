import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
  ConflictException,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ValidateGroup } from './guard/validateGroup.guard';
import { GroupFindDto } from './dto/group-find.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    try {
      return await this.groupService.create(createGroupDto);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('group name must be unique');
      } else {
        throw error;
      }
    }
  }

  @Post('list')
  async findAll(@Body() queryDto: GroupFindDto, @Req() req) {
    const { filter, pagination, sort } = queryDto;
    const { data: groups, count } = await this.groupService.findAll({
      filter,
      pagination,
      sort,
    });
    const { page, maxRows } = pagination;
    req.body['pagination'] = {
      page: page,
      maxRows: maxRows,
      offset: page + 1,
      count: count,
    };
    return groups;
  }

  @Get(':id')
  @UseGuards(ValidateGroup)
  findOne(@Param('id') id: string, @Req() request) {
    const group = request.group;
    return group;
  }

  @Patch(':id')
  @UseGuards(ValidateGroup)
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    try {
      const updatedGroup = await this.groupService.update(+id, updateGroupDto);
      return updatedGroup;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('group name must be unique');
      } else {
        throw error;
      }
    }
  }

  @Delete(':id')
  @UseGuards(ValidateGroup)
  async remove(@Param('id') id: string) {
    return await this.groupService.remove(+id);
  }
}
