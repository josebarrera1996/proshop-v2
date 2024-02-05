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
import CartScreen from './screens/CartScreen'; // Pantalla de los detalles de los productos del carrito
import LoginScreen from './screens/LoginScreen'; // Pantalla de login
import RegisterScreen from './screens/RegisterScreen'; // Pantalla para registrarse
import ShippingScreen from './screens/ShippingScreen'; // Pantalla para poder realizar el checkout

// Creamos un enrutador con rutas a partir de elementos React:
const router = createBrowserRouter(
  createRoutesFromElements(
    // Ruta raíz "/", renderiza el componente App:
    <Route path="/" element={<App />}>
      {/* Ruta anidada para "/", renderiza la pantalla de inicio: */}
      <Route index={true} path="/" element={<HomeScreen />} />
      {/* Ruta para poder acceder a los detalles del producto */}
      <Route path='/product/:id' element={<ProductScreen />} />
      {/* Ruta para poder acceder a los detalles del carrito */}
      <Route path='/cart' element={<CartScreen />} />
      {/* Ruta para poder acceder a el formulario del login */}
      <Route path='/login' element={<LoginScreen />} />
      {/* Ruta para poder acceder a el formulario del registro */}
      <Route path='/register' element={<RegisterScreen />} />
      {/* Ruta para poder acceder a el formulario del checkout */}
      <Route path='/shipping' element={<ShippingScreen />} />
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
