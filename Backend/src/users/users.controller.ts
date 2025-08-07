import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/constants/roles.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { GetUser } from '../common/decorators/user.decorator';
import { JwtPayload } from '../shared/interfaces/jwt-payload.interface';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  getProfile(@GetUser() user: JwtPayload) {
    return this.usersService.findOne(user.sub);
  }

  @Patch('profile')
  updateProfile(
    @GetUser() user: JwtPayload,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.update(user.sub, updateProfileDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}