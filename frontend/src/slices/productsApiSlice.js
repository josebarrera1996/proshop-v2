// Importamos la constante PRODUCTS_URL desde nuestros valores constantes definidos previamente
import { PRODUCTS_URL } from '../constants';
// Importamos apiSlice, que ya tiene configurado nuestro estado y lógica de API
import { apiSlice } from './apiSlice';

// Extendemos nuestro apiSlice con endpoints adicionales específicos para productos
export const productsApiSlice = apiSlice.injectEndpoints({
    // Define los endpoints utilizando un builder que proporciona métodos para definir queries y mutations
    endpoints: (builder) => ({
        // Define una query llamada getProducts
        getProducts: builder.query({
            // La función query especifica la URL final para obtener los productos
            query: () => ({
                url: PRODUCTS_URL,
            }),
            // Especifica cuánto tiempo (en minutos) los datos no utilizados se mantendrán en el caché
            keepUnusedDataFor: 5,
        }),
        // Define una query llamada getProductDetails
        getProductDetails: builder.query({
            // La función query toma un productId y especifica la URL para obtener los detalles de un producto específico
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            // También mantiene los datos no utilizados en el caché durante 5 minutos
            keepUnusedDataFor: 5,
        }),
    }),
});

// Exporta hooks generados automáticamente para las queries definidas
export const {
    // Hook para la query getProducts, que se utilizará en los componentes para obtener los productos
    useGetProductsQuery,
    // Hook para la query getProductDetails, que se utilizará para obtener detalles de un producto específico
    useGetProductDetailsQuery
} = productsApiSlice;
