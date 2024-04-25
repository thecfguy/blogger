import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  mapUserDtoToEntity(createUserDto: UserDto): User {
    const user = new User();
    user.id = createUserDto.id;
    user.name = createUserDto.name;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    if(createUserDto?.role){
      user.role= createUserDto.role
    }    
    if (createUserDto.address) {
      user.street = createUserDto.address.street;
      user.suite = createUserDto.address.suite;
      user.city = createUserDto.address.city;
      user.zipcode = createUserDto.address.zipcode;
      user.lat = createUserDto.address.geo.lat;
      user.lng = createUserDto.address.geo.lng;
    }
    user.phone = createUserDto.phone;
    user.website = createUserDto.website;
    if (createUserDto.company) {
      user.companyName = createUserDto.company.name;
      user.companyCatchPhrase = createUserDto.company.catchPhrase;
      user.companyBs = createUserDto.company.bs;
    }
    
    return user;
  }

  mapUserEntityToDto(user: User): UserDto {
    const createUserDto = new UserDto();
  
    createUserDto.id = user.id;
    createUserDto.name = user.name;
    createUserDto.username = user.username;
    createUserDto.email = user.email;
    createUserDto.password = user.password;
    createUserDto.role= user.role,
    createUserDto.address = {
      street: user.street,
      suite: user.suite,
      city: user.city,
      zipcode: user.zipcode,
      geo: {
        lat: user.lat,
        lng: user.lng,
      },
    };
    createUserDto.phone = user.phone;
    createUserDto.website = user.website;
    createUserDto.company = {
      name: user.companyName,
      catchPhrase: user.companyCatchPhrase,
      bs: user.companyBs,
    };
    return createUserDto;
  }

  async create(createUserDto: UserDto) {
    
    const user = this.repo.create(this.mapUserDtoToEntity(createUserDto));
    return  this.mapUserEntityToDto(await this.repo.save(user)) as UserDto;
    
  }

  async findAll(filter?: unknown | null): Promise<UserDto[]> {
    const users = await this.repo.find({
      where: filter,
    });
    return users.map((user) => this.mapUserEntityToDto(user));

  }

  async findOne(id: number): Promise<UserDto> {
    return this.mapUserEntityToDto(
      await this.repo.findOneBy({ id }),
    ) as UserDto;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      return null;
    }
    Object.assign(user, updateUserDto);

    return this.mapUserEntityToDto(
      await this.repo.save(user, { reload: true }),
    );
  }

  async findByUsername(userName: string) {
    const user = await this.repo.findOne({ where: { username: userName } });
     console.log('step2')
    return user;
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
