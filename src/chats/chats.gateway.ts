import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Chat } from './models/chats.model';
import { Socket as SocketModel } from './models/sockets.model';
import { Model } from 'mongoose';

// @WebSocketGateway()
@WebSocketGateway({ namespace: 'chats' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    @InjectModel(SocketModel.name)
    private readonly socketModel: Model<SocketModel>,
  ) {
    this.logger.log('constructor');
  }

  afterInit() {
    this.logger.log('init');
  }

  async handleConnection(@ConnectedSocket() socket) {
    this.logger.log(
      `Client(ip: ${socket.id}, namespace: ${socket.nsp.name} connected!`,
    );
  }

  async handleDisconnect(@ConnectedSocket() socket) {
    const user = await this.socketModel.findOne({ id: socket.id });
    if (user) {
      socket.broadcast.emit('disconnect_user', user.username);
      await user.deleteOne();
    }
    this.logger.log(
      `Client(ip: ${socket.id}, namespace: ${socket.nsp.name} disconnected..`,
    );
  }

  @SubscribeMessage('new_user')
  async handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket,
  ) {
    const exist = await this.socketModel.exists({ username });
    if (exist) {
      username = `${username}_${Math.floor(Math.random() * 100)}`;
    }
    await this.socketModel.create({ id: socket.id, username });
    socket.broadcast.emit('user_connected', username);
    return username;
  }

  @SubscribeMessage('send_chat')
  async handleNewChat(@MessageBody() chat: string, @ConnectedSocket() socket) {
    const socketObj = await this.socketModel.findOne({ id: socket.id });
    await this.chatModel.create({ user: socketObj, chat });
    socket.broadcast.emit('new_chat', { chat, from: socketObj?.username });
  }
}
