// Importamos la función configureStore de Redux Toolkit para configurar el almacenamiento global de estado
import { configureStore } from '@reduxjs/toolkit';
// Importamos apiSlice que contiene nuestras operaciones y configuraciones de la API
import { apiSlice } from './slices/apiSlice';
// Importamos cartSlice que contiene las operaciones para trabajar con el carrito
import cartSliceReducer from './slices/cartSlice';

// Creamos la configuración de nuestra tienda Redux con configureStore
const store = configureStore({
    // Asignaciones de los reducers de los slices
    reducer: {
        // Asignamos el reducer de apiSlice al almacenamiento de estado global
        // La propiedad reducerPath de apiSlice se utiliza como clave,
        // y el reducer correspondiente como valor
        [apiSlice.reducerPath]: apiSlice.reducer,
        // Asignamos el reducer de cartSlice al almacenamiento de estado global
        cart: cartSliceReducer,
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
