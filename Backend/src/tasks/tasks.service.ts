import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { AssignTaskDto } from './dtos/assign-task.dto';
import { UsersService } from '../users/users.service';
import { TaskStatus } from '../common/constants/task-status.enum';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly usersService: UsersService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  // Create a new task
  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      createdBy: { id: userId },
    });
    const savedTask = await this.tasksRepository.save(task);
    this.eventsGateway.notifyTaskCreated(savedTask);
    return savedTask;
  }

  // Get all tasks
  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find({
      relations: ['assignee', 'createdBy'],
    });
  }

  // Get task by ID
  async findOne(id: string): Promise<Task | null> {
    return this.tasksRepository.findOne({
      where: { id },
      relations: ['assignee', 'createdBy'],
    });
  }

  // Update a task
  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.createdBy.id !== userId) {
      throw new ForbiddenException('You can only update your own tasks');
    }

    await this.tasksRepository.update(id, updateTaskDto);

    const updatedTask = await this.tasksRepository.findOne({
      where: { id },
      relations: ['assignee', 'createdBy'],
    });

    if (!updatedTask) {
      throw new NotFoundException('Task not found after update');
    }

    this.eventsGateway.notifyTaskUpdated(updatedTask);
    return updatedTask;
  }

  // Delete a task
  async remove(id: string, userId: string): Promise<void> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.createdBy.id !== userId) {
      throw new ForbiddenException('You can only delete your own tasks');
    }

    await this.tasksRepository.delete(id);
    this.eventsGateway.notifyTaskDeleted(id);
  }

  // Assign task to a user
  async assignTask(
    id: string,
    assignTaskDto: AssignTaskDto,
    userId: string,
  ): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.createdBy.id !== userId) {
      throw new ForbiddenException('You can only assign your own tasks');
    }

    const assignee = await this.usersService.findOne(assignTaskDto.assigneeId);
    if (!assignee) {
      throw new NotFoundException('Assignee not found');
    }

    task.assignee = assignee;
    task.status = TaskStatus.IN_PROGRESS;

    const updatedTask = await this.tasksRepository.save(task);
    this.eventsGateway.notifyTaskAssigned(updatedTask);
    return updatedTask;
  }

  // Get tasks assigned to a user
  async getUserTasks(userId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { assignee: { id: userId } },
      relations: ['assignee', 'createdBy'],
    });
  }
}
