import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
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
/* Rutas privadas (solo para usuarios logeados) */
import PrivateRoutes from './components/PrivateRoutes'; // Lógica para rutas privadas
import ShippingScreen from './screens/ShippingScreen'; // Pantalla para poder anotar la dirección de envio del pedido
import PaymentScreen from './screens/PaymentScreen'; // Pantalla para poder seleccionar el método de pago
import PlaceOrderScreen from './screens/PlaceOrderScreen'; // Pantalla para poder concretar el pedido
import OrderScreen from './screens/OrderScreen'; // Pantalla para poder ver el/los pedido/s 
import ProfileScreen from './screens/ProfileScreen'; // Pantalla para poder ver los datos del usuario (y hasta actualizarlos)
/* Rutas privadas (solo para usuarios logeados) y con acceso solo para los admins */
import AdminRoute from './components/AdminRoute';
import OrderListScreen from './screens/admin/OrderListScreen'; // Pantalla para poder ver los pedidos
import ProductListScreen from './screens/admin/ProductListScreen'; // Pantalla para poder ver los productos
import ProductEditScreen from './screens/admin/ProductEditScreen'; // Pantalla para poder actualizar un producto
import UserListScreen from './screens/admin/UserListScreen'; // Pantalla para poder ver los usuarios
import UserEditScreen from './screens/admin/UserEditScreen'; // Pantalla para poder ver actualizar un usuario

// Creamos un enrutador con rutas a partir de elementos React:
const router = createBrowserRouter(
  createRoutesFromElements(
    // Ruta raíz "/", renderiza el componente App:
    <Route path="/" element={<App />}>
      {/* Ruta anidada para "/", renderiza la pantalla de inicio: */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
      {/* Ruta para poder acceder a los detalles del producto */}
      <Route path='/product/:id' element={<ProductScreen />} />
      {/* Ruta para poder acceder a los detalles del carrito */}
      <Route path='/cart' element={<CartScreen />} />
      {/* Ruta para poder acceder a el formulario del login */}
      <Route path='/login' element={<LoginScreen />} />
      {/* Ruta para poder acceder a el formulario del registro */}
      <Route path='/register' element={<RegisterScreen />} />
      {/* Rutas privadas (para usuarios logeados) */}
      <Route path='' element={<PrivateRoutes />}>
        {/* Rutas con los pasos para poder realizar el 'Checkout' */}
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        {/* Ruta para poder ver los pedidos (por ID) */}
        <Route path='/order/:id' element={<OrderScreen />} />
        {/* Ruta para poder ver los datos del usuario y actualizarlos */}
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      {/* Rutas privadas (para usuarios logeados y que sean 'admin') */}
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

// Creamos un nodo raíz para renderizar la aplicación:
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizamos la aplicación en modo estricto (para detectar errores):
root.render(
  <React.StrictMode>
    {/* Implementando Helmet en toda la app */}
    <HelmetProvider>
      {/* Implementando Redux en toda la app */}
      <Provider store={store}>
        {/* Implementando el proveedor de PayPal */}
        <PayPalScriptProvider deferLoading={true}>
          {/* Proporcionamos el enrutador a la aplicación: */}
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// Reportamos métricas de rendimiento (opcional):
reportWebVitals();
