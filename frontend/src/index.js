import React from 'react';
import ReactDOM from 'react-dom/client'; 
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider, 
} from 'react-router-dom'; 
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

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
    {/* Implementando Redux en toda la app */}
    <Provider store={store}>
    {/* Proporcionamos el enrutador a la aplicación: */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// Reportamos métricas de rendimiento (opcional):
reportWebVitals();
