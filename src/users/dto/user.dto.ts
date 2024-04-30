import { CreateGroupDto } from '@app/group/dto/create-group.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum Role {
  Admin = 'admin',
  User = 'user',
}

class GeoDto {
  lat: number;
  lng: number;
}
class AddressDto {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoDto;
}
class CompanyDto {
  name: string;
  catchPhrase: string;
 
  bs: string;
}
@Exclude()
export class UserDto {
  @IsOptional()
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  username: string;

 @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ValidateNested()
  @Type(() => AddressDto)
  @Expose()
  address: AddressDto;

  @IsOptional()
  @IsString()
  @Expose()
  phone: string;

  @IsOptional()
  @IsString()
  @Expose()
  website: string;

  @ValidateNested()
  @Type(() => AddressDto)
  @Expose()
  company: CompanyDto;
   
  @IsOptional()
  @IsArray()
  groups: CreateGroupDto[]
}
