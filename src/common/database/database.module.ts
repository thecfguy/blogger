import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@app/common/config/config.module';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
