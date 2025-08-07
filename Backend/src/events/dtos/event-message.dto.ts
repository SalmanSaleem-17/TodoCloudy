import { IsString, IsNotEmpty } from 'class-validator';

export class EventMessageDto {
  @IsString()
  @IsNotEmpty()
  event: string;

  @IsString()
  @IsNotEmpty()
  data: string;
}