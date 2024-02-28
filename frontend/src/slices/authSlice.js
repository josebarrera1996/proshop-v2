import { createSlice } from '@reduxjs/toolkit';

// Estado inicial del slice de autenticación
const initialState = {
    // Obtiene la información del usuario almacenada en el almacenamiento local (si existe)
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
};

// Crea un slice de Redux llamado 'auth'
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Reducer para establecer las credenciales del usuario
        setCredentials: (state, action) => {
            // Actualiza la información del usuario en el estado
            state.userInfo = action.payload;

            // Almacena la información del usuario en el almacenamiento local
            localStorage.setItem('userInfo', JSON.stringify(action.payload));

            // Definiendo la constante que tendrá el tiempo de expiración
            const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000 // 1 día en milisegundos

            // Almacena el tiempo de expiración en el almacenamiento local
            localStorage.setItem('expirationTime', expirationTime);
        },
        // Reducer para cerrar sesión y eliminar las credenciales del usuario
        logout: (state, action) => {
            // Establece la información del usuario en null
            state.userInfo = null;

            // Eliminando la información del usuario & el tiempo de expiración del almacenamiento local
            localStorage.removeItem('userInfo');
            localStorage.removeItem('expirationTime');
        },
    },
});

// Exporta las acciones (setCredentials, logout) y el reducer del slice
export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
