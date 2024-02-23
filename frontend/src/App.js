import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap'; // El contenedor con estilo de Bootstrap
import { Outlet } from 'react-router-dom'; // El lugar donde se renderizará el contenido de las rutas
import Header from "./components/Header";
import Footer from "./components/Footer";
import { logout } from './slices/authSlice';

// Implementando el contenedor para las alertas
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Definimos el componente principal de la aplicación como una función
const App = () => {
  // Hook para realizar el dispatch de acciones
  const dispatch = useDispatch();

  useEffect(() => {
    // Obtener la 'expirationTime' del almacenamiento local
    const expirationTime = localStorage.getItem('expirationTime');

    // Verificar si 'expirationTime' está presente
    if (expirationTime) {
      // Obtener el tiempo actual en milisegundos
      const currentTime = new Date().getTime();

      // Verificar si el tiempo actual es mayor que 'expirationTime' (indicando que ha expirado)
      if (currentTime > expirationTime) {
        // Si ha expirado, despachar la acción 'logout' para cerrar la sesión
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <>
      {/* Contenedor de las alertas 'Toast' */}
      <ToastContainer />
      {/* Renderizamos el componente del encabezado */}
      <Header />

      {/* Creamos un elemento principal con padding arriba y abajo para el contenido */}
      <main className="py-3">
        {/* Usamos un contenedor de Bootstrap para darle estilo al contenido */}
        <Container>
          {/* Aquí se renderizará el contenido dinámico de las rutas.
             Outlet es un placeholder donde se inserta el contenido de las rutas definidas
             en react-router-dom. */}
          <Outlet />
        </Container>
      </main>

      {/* Renderizamos el componente del pie de página */}
      <Footer />
    </>
  );
};

// Exportamos el componente App para que pueda ser utilizado en otros lugares de la aplicación
export default App;
