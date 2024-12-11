import Tablero from '../pages/game/Tablero';
import Login from '../pages/authentication/Login';
import SingUp from '../pages/authentication/SingUp';
import Home from '../pages/home/Home';
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");
// socket.on('connect', () => {
//   const nombreUsuario = 'Kevin';  
//   socket.emit('registrarUsuario', nombreUsuario);
// });

export const Routingdata = [
  //Pages
  { path: `/`, element: <Login/> },
  { path: `/home`, element: <Home /> },
  { path: `/tictactue`, element: <Tablero /*socket={socket}*/ /> },
  { path: `/singup`, element: <SingUp /> },
];