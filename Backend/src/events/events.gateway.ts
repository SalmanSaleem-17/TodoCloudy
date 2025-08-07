import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventLog } from './event-log.schema';
import { JwtPayload } from '../shared/interfaces/jwt-payload.interface';
import { SOCKET_IO_EVENTS } from '../common/constants/app.constants';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Email-to-socket map
  private emailToSocketMap = new Map<string, string>();

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(EventLog.name) private eventLogModel: Model<EventLog>,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      client.data.user = payload;

      // Store mapping
      this.emailToSocketMap.set(payload.email, client.id);

      this.server.emit(SOCKET_IO_EVENTS.USER_CONNECTED, payload.email);
      await this.logEvent('connection', payload.email);
    } catch (error) {
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    const email = client.data.user?.email;
    if (email) {
      this.emailToSocketMap.delete(email);
      this.server.emit(SOCKET_IO_EVENTS.USER_DISCONNECTED, email);
      await this.logEvent('disconnection', email);
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);
    return { event: 'joinedRoom', data: room };
  }

  notifyTaskCreated(task: any) {
    this.server.emit(SOCKET_IO_EVENTS.TASK_CREATED, task);
    this.logEvent('task_created', task.id);
  }

  notifyTaskUpdated(task: any) {
    this.server.emit(SOCKET_IO_EVENTS.TASK_UPDATED, task);
    this.logEvent('task_updated', task.id);
  }

  notifyTaskDeleted(taskId: string) {
    this.server.emit(SOCKET_IO_EVENTS.TASK_DELETED, taskId);
    this.logEvent('task_deleted', taskId);
  }

  notifyTaskAssigned(task: any) {
    const assigneeEmail = task.assignee?.email;
    const socketId = this.emailToSocketMap.get(assigneeEmail);

    if (socketId) {
      this.server.to(socketId).emit(SOCKET_IO_EVENTS.TASK_ASSIGNED, task);
      this.logEvent('task_assigned', task.id);
    } else {
      // Optional: fallback or logging if user is not connected
      console.warn(`User with email ${assigneeEmail} not connected`);
    }
  }

  private async logEvent(eventType: string, data: string) {
    await this.eventLogModel.create({
      eventType,
      data,
      timestamp: new Date(),
    });
  }
}
