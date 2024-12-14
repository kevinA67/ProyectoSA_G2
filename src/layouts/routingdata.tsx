import Tablero from '../pages/game/Tablero';
import Login from '../pages/authentication/Login';
import SingUp from '../pages/authentication/SingUp';
import Home from '../pages/game/Home';

export const Routingdata = [
  //Pages
  { path: `/`, element: <Login/> },
  { path: `/home`, element: <Home /> },
  { path: `/tictactue`, element: <Tablero /*socket={socket}*/ /> },
  { path: `/singup`, element: <SingUp /> },

];