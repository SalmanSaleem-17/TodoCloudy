import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../tasks/tasks.controller';
import { TasksService } from '../tasks/tasks.service';
import { CreateTaskDto } from '../tasks/dtos/create-task.dto';
import { UpdateTaskDto } from '../tasks/dtos/update-task.dto';
import { AssignTaskDto } from '../tasks/dtos/assign-task.dto';
import { JwtPayload } from '../shared/interfaces/jwt-payload.interface';
import { Role } from 'src/common/constants/roles.enum';

describe('TasksController', () => {
  let controller: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            getUserTasks: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            assignTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Desc',
      };
      const mockTask = { id: '1', ...createTaskDto };
      const mockUser: JwtPayload = {
        sub: '1',
        email: 'test@example.com',
        role: Role.USER,
      };
      jest.spyOn(tasksService, 'create').mockResolvedValue(mockTask as any);

      const result = await controller.create(createTaskDto, mockUser);
      expect(result).toEqual(mockTask);
      expect(tasksService.create).toHaveBeenCalledWith(
        createTaskDto,
        mockUser.sub,
      );
    });
  });
});
