import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Content } from 'src/Schema/Content';
import { ContentService } from './content.service';

interface Room {
  users: User[];
}

interface User {
  id: string;
  name: string;
  color: string;
  previousblockfocused:string|null;
  blockfocused:string|null;
  avatar: any;
  cursor: { x: number; y: number };
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  rooms: { [roomName: string]: Room } = {};

  constructor( private contentservice: ContentService) {
    console.log('WebsocketGateway constructor');
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, data: { roomName: string; name: string; color: string;blockfocused:string|null;avatar:any }): void {
    client.join(data.roomName);
    console.log(`User ${client.id} joined room: ${data.roomName}, Color: ${data.color}, Name: ${data.name}`);
    if (!this.rooms[data.roomName]) {
      this.rooms[data.roomName] = { users: [] };
    }
    const room = this.rooms[data.roomName];
    room.users.push({ id: client.id, name: data.name, color: data.color, previousblockfocused:null,blockfocused:data.blockfocused,avatar:data.avatar,cursor: { x: 0, y: 0 } });
    this.server.to(client.id).emit('userList', room.users);
    this.server.to(data.roomName).emit('userList', room.users);

    console.log({ id: client.id, name: data.name, color: data.color, blockfocused:data.blockfocused,cursor: { x: 0, y: 0 } });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomName: string): void {
    client.leave(roomName);
    console.log(`User ${client.id} left room: ${roomName}`);
    if (this.rooms[roomName]) {
      const room = this.rooms[roomName];
      room.users = room.users.filter(user => user.id !== client.id);
      this.server.to(roomName).emit('userList', room.users);
    }

  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, messageData: { room: string; message: string }): void {
    const { room, message } = messageData;
    this.server.to(room).emit('message', message);
    console.log(`Message received in room ${room}: ${message}`);
  }

  @SubscribeMessage('mouseMove')
  handleMouseMove(client: Socket, position: { x: number; y: number,room:string,blockfocused:string|null }): void {
    if (position.room && this.rooms[position.room]) {
      const room = this.rooms[position.room];
      const user = room.users.find(user => user.id === client.id);
      if(position.x==null ){
       position.x=user.cursor.x;
      }
      if(position.y==null ){
        position.y=user.cursor.y;
       }
      if (user) {
        user.cursor = position;
        user.previousblockfocused=user.blockfocused;
        user.blockfocused=position.blockfocused;
        this.server.to(position.room).emit('userList', room.users);
      }
    }
  }


  @SubscribeMessage('update')
  handleupdate(client: Socket, messageData: { room: string; data: Content,index:number|null }): void {
    console.log("update", messageData);
    const { room, data,index } = messageData;
    client.to(room).emit('update', data,index);
    this.contentservice.UpdateContent(data);
  }


  @SubscribeMessage('delete')
  handledelete(client: Socket, messageData: { room: string; data: string[] }): void {
    console.log("update", messageData);
    const { room, data } = messageData;
    client.to(room).emit('delete', data);
    this.contentservice.Delteallcontent(data);
    console.log(`Message received in room ${room}: ${data}`);
  }


  handleDisconnect(client: Socket): void {
    console.log(`User ${client.id} disconnected`);

    for (const roomName in this.rooms) {
      if (this.rooms.hasOwnProperty(roomName)) {
        const room = this.rooms[roomName];
        room.users = room.users.filter(user => user.id !== client.id);
        this.server.to(roomName).emit('userList', room.users);
      }
    }
    console.log(this.rooms);
  }



}
