const API=import.meta.env.VITE_API_URL||'http://localhost:3000';
let token=localStorage.getItem('wa_token')||import.meta.env.VITE_AUTH_TOKEN||'';
export const setToken=(v:string)=>{token=v;localStorage.setItem('wa_token',v)};
export const getToken=()=>token;
async function request<T>(path:string,options:RequestInit={}){const headers=new Headers(options.headers);headers.set('Content-Type','application/json');if(token)headers.set('Authorization',`Bearer ${token}`);const r=await fetch(`${API}${path}`,{...options,headers});const text=await r.text();let data:any;try{data=text?JSON.parse(text):{}}catch{data={raw:text}}if(!r.ok)throw new Error(data?.error||data?.message||`HTTP ${r.status}`);return data as T}
export const api={
 status:()=>request<ConnectionStatus>('/api/wa/status'), qr:()=>request<any>('/api/wa/qr'), connect:()=>request<any>('/api/wa/connect',{method:'POST'}), logout:()=>request<any>('/api/wa/logout',{method:'POST'}),
 chats:()=>request<any>('/api/wa/chats'),
 text:(to:string,text:string)=>request<any>('/api/wa/messages/text',{method:'POST',body:JSON.stringify({jid:to,text})}),
 media:(body:any)=>request<any>('/api/wa/messages/media',{method:'POST',body:JSON.stringify(body)}),
 location:(body:any)=>request<any>('/api/wa/messages/location',{method:'POST',body:JSON.stringify(body)}),
 contact:(body:any)=>request<any>('/api/wa/messages/contact',{method:'POST',body:JSON.stringify(body)}),
 poll:(body:any)=>request<any>('/api/wa/messages/poll',{method:'POST',body:JSON.stringify(body)}),
 reaction:(body:any)=>request<any>('/api/wa/messages/reaction',{method:'POST',body:JSON.stringify(body)}),
 read:(body:any)=>request<any>('/api/wa/messages/read',{method:'POST',body:JSON.stringify(body)}),
 del:(body:any)=>request<any>('/api/wa/messages/delete',{method:'POST',body:JSON.stringify(body)}),
 edit:(body:any)=>request<any>('/api/wa/messages/edit',{method:'POST',body:JSON.stringify(body)}),
 presence:(body:any)=>request<any>('/api/wa/messages/presence',{method:'POST',body:JSON.stringify(body)}),
 archive:(body:any)=>request<any>('/api/wa/chats/archive',{method:'POST',body:JSON.stringify(body)}),
 mute:(body:any)=>request<any>('/api/wa/chats/mute',{method:'POST',body:JSON.stringify(body)}),
 chatRead:(body:any)=>request<any>('/api/wa/chats/read',{method:'POST',body:JSON.stringify(body)}),
 chatDelete:(body:any)=>request<any>('/api/wa/chats/delete',{method:'POST',body:JSON.stringify(body)}),
 group:(jid:string)=>request<any>(`/api/wa/groups/${encodeURIComponent(jid)}`), createGroup:(body:any)=>request<any>('/api/wa/groups',{method:'POST',body:JSON.stringify(body)}),
 groupAdd:(jid:string,body:any)=>request<any>(`/api/wa/groups/${encodeURIComponent(jid)}/participants`,{method:'POST',body:JSON.stringify(body)}), groupRemove:(jid:string,body:any)=>request<any>(`/api/wa/groups/${encodeURIComponent(jid)}/participants`,{method:'DELETE',body:JSON.stringify(body)}),
 groupSubject:(jid:string,body:any)=>request<any>(`/api/wa/groups/${encodeURIComponent(jid)}/subject`,{method:'PATCH',body:JSON.stringify(body)}), groupDescription:(jid:string,body:any)=>request<any>(`/api/wa/groups/${encodeURIComponent(jid)}/description`,{method:'PATCH',body:JSON.stringify(body)}), groupInvite:(jid:string)=>request<any>(`/api/wa/groups/${encodeURIComponent(jid)}/invite`), groupLeave:(jid:string)=>request<any>(`/api/wa/groups/${encodeURIComponent(jid)}/leave`,{method:'POST'}),
 privacy:()=>request<any>('/api/wa/privacy'), privacyUpdate:(body:any)=>request<any>('/api/wa/privacy',{method:'PATCH',body:JSON.stringify(body)})
};
export {API};
