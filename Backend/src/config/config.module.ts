import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { validate } from './env.validation';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: (config) => {
        const { error, value } = validate.validate(config, { abortEarly: false });
        if (error) {
          throw new Error(`Config validation error: ${error.message}`);
        }
        return value;
      },
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}