import { useState } from "react";

const Tablero = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="grid grid-cols-3 gap-4 m-4 items-center h-full">
      <div className="bg-Brown p-4 col-span-2 grid grid-cols-2 grid-rows-[auto,1fr,auto] gap-5 h-full">
        <div className="text-xl text-white font-bold flex">
          <img className="h-8" src="usuario.png" alt="" />
          <h2 className="px-2">Nombre Uno</h2>
          <img src="o.png" alt="" className="h-8" />
        </div>
        <div className="text-2xl text-white font-bold text-right">1/4</div>

        {/* Tablero */}
        <div className="col-span-2 grid grid-cols-[1fr,0.5fr] gap-4 h-full">
          <div className="bg-white grid grid-cols-3 grid-rows-3 gap-3">
            <div className="bg-[url('/o.png')] bg-no-repeat bg-center bg-contain bg-dark-blue w-auto h-auto"></div>
            <div className="bg-[url('/x.png')] bg-no-repeat bg-center bg-contain bg-dark-blue w-auto h-auto"></div>
            <div className="bg-dark-blue w-auto h-auto"></div>
            <div className="bg-dark-blue w-auto h-auto"></div>
            <div className="bg-dark-blue w-auto h-auto"></div>
            <div className="bg-dark-blue w-auto h-auto"></div>
            <div className="bg-dark-blue w-auto h-auto"></div>
            <div className="bg-dark-blue w-auto h-auto"></div>
            <div className="bg-dark-blue w-auto h-auto"></div>
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
          <h2 className="px-2">Nombre Dos</h2>
          <img src="usuario.png" alt="" className="h-8" />
        </div>
      </div>

      {/* Chat */}
      <div className="bg-Brown bg-opacity-85 h-full grid grid-rows-[auto,1fr,auto]">
        <div className="bg-Brown-Titulo h-16 text-white font-bold text-xl flex items-center pl-7 ">
          Deafmute
        </div>
        <div>chat</div>
        <div className="bg-white h-16 flex items-center justify-between px-5">
          <input type="text" />
          <img className="justify-end" src="/enviar.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Tablero;
