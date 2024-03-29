import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './models/chats.model';
import { Socket as SocketModel, SocketSchema } from './models/sockets.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: SocketModel.name, schema: SocketSchema },
    ]),
  ],
  providers: [ChatsGateway],
})
export class ChatsModule {}
