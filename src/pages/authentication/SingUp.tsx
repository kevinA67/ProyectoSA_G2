import { useNavigate } from "react-router-dom";
function SingUp() {

    const navigate = useNavigate();

    const handleSubmit = (e:any) => {
      e.preventDefault();
      navigate("/tictactue");
    };

    return (
      <div className="h-screen  flex items-center justify-center">
        <div className="bg-black bg-opacity-80 text-white shadow-lg rounded-lg p-8 w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Únete y Juega<br />con tus amigos</h1>
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Correo"
                className="w-full px-4 py-2 bg-gray-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Usuario"
                className="w-full px-4 py-2 bg-gray-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-4 py-2 bg-gray-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                className="w-full px-4 py-2 bg-gray-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold py-2 rounded-lg hover:from-blue-600 hover:to-pink-600"
              onClick={handleSubmit}
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    )
  }
  export default SingUp
  