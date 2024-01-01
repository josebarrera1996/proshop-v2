// Importamos la función configureStore de Redux Toolkit para configurar el almacenamiento global de estado
import { configureStore } from '@reduxjs/toolkit';
// Importamos apiSlice que contiene nuestras operaciones y configuraciones de la API
import { apiSlice } from './slices/apiSlice';

// Creamos la configuración de nuestra tienda Redux con configureStore
const store = configureStore({
    // Asignamos el reducer de apiSlice al almacenamiento de estado global
    reducer: {
        // La propiedad reducerPath de apiSlice se utiliza como clave,
        // y el reducer correspondiente como valor
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // Añadimos el middleware de apiSlice al conjunto predeterminado de middlewares
    middleware: (getDefaultMiddleware) =>
        // getDefaultMiddleware proporciona middlewares predeterminados que Redux Toolkit recomienda
        getDefaultMiddleware()
            // Añadimos el middleware de apiSlice para habilitar el caching automático,
            // las invalidaciones, y la revalidación de los datos
            .concat(apiSlice.middleware),
    // Habilitamos las herramientas de desarrollo de Redux en entornos de desarrollo
    devTools: true,
});

// Exportamos la tienda configurada para poder ser usada por la aplicación React
export default store;
