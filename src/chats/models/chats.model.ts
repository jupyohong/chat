import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { Socket as SocketModel } from './sockets.model';

const options: SchemaOptions = {
  collection: 'chats',
  timestamps: true,
};

export type ChatDocument = HydratedDocument<Chat>;

@Schema(options)
export class Chat {
  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true, ref: 'sockets' },
      id: { type: String },
      username: { type: String, required: true },
    },
  })
  @IsNotEmpty()
  @IsString()
  user: SocketModel;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  chat: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
