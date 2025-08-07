import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { Redis } from 'ioredis';

const mockRedis = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
};

describe('RedisService', () => {
  let service: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: Redis,
          useValue: mockRedis,
        },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call get with correct key', async () => {
    mockRedis.get.mockResolvedValue('test');
    const result = await service.get('key');
    expect(result).toBe('test');
    expect(mockRedis.get).toHaveBeenCalledWith('key');
  });

  it('should call set with ttl', async () => {
    await service.set('key', 'value', 60);
    expect(mockRedis.set).toHaveBeenCalledWith('key', 'value', 'EX', 60);
  });

  it('should call set without ttl', async () => {
    await service.set('key', 'value');
    expect(mockRedis.set).toHaveBeenCalledWith('key', 'value');
  });

  it('should call del with correct key', async () => {
    await service.del('key');
    expect(mockRedis.del).toHaveBeenCalledWith('key');
  });
});
