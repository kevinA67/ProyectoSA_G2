import Tablero from "./components/Tablero"
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  
  return (
    <>
      <div className="bg-[url('/image.png')] bg-cover bg-center h-screen flex flex-col">
      <div className="bg-black bg-opacity-75 h-auto flex items-center">
        <div className="bg-[url('/tic.png')] bg-cover bg-center h-8 my-4 w-28"/>
        <div className="bg-[url('/tac.png')] bg-cover bg-center h-8 my-4 w-28"/>
        <div className="bg-[url('/toe.png')] bg-cover bg-center h-8 my-4 w-28"/>
      </div>
      <Tablero 
      socket={socket}
      />

      </div>
    </>
  )
}

export default App
