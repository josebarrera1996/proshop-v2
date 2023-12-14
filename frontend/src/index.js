import React from 'react'; // Biblioteca fundamental de React
import ReactDOM from 'react-dom/client'; // Para renderizar React en el DOM
import {
  createBrowserRouter, // Crea un enrutador de rutas
  createRoutesFromElements, // Crea rutas a partir de elementos React
  Route, // Define una ruta con un componente asociado
  RouterProvider, // Proporciona el enrutador al resto de la aplicación
} from 'react-router-dom'; // Librería para manejo de rutas en React
import reportWebVitals from './reportWebVitals';

// Importamos archivos de estilos:
import './assets/styles/bootstrap.custom.css'; // Estilos personalizados de Bootstrap
import './assets/styles/index.css'; // Estilos base de la aplicación

// Importamos el componente principal y la pantalla de inicio:
import App from './App'; // Componente principal de la aplicación
import HomeScreen from './screens/HomeScreen'; // Pantalla inicial de la aplicación
import ProductScreen from './screens/ProductScreen'; // Pantalla de los detalles del producto

// Creamos un enrutador con rutas a partir de elementos React:
const router = createBrowserRouter(
  createRoutesFromElements(
    // Ruta raíz "/", renderiza el componente App:
    <Route path="/" element={<App />}>
      {/* Ruta anidada para "/", renderiza la pantalla de inicio: */}
      <Route index={true} path="/" element={<HomeScreen />} />
      {/* Ruta para poder acceder a los detalles del producto */}
      <Route path='/product/:id' element={<ProductScreen />} />
    </Route>
  )
);

// Creamos un nodo raíz para renderizar la aplicación:
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizamos la aplicación en modo estricto (para detectar errores):
root.render(
  <React.StrictMode>
    {/* Proporcionamos el enrutador a la aplicación: */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Reportamos métricas de rendimiento (opcional):
reportWebVitals();
