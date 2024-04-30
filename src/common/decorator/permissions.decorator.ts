import { SetMetadata } from '@nestjs/common';

export const Permission = (permission: {
  access: string;
  ownership: string;
  module: string;
}) => SetMetadata('permission', permission);
