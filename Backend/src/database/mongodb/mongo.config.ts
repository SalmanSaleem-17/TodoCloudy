// import { MongooseModuleOptions } from '@nestjs/mongoose';
// import { ConfigService } from '../../config/config.service';
// import { Connection } from 'mongoose';

// export const getMongoConfig = (
//   configService: ConfigService,
// ): MongooseModuleOptions => ({
//   uri: configService.get<string>('MONGO_URI'),
//   connectionFactory: (connection: Connection) => {
//     console.log('Mongodb Connected Successfully.');
//     return connection;
//   },
// });

import mongoose from 'mongoose';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  const uri = configService.get<string>('MONGO_URI');

  mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB Connected Successfully.');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB Connection Failed:', err);
  });

  return {
    uri,
  };
};
