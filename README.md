# Baileys Control Center — Frontend

A Vite + React frontend designed specifically for the Express/Baileys/Supabase backend contract.

## Features

- QR pairing + session status/logout
- Bearer-token support without exposing Supabase service-role credentials
- Socket.IO live event inspector
- Chat list and real-time chat updates
- Text messaging
- Generic media/location/contact/poll/reaction/read/delete/edit message testing
- Chat archive/mute/read/delete
- Group create/get/participant/subject/description/invite/leave tools
- Privacy GET/PATCH
- Presence testing
- History-sync listener validation
- Raw REST request console

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

Default backend:

```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

If the backend has `REQUIRE_SUPABASE_AUTH=true`, paste a Supabase access token into **Session → API authentication**. Never put `SUPABASE_SERVICE_ROLE_KEY` into the frontend.

## Backend compatibility

The UI targets the routes documented by the backend:

- `/api/wa/connect`
- `/api/wa/status`
- `/api/wa/qr`
- `/api/wa/logout`
- `/api/wa/messages/*`
- `/api/wa/chats/*`
- `/api/wa/groups/*`
- `/api/wa/privacy`

Socket listeners include `whatsapp.connection`, `whatsapp.qr`, `whatsapp.messages.*`, `whatsapp.chats.*`, `whatsapp.contacts.*`, `whatsapp.groups.*`, `whatsapp.presence.update`, and `whatsapp.history`.
