import { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import '../../estilo.css'; //Cambiar dependiendo de la ubicacion del archivo css
import socket from '../../utils/socket';
import { IResEstatistics } from '../../interfaces/IResponse';
import { IStatistics } from '../../interfaces/IStatistics';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

type TUsuario = {
  id: number;
  name: string;
  nickname: string;
  status: number;
  victories: number;
};

const playerData = {
  matches: 50,
  victories: 30,
  defeats: 15,
};

const ties = playerData.matches - playerData.victories - playerData.defeats;

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [usuarios, setUsuarios] = useState<TUsuario[]>([]);
  const [totals, setTotals] = useState<IStatistics>();

  useEffect(() => {
    socket.emit("get_usuarios");

    socket.on("getUsuarios", (response) => {
      setUsuarios(response.data);
    });

    socket.emit("getStatistics", localStorage.getItem("user"));
    socket.on("statisticsResponse", (data: IResEstatistics) => {
      if (data.success) {
        setTotals(data.data);
      }
    });

    return () => {
      socket.off("getUsuarios");
      socket.off("statisticsResponse");
    };
  }, []);

  // Ensure totals are loaded before using them
  const victories = totals?.victories || 0;
  const defeats = totals?.defeats || 0;
  const matches = totals?.matches || 0;
  const ties = matches - victories - defeats;

  // Bar Chart Data
  const barData = {
    labels: ['Victorias', 'Derrotas', 'Empates'],
    datasets: [
      {
        label: 'Resultados',
        data: [victories, defeats, matches],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
      },
    ],
  };

  // Pie Chart Data
  const pieData = {
    labels: ['Victorias', 'Derrotas', 'Empates'],
    datasets: [
      {
        data: [victories, defeats, matches],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
      },
    ],
  };

  return (
    <div className="h-screen bg-bgDefault text-white p-6 flex flex-col">
      {/* Contenedor principal */}
      <div className="flex flex-grow gap-6">
        {/* Estadísticas del Jugador en 2/3 */}
        <div className="flex-grow-0 flex-shrink-0 bg-black bg-opacity-80 text-white p-6 rounded-lg shadow-lg w-2/3">
          <h1 className="text-2xl font-bold text-center mb-4">Estadísticas del Jugador</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-semibold">Partidas Jugadas:</p>
              <p>{totals?.score}</p>
            </div>
            <div>
              <p className="font-semibold text-red-600">Perdidas:</p>
              <p>{totals?.defeats}</p>
            </div>
            <div>
              <p className="font-semibold">Empates:</p>
              <p>{totals?.matches}</p>
            </div>
            <div>
              <p className="font-semibold text-green-500">Victorias:</p>
              <p>{totals?.victories}</p>
            </div>
          </div>

          <div className="player-statistics">
            <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Estadísticas del Jugador</h1>

            <div className="charts-grid">
              <div className="chart-container">
                <h2>Comparación de Resultados</h2>
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
              <div className="chart-container">
                <h2>Distribución de Resultados</h2>
                <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>

        </div>

        {/* Caja de amigos en 1/3 */}
        <div className="flex-grow-0 flex-shrink-0 bg-black bg-opacity-80 text-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-bold mb-4">Amigos</h2>
          <input
            type="text"
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md focus:outline-none"
            placeholder="Buscar amigos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex flex-col gap-4">
            {usuarios
              .filter((x) => x.nickname !== localStorage.getItem("user"))
              .map((user) => (
                <div key={user.id} className="bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="perfil"
                        className="rounded-full border-2 border-white"
                      />
                      <div className="ml-2">
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="text-sm text-green-400">Victorias: {user.victories}</p>
                      </div>
                    </div>
                    <button
                      className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      onClick={() => socket.emit("challengeUser", user.id)}
                    >
                      Desafiar
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
