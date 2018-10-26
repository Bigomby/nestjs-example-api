import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'modules/users/users.module';
import { AuthModule } from 'modules/auth/auth.module';

const ormconfig = require('../../ormconfig.json');
ormconfig.host = process.env.DB_HOST || ormconfig.host;
ormconfig.port = process.env.DB_PORT || ormconfig.port;
ormconfig.username = process.env.DB_USER || ormconfig.username;
ormconfig.password = process.env.DB_PASSWORD || ormconfig.password;
ormconfig.database = process.env.DB_NAME || ormconfig.database;
ormconfig.synchronize = process.env.NODE_ENV !== 'production';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot(ormconfig)],
})
export class AppModule {}
