import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
  } from '@nestjs/common';
import { GroupService } from '../group.service';
  
  @Injectable()
  export class ValidateGroup implements CanActivate {
    constructor(private groupService: GroupService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const groupId = +request.params?.id;
        
     
      const group = await this.groupService.findOne({ id: groupId });
     
      if (!group) {
        throw new NotFoundException(`group not found`);
      }
      request.group = group;
      return true;
    }
  }
  