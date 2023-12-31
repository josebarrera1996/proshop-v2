import { Container } from 'react-bootstrap'; // El contenedor con estilo de Bootstrap
import { Outlet } from 'react-router-dom'; // El lugar donde se renderizará el contenido de las rutas
import Header from "./components/Header"; // El componente del encabezado de la aplicación
import Footer from "./components/Footer"; // El componente del pie de página de la aplicación

// Definimos el componente principal de la aplicación como una función
const App = () => {
  // El componente devolverá un fragmento de código JSX.
  return (
    <>
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
