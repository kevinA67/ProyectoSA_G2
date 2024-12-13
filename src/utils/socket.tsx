import { io } from "socket.io-client";

// const socket = io("http://104.198.227.111:5020");
const socket = io("http://localhost:5000");

export default socket;