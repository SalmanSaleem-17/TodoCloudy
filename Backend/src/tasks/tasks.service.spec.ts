import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity'; 
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { EventsGateway } from '../events/events.gateway';

describe('TasksService', () => {
  let service: TasksService;
  let tasksRepository: Repository<Task>;
  let usersService: UsersService;
  let eventsGateway: EventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: EventsGateway,
          useValue: {
            notifyTaskCreated: jest.fn(),
            notifyTaskUpdated: jest.fn(),
            notifyTaskDeleted: jest.fn(),
            notifyTaskAssigned: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    tasksRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
    usersService = module.get<UsersService>(UsersService);
    eventsGateway = module.get<EventsGateway>(EventsGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto = { title: 'Test Task', description: 'Test Desc' };
      const userId = '1';
      const mockTask = { id: '1', ...createTaskDto, createdBy: userId };

      jest.spyOn(tasksRepository, 'create').mockReturnValue(mockTask as any);
      jest.spyOn(tasksRepository, 'save').mockResolvedValue(mockTask as any);

      const result = await service.create(createTaskDto, userId);
      expect(result).toEqual(mockTask);
      expect(eventsGateway.notifyTaskCreated).toHaveBeenCalledWith(mockTask);
    });
  });
});
