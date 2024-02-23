import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Componente funcional que define una ruta protegida para administradores
const AdminRoute = () => {
    // Obtener la información del usuario desde el estado global utilizando 'useSelector'
    const { userInfo } = useSelector((state) => state.auth);

    // Verificar si hay información de usuario y si el usuario es un administrador
    return userInfo && userInfo.isAdmin ? (
        // Si es un administrador, renderizar el contenido de la ruta anidada utilizando 'Outlet'
        <Outlet />
    ) : (
        // Si no es un administrador, redirigir a la página de inicio de sesión usando 'Navigate'
        <Navigate to='/login' replace />
    );
};

export default AdminRoute;