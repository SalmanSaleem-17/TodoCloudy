import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../shared/interfaces/jwt-payload.interface';

export const generateJwt = (
  jwtService: JwtService,
  payload: JwtPayload,
): string => {
  return jwtService.sign(payload);
};