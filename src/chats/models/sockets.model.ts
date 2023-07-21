import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

const options: SchemaOptions = {
  collection: 'sockets',
  timestamps: true,
};

export type SocketDocument = HydratedDocument<Socket>;

@Schema(options)
export class Socket {
  @Prop({ unique: true, required: true })
  @IsNotEmpty()
  @IsString()
  id: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  username: string;
}

export const SocketSchema = SchemaFactory.createForClass(Socket);
