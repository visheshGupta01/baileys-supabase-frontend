import {io,Socket} from 'socket.io-client';
import {API} from './api';
export const socket:Socket=io(import.meta.env.VITE_SOCKET_URL||API,{autoConnect:false,transports:['websocket','polling']});
