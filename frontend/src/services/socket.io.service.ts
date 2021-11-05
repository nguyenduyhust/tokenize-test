import SocketIOClient from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || '';
const NEW_ORDER_BOOK_DATA_EVENT_NAME = 'new-order-book-data';

export const createSocketConnection = () => {
  return SocketIOClient(SOCKET_URL);
};

const socket = createSocketConnection();

export const listenCommonMessage = () => {
  socket.on('welcome', (message: string) => {
    console.log(message);
  });
};

export const listenNewOrderBookData = (onSuccess: (data: any) => void) => {
  socket.on(NEW_ORDER_BOOK_DATA_EVENT_NAME, (message: any) => {
    onSuccess(message);
  });
};

export const removeNewOrderBookDataListener = () => {
  socket.off(NEW_ORDER_BOOK_DATA_EVENT_NAME);
};
