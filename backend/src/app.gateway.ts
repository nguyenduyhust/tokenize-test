import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OrderBookData } from './app.interface';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    // Logging
    setInterval(() => {
      server.emit('welcome', 'Hello Web');
    }, 5000);
  }

  broadcastMs(event: string, message: any) {
    this.server.emit(event, message);
  }

  broadcastUpdatedOrderBookData(message: OrderBookData) {
    this.broadcastMs('new-order-book-data', message);
  }
}
