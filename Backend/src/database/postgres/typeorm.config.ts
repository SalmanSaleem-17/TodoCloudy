import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../../config/config.service';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// 👇 Load .env when used via CLI
dotenv.config();

// ✅ Exported for NestJS use
export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [path.join(__dirname, '/../../**/*.entity{.ts,.js}')],
  synchronize: configService.get('NODE_ENV') !== 'production',
  logging: configService.get('NODE_ENV') === 'development',
  ssl:
    configService.get('POSTGRES_SSL') === 'true'
      ? { rejectUnauthorized: false }
      : false,
});

// ✅ Standalone DataSource instance for CLI (typeorm CLI uses this)
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [path.join(__dirname, '/../../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
});


// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { ConfigService } from '../../config/config.service';

// export const getTypeOrmConfig = (
//   configService: ConfigService,
// ): TypeOrmModuleOptions => ({
//   type: 'postgres',
//   host: configService.get('POSTGRES_HOST'),
//   port: configService.get('POSTGRES_PORT'),
//   username: configService.get('POSTGRES_USER'),
//   password: configService.get('POSTGRES_PASSWORD'),
//   database: configService.get('POSTGRES_DB'),
//   entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
//   synchronize: configService.get('NODE_ENV') !== 'production',
//   logging: configService.get('NODE_ENV') === 'development',

// ssl:
//   configService.get('POSTGRES_SSL') === 'true'
//     ? { rejectUnauthorized: false }
//     : false,
// });
