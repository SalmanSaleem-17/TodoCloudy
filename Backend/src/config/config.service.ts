import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService extends NestConfigService {
  get jwtSecret(): string {
    const secret = this.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in configuration');
    }
    return secret;
  }

  get jwtExpiration(): string {
    const expiration = this.get<string>('JWT_EXPIRATION');
    if (!expiration) {
      throw new Error('JWT_EXPIRATION is not defined in configuration');
    }
    return expiration;
  }

  get corsOrigin(): string {
    const origin = this.get<string>('CORS_ORIGIN');
    if (!origin) {
      throw new Error('CORS_ORIGIN is not defined in configuration');
    }
    return origin;
  }
}