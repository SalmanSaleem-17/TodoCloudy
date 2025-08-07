import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return access token', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const mockToken = { access_token: 'mockToken' };

      jest.spyOn(authService, 'login').mockResolvedValue(mockToken);

      const result = await controller.login(loginDto, { user: {} });
      expect(result).toEqual(mockToken);
    });
  });

  describe('register', () => {
    it('should register user and return token', async () => {
      const registerDto: RegisterDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      const mockUser = { id: '1', ...registerDto };
      const mockToken = { access_token: 'mockToken' };

      jest.spyOn(usersService, 'create').mockResolvedValue(mockUser as any);
      jest.spyOn(authService, 'login').mockResolvedValue(mockToken);

      const result = await controller.register(registerDto);
      expect(result).toEqual(mockToken);
    });
  });
});