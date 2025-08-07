import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '../../config/config.service';

export const getMongoConfig = (
  configService: ConfigService,
): MongooseModuleOptions => ({
  uri: configService.get('MONGO_URI'),
});