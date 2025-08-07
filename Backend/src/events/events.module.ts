import { Module, forwardRef } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { EventLog, EventLogSchema } from './event-log.schema';
import { TasksModule } from '../tasks/tasks.module';
import { AuthModule } from '../auth/auth.module'; // ✅ Import AuthModule for JwtService

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventLog.name, schema: EventLogSchema },
    ]),
    forwardRef(() => TasksModule),
    forwardRef(() => AuthModule), // ✅ Required to resolve JwtService in EventsGateway
  ],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
