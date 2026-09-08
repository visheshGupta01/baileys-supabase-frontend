export const API=import.meta.env.VITE_API_URL||'http://localhost:3000';
export const SESSION_ID=import.meta.env.VITE_WA_SESSION_ID||'default-user';
let token=localStorage.getItem('wa_token')||import.meta.env.VITE_AUTH_TOKEN||'';
export const setToken=(v:string)=>{token=v;localStorage.setItem('wa_token',v)};
export const getToken=()=>token;
async function request<T>(path:string,options:RequestInit={}){const headers=new Headers(options.headers);headers.set('Content-Type','application/json');if(token)headers.set('Authorization',`Bearer ${token}`);const r=await fetch(`${API}${path}`,{...options,headers,cache:'no-store'});const text=await r.text();let data:any;try{data=text?JSON.parse(text):{}}catch{data={raw:text}}if(!r.ok)throw new Error(data?.error||data?.message||`HTTP ${r.status}`);return data as T}
const withSession=(path:string)=>`${path}${path.includes('?')?'&':'?'}sessionId=${encodeURIComponent(SESSION_ID)}`;
export const api={
 status:()=>request<ConnectionStatus>(withSession('/api/wa/status')),
 qr:()=>request<any>(withSession('/api/wa/qr')),
 connect:()=>request<any>(withSession('/api/wa/connect'),{method:'POST'}),
 logout:()=>request<any>(withSession('/api/wa/logout'),{method:'POST'}),
 chats:()=>request<any>(withSession('/api/wa/chats')),
 text:(to:string,text:string)=>request<any>(withSession('/api/wa/messages/text'),{method:'POST',body:JSON.stringify({sessionId:SESSION_ID,jid:to,text})}),
 media:(body:any)=>request<any>(withSession('/api/wa/messages/media'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 location:(body:any)=>request<any>(withSession('/api/wa/messages/location'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 contact:(body:any)=>request<any>(withSession('/api/wa/messages/contact'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 poll:(body:any)=>request<any>(withSession('/api/wa/messages/poll'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 reaction:(body:any)=>request<any>(withSession('/api/wa/messages/reaction'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 read:(body:any)=>request<any>(withSession('/api/wa/messages/read'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 del:(body:any)=>request<any>(withSession('/api/wa/messages/delete'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 edit:(body:any)=>request<any>(withSession('/api/wa/messages/edit'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 presence:(body:any)=>request<any>(withSession('/api/wa/messages/presence'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 archive:(body:any)=>request<any>(withSession('/api/wa/chats/archive'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 mute:(body:any)=>request<any>(withSession('/api/wa/chats/mute'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 chatRead:(body:any)=>request<any>(withSession('/api/wa/chats/read'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 chatDelete:(body:any)=>request<any>(withSession('/api/wa/chats/delete'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 group:(jid:string)=>request<any>(withSession(`/api/wa/groups/${encodeURIComponent(jid)}`)), createGroup:(body:any)=>request<any>(withSession('/api/wa/groups'),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 groupAdd:(jid:string,body:any)=>request<any>(withSession(`/api/wa/groups/${encodeURIComponent(jid)}/participants`),{method:'POST',body:JSON.stringify({...body,sessionId:SESSION_ID})}), groupRemove:(jid:string,body:any)=>request<any>(withSession(`/api/wa/groups/${encodeURIComponent(jid)}/participants`),{method:'DELETE',body:JSON.stringify({...body,sessionId:SESSION_ID})}),
 groupSubject:(jid:string,body:any)=>request<any>(withSession(`/api/wa/groups/${encodeURIComponent(jid)}/subject`),{method:'PATCH',body:JSON.stringify({...body,sessionId:SESSION_ID})}), groupDescription:(jid:string,body:any)=>request<any>(withSession(`/api/wa/groups/${encodeURIComponent(jid)}/description`),{method:'PATCH',body:JSON.stringify({...body,sessionId:SESSION_ID})}), groupInvite:(jid:string)=>request<any>(withSession(`/api/wa/groups/${encodeURIComponent(jid)}/invite`)), groupLeave:(jid:string)=>request<any>(withSession(`/api/wa/groups/${encodeURIComponent(jid)}/leave`),{method:'POST'}),
 privacy:()=>request<any>(withSession('/api/wa/privacy')), privacyUpdate:(body:any)=>request<any>(withSession('/api/wa/privacy'),{method:'PATCH',body:JSON.stringify({...body,sessionId:SESSION_ID})})
};
export {API};
