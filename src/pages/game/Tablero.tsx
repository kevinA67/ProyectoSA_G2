import { useEffect, useMemo, useState } from "react";
// import { Socket } from "socket.io-client";
// import { DefaultEventsMap } from "@socket.io/component-emitter";
import socket from "../../utils/socket";

type TMensaje = {
  body: string;
  from: string;
};

/*type appProps = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};*/

const Tablero = (/*{ socket }: appProps*/) => {
  const [isOn, setIsOn] = useState(false);
  const [tablero, setTablero] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [mensajes, setMensajes] = useState<TMensaje[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [enviar, setEnviar] = useState(false);
  const [bloqueo, setBloqueo] = useState(true);

  useEffect(() => {
    socket.on("tableroCliente", (response) => {
      const { data, turno } = response;
      console.log('data',data)
      setEnviar(false);
      setTablero(data);
      setBloqueo(true);
      setIsXTurn(!turno);
    });

    socket.on("mensajeCliente", (data: string) => {
      console.log("cliente", data);
      const newMessaje = {
        body: data,
        from: "",
      };
      setMensajes((state) => [...state, newMessaje]);
    });

    return () => {
      socket.off("tableroCliente");
      socket.off("mensajeCliente");
    };
  }, []);

  useEffect(() => {
    if (enviar) {
      socket.emit("tableroServidor",  { tablero, isXTurn });
      setBloqueo(!bloqueo);
    }
  }, [tablero]);

  const handleCellClick = (index: number) => {
    if (tablero[index] !== "") return;
    console.log('sd',tablero[index])
    const newTablero = [...tablero];
    newTablero[index] = isXTurn ? "x" : "o"; // Asigna "x" o "o" según el turno
    setTablero(newTablero);
    setIsOn(!isOn);
    setEnviar(true);
  };

  const validarGanador = useMemo(() => {
    const combinacionesGanadoras = [
      // Filas
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columnas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonales
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combinacion of combinacionesGanadoras) {
      const [a, b, c] = combinacion;
      if (
        tablero[a] !== "" && 
        tablero[a] === tablero[b] &&
        tablero[a] === tablero[c]
      ) {
        console.log("Ganador:", tablero[a]);
        return tablero[a];
      }
    }
  }, [tablero]);

  //console.log(validarGanador);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const enviarMensaje = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (mensaje !== "") {
      const newMessaje = {
        body: mensaje,
        from: "Me",
      };
      setMensajes([...mensajes, newMessaje]);
      socket.emit("mensaje", newMessaje.body);
      setMensaje("");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 m-4 items-center h-full">
      <div className="bg-Brown p-4 col-span-2 grid grid-cols-2 grid-rows-[auto,1fr,auto] gap-5 h-full">
        <div className="text-xl text-white font-bold flex">
          <img className="h-8" src="usuario.png" alt="" />
          <h2 className="px-2">{localStorage.getItem("userContrincante")}</h2>
          <img src="o.png" alt="" className="h-8" />
        </div>
        <div className="text-2xl text-white font-bold text-right">1/4</div>

        {/* Tablero */}
        <div className="col-span-2 grid grid-cols-[1fr,0.5fr] gap-4 h-full">
          <div className="bg-white grid grid-cols-3 grid-rows-3 gap-3">
            {tablero.map((cell, index) => (
              <div
                key={index}
                onClick={() => (bloqueo ? handleCellClick(index) : null)}
                className={`bg-no-repeat bg-center bg-contain bg-dark-blue w-auto h-auto 
                ${cell === "x" ? "bg-[url('/x.png')]" : ""} 
                ${cell === "o" ? "bg-[url('/o.png')]" : ""}`}
              ></div>
            ))}
          </div>
          {/* Switch */}
          <div className="flex items-center justify-center">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="hidden peer"
                checked={isOn}
                onChange={toggleSwitch}
              />

              <div className="relative">
                <div className="w-24 h-44 bg-Yellow-Switch-2 rounded-full"></div>

                <div
                  className={`flex justify-center items-center text-Brown font-bold shadow-xl 
                    absolute top-0 left-0 w-24 h-20 bg-Yellow-Switch rounded-full transform transition-transform duration-300 ${
                      isOn ? "translate-y-24" : "bg-yellow-400"
                    }`}
                >
                  {isOn ? "Tu turno" : "Su turno"}
                </div>
              </div>
            </label>
          </div>
        </div>
        <div className="text-2xl text-white font-bold flex items-end">1/4</div>
        <div className="text-xl text-white font-bold text-right flex justify-end items-end">
          <img src="x.png" alt="" className="h-8" />
          <h2 className="px-2">{localStorage.getItem("user")}</h2>
          <img src="usuario.png" alt="" className="h-8" />
        </div>
      </div>

      {/* Chat */}
      <div className="bg-Brown bg-opacity-85 h-full grid grid-rows-[auto,1fr,auto]">
        <div className="bg-Brown-Titulo h-16 text-white font-bold text-xl flex items-center pl-7">
        {localStorage.getItem("userContrincante")}
        </div>
        <div className="overflow-y-auto h-[calc(100vh-15rem)]">
          <ul>
            {mensajes.map((mensaje, index) => (
              <li
                key={index}
                className={`p-2 px-4 m-5 rounded text-white text-xl table ${
                  mensaje.from === "Me"
                    ? "bg-Rose-Send ml-auto"
                    : "bg-Rose-Recive mr-auto"
                }`}
              >
                {mensaje.body}
              </li>
            ))}
          </ul>
        </div>
        <form>
          <div className="bg-white h-16 flex items-center justify-between px-5">
            <input
              type="text"
              onChange={(e) => setMensaje(e.target.value)}
              className="h-4/6 w-full mx-2 my-2 text-xl p-2"
              value={mensaje}
            />
            <button type="submit" onClick={enviarMensaje}>
              <img
                src="/enviar.png"
                alt="Imagen del botón"
                className="w-6 h-6"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tablero;
