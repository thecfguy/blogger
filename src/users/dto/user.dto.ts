import { Expose } from 'class-transformer';

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
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  username: string;

  password: string;

  @Expose()
  email: string;
  @Expose()
  address: AddressDto;
  @Expose()
  phone: string;
  @Expose()
  website: string;
  @Expose()
  company: CompanyDto;
}
