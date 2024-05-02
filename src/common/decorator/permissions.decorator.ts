import { Subjects } from '@app/casl/casl-ability.factory';
import { SetMetadata } from '@nestjs/common';

export const Permission = (permission: {
  access: string;
  ownership?: any;
  module: Subjects;
}) => SetMetadata('permission', permission);
