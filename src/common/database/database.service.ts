import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: this.config.get('DB_HOST'),
      port: 3306 ,
      username: 'root',
      password: '#Lalit@321',
      database: 'blogger',
      autoLoadEntities: true,
      synchronize: false,
    };
  }
}
