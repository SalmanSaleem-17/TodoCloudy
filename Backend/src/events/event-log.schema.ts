import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class EventLog extends Document {
  @Prop({ required: true })
  eventType: string;

  @Prop({ required: true })
  data: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const EventLogSchema = SchemaFactory.createForClass(EventLog);