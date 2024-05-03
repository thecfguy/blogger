// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UsersService } from '@app/users/users.service';
// import { AbilityFactory } from '@app/casl/casl-ability.factory';
// import { Ability } from '@casl/ability';
// import { Action } from '../constants/action';

// @Injectable()
// export class PermissionGuard implements CanActivate {
//   constructor(
//     private readonly reflector: Reflector,
//     private readonly userService: UsersService,
//     private abilityFactory: AbilityFactory,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const metadata = this.reflector.get<{
//       access: string;
//       ownership: string;
//       module: string;
//     }>('permission', context.getHandler());
//     if (!metadata) {
//       return false;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     //const getUser = await this.userService.findOne(user?.id);

//    /*  const ability: Ability = this.abilityFactory.defineAbilitiesFor(getUser);
//     if (!ability.can(metadata.access, metadata.module)) {
//       throw new ForbiddenException('You do not own this post.');
//     }

//     return ability.can(metadata.access, metadata.module); */
//     return true;
//   }
// }

