import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const metadata = this.reflector.get<{
      access: string;
      ownership: string;
      module: string;
    }>('permission', context.getHandler());
    if (!metadata) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userGroups = await this.userService.findOne(user?.id);
    const userPermissions = userGroups.groups.flatMap((group) => group.permissions);

    const hasPermission = userPermissions.some(
      (permission) =>
        permission.access === metadata.access &&
        permission.ownership === metadata.ownership &&
        permission.module === metadata.module,
    );

    return hasPermission;
  }
}
