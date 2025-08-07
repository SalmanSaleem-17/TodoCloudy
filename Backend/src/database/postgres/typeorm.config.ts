import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../../config/config.service';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: configService.get('NODE_ENV') !== 'production',
  logging: configService.get('NODE_ENV') === 'development',

ssl:
  configService.get('POSTGRES_SSL') === 'true'
    ? { rejectUnauthorized: false }
    : false,
});
