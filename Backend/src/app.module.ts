// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { EventsModule } from './events/events.module';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import configuration from './config/configuration';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validate: (config) => {
        const { error, value } = validate.validate(config, { abortEarly: false });
        if (error) {
          throw new Error(`Config validation error: ${error.message}`);
        }
        return value;
      },
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production',
        logging: process.env.NODE_ENV === 'development',
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    RedisModule,
    AuthModule,
    UsersModule,
    TasksModule,
    EventsModule,
    DatabaseModule,
    SharedModule,
  ],
})
export class AppModule {}
