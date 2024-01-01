// Importamos funciones del Redux Toolkit Query para crear una API
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
// Importamos constantes que usaremos para configurar nuestros endpoints
import { BASE_URL } from '../constants';

// Configuramos una baseQuery usando fetchBaseQuery con la URL base de nuestra API
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Creamos una 'slice' de API usando createApi, proporcionando la configuración necesaria
export const apiSlice = createApi({
    baseQuery, // La baseQuery configurada anteriormente
    tagTypes: ['Product', 'Order', 'User'], // Tags para invalidar caché y manejar actualizaciones automáticas
    endpoints: (builder) => ({}), // Definición de endpoints se hará aquí
    // builder es un argumento que se usa para construir los endpoints individualmente
});