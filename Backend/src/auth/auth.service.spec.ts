import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/user.entity';
import { comparePassword } from '../../common/utils/compare-password';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: await comparePassword('password', 'hashedpassword'),
      } as User;

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(mockUser);

      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toEqual(mockUser);
    });

    it('should return null if credentials are invalid', async () => {
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);

      const result = await service.validateUser('test@example.com', 'wrong');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token', async () => {
      const mockUser = { id: '1', email: 'test@example.com', role: 'user' };
      const mockToken = 'mockToken';

      jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

      const result = await service.login(mockUser as User);
      expect(result).toEqual({ access_token: mockToken });
    });
  });
});