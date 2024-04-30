import { User } from '@app/users/entities/user.entity';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreatePermissionDto {
  @IsOptional()
  id: number;

  @IsString()
  module: string;

  @IsString()
  access: string;

  @IsString()
  ownership: string;
}

export class CreateGroupDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePermissionDto)
  permissions: CreatePermissionDto[];

  @IsOptional()
  @IsArray()
  users: User[];
}
