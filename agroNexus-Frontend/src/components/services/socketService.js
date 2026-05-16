import { io } from "socket.io-client";



const socket = io("https://agronexus-bi3q.onrender.com", {
  transports: ["websocket"],
  autoConnect: true
});

export default socket;


