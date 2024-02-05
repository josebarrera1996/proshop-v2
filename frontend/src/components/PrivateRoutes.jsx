import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Componente con la lógica para hacer 'privadas' rutas
const PrivateRoutes = () => {
    // Obtiene la información del usuario desde el estado global de Redux
    const { userInfo } = useSelector((state) => state.auth);

    // Retorna el componente Outlet (contenido de las rutas anidadas) si hay información del usuario,
    // de lo contrario, redirige a la página de inicio de sesión ('/login') utilizando Navigate
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

// Exporta el componente PrivateRoute para su uso en la configuración de rutas
export default PrivateRoutes;
