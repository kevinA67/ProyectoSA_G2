import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showChallengeAlert, setShowChallengeAlert] = useState(false);
  const [challengingUser, setChallengingUser] = useState<string | null>(null);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [showFinalAlert, setShowFinalAlert] = useState<'accept' | 'reject' | null>(null); 
  const navigate = useNavigate();

  const handleChallengeClick = (userName: string) => {
    setChallengingUser(userName);
    setShowChallengeAlert(true);
  };

  const handleAcceptChallenge = () => {
    setShowChallengeAlert(false);
    setWaitingForResponse(true);

    // SIlular que esperamos a otro jugador
    setTimeout(() => {
      setWaitingForResponse(false);
      setShowFinalAlert('accept'); //alerta de aceptación
      setTimeout(() => {
        navigate('/tictactue'); // Redirigir
      }, 3000);
    }, 3000);
  };

  const handleRejectChallenge = () => {
    setShowChallengeAlert(false);
    setShowFinalAlert('reject'); //alerta de rechazo
  };

  //  de amigos
  const friends = [
    { name: 'Usuario1', victories: 20 },
    { name: 'Usuario2', victories: 15 },
    { name: 'Usuario3', victories: 30 },
  ];

  return (
    <div className="h-screen bg-bgDefault text-white p-6 flex flex-col items-center">
      {/* Caja de estadísticas */}
      <div className="bg-black bg-opacity-80 text-white p-6 rounded-lg shadow-lg w-full max-w-4xl mb-8">
        <h1 className="text-2xl font-bold text-center mb-4">Estadísticas del Jugador</h1>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-semibold">Partidas Jugadas:</p>
            <p>100</p>
          </div>
          <div>
            <p className="font-semibold text-red-600">Perdidas:</p>
            <p>30</p>
          </div>
          <div>
            <p className="font-semibold">Empates:</p>
            <p>20</p>
          </div>
          <div>
            <p className="font-semibold text-green-500">Victorias:</p>
            <p>50</p>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500">
            Encontrar Oponentes
          </button>
          <button className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600">
            Más Estadísticas
          </button>
        </div>
      </div>

      {/* Caja de amigos */}
      <div className="bg-black bg-opacity-80 text-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Amigos</h2>
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
              <i className="fas fa-search"></i>
            </button>
            <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>

        <input
          type="text"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md focus:outline-none"
          placeholder="Buscar amigos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <div key={friend.name} className="bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center relative">
                <img src="https://via.placeholder.com/40" alt="perfil" className="rounded-full border-2 border-white" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                <div className="ml-2">
                  <p className="font-semibold text-white">{friend.name}</p>
                  <p className="text-sm text-green-400">Victorias: {friend.victories}</p>
                </div>
              </div>
              <button
                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-lg"
                onClick={() => handleChallengeClick(friend.name)} // Enviar nombre del amigo
              >
                Desafiar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Alerta del desafío (modal) */}
      {showChallengeAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg w-96">
            <p className="font-semibold text-lg">
              ¿Estás seguro de que deseas desafiar a {challengingUser}?
            </p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
                onClick={handleAcceptChallenge}
              >
                Aceptar
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={handleRejectChallenge}
              >
                Rechazar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alerta de aceptación o rechazo */}
      {showFinalAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg w-96">
            <p className="font-semibold text-lg">
              {showFinalAlert === 'accept'
                ? {challengingUser} + "ha aceptado el desafío."
                : {challengingUser} + "ha rechazado el desafío."}
            </p>
            {/* Solo aparece un botón después de la alerta */}
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setShowFinalAlert(null)} // Cierra la alerta
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Esperando respuesta */}
      {waitingForResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg w-96">
            <p className="font-semibold text-lg">Esperando respuesta de {challengingUser}...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;