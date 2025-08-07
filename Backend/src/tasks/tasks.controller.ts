import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { AssignTaskDto } from './dtos/assign-task.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/user.decorator';
import { JwtPayload } from '../shared/interfaces/jwt-payload.interface';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.tasksService.create(createTaskDto, user.sub);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tasksService.findAll();
  }

  @Get('me')
  getUserTasks(@GetUser() user: JwtPayload) {
    return this.tasksService.getUserTasks(user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.tasksService.update(id, updateTaskDto, user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: JwtPayload) {
    return this.tasksService.remove(id, user.sub);
  }

  @Patch(':id/assign')
  assign(
    @Param('id') id: string,
    @Body() assignTaskDto: AssignTaskDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.tasksService.assignTask(id, assignTaskDto, user.sub);
  }
}