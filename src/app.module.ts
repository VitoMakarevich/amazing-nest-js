import { Module } from '@nestjs/common';
import { AuthService } from './auth/services/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './users/services/user.service';
import {config} from 'dotenv';
import { ValidationModule } from './validation/validation.module';
import { ELASTIC_CONNECTION, ElasticConnectionProvider } from './app.providers';
import { ElasticModule } from './elastic/elastic.module';
import { EntitySynchronizer } from './ElasticSynchronizer';
import { getFromContainer } from 'typeorm';
import { Synchronizer } from './elastic/syncronizer';

config();

@Module({
  providers: [EntitySynchronizer],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      subscribers: [EntitySynchronizer],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ValidationModule,
    ElasticModule,
  ],
})
export class AppModule {
  constructor(private synchronizer: Synchronizer) {
    const t = getFromContainer(EntitySynchronizer)
    t.setSynchronizer(this.synchronizer)
  }
}
