export type Chat={jid:string;name?:string;pushName?:string;unreadCount?:number;conversationTimestamp?:number;archived?:boolean;muted?:boolean;readOnly?:boolean;lastMessage?:any;profilePictureUrl?:string};
export type Message={key:{id?:string;remoteJid?:string;fromMe?:boolean;participant?:string};message?:any;messageTimestamp?:number;pushName?:string;status?:string;update?:any};
export type ConnectionStatus={
  connected:boolean;
  sessionId?:string;
  status?:string;
  connection?:string;
  qr?:string;
  qrAvailable?:boolean;
  lastError?:string|null;
  reconnectAttempt?:number;
  connectedJid?:string|null;
  user?:any;
  lastDisconnect?:any;
};
