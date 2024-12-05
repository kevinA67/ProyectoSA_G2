import Tablero from '../pages/game/Tablero';
import Login from '../pages/authentication/login';
import SingUp from '../pages/authentication/SingUp';
import Home from '../pages/home/home';

export const Routingdata = [
  //Pages
  { path: `/`, element: <Login/> },
  { path: `/home`, element: <Home /> },
  { path: `/tictactue`, element: <Tablero /> },
  { path: `/singup`, element: <SingUp /> },
];