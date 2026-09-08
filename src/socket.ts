import {io,Socket} from 'socket.io-client';
import {API,SESSION_ID} from './api';
export const socket:Socket=io(import.meta.env.VITE_SOCKET_URL||API,{autoConnect:false,transports:['websocket','polling']});
export const joinWhatsAppSession=()=>{
  if(socket.connected) socket.emit('whatsapp.join',{sessionId:SESSION_ID});
  else socket.once('connect',()=>socket.emit('whatsapp.join',{sessionId:SESSION_ID}));
};
