import { io, Socket } from "socket.io-client";
//local
// const socket: Socket = io("http://localhost:8000", {
//   transports: ["websocket"],
// });
//replit
const socket: Socket = io("https://da92df21-3a0a-4d9b-a7fb-47550e4c282f-00-3q7tqjx3vn1pz.pike.replit.dev", {
  transports: ["websocket"],
});

export default socket;
