import { Exclude, Expose } from 'class-transformer';
import { Role } from '../../common/constants/roles.enum';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: Role;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}