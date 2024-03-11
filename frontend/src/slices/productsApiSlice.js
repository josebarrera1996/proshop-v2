// Importamos la constante PRODUCTS_URL desde nuestros valores constantes definidos previamente
import { PRODUCTS_URL, UPLOADS_URL } from '../constants';
// Importamos apiSlice, que ya tiene configurado nuestro estado y lógica de API
import { apiSlice } from './apiSlice';

// Extendemos nuestro apiSlice con endpoints adicionales específicos para productos
export const productsApiSlice = apiSlice.injectEndpoints({
    // Define los endpoints utilizando un builder que proporciona métodos para definir queries y mutations
    endpoints: (builder) => ({
        // Define el endpoint 'getProducts' para obtener los productos
        getProducts: builder.query({
            // La función query especifica la URL final para obtener los productos
            query: () => ({
                url: PRODUCTS_URL,
            }),
            // Etiquetas proporcionadas para la invalidación del caché
            providesTags: ['Products'],
            // Especifica cuánto tiempo (en minutos) los datos no utilizados se mantendrán en el caché
            keepUnusedDataFor: 5,
        }),
        // Define el endpoint 'getProductDetails' para obtener los detalles de un producto (por su ID)
        getProductDetails: builder.query({
            // La función query toma un productId y especifica la URL para obtener los detalles de un producto específico
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            // También mantiene los datos no utilizados en el caché durante 5 minutos
            keepUnusedDataFor: 5,
        }),
        // Define un endpoint 'createProduct' para poder crear un nuevo producto
        createProduct: builder.mutation({
            // Define la consulta (query) para el punto final
            query: () => ({
                // Configuración de la solicitud: URL, método y cuerpo de la solicitud
                url: `${PRODUCTS_URL}`,
                method: 'POST',
            }),
            // Etiqueta usada para la invalidación del caché después de la creación exitosa de un nuevo producto
            invalidatesTags: ['Product'],
        }),
        // Define un 'endpoint' para poder actualizar un producto existente
        updateProduct: builder.mutation({
            // Define la consulta (query) para el punto final
            query: (data) => ({
                // Configuración de la solicitud: URL, método y cuerpo de la solicitud
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            // Etiqueta usada para la invalidación del caché después de la actualización exitosa de un producto
            invalidatesTags: ['Products'],
        }),
        // Define un 'endpoint' para poder subir la imagen de un producto
        uploadProductImage: builder.mutation({
            // Define la consulta (query) para el punto final
            query: (data) => ({
                // Configuración de la solicitud: URL, método y cuerpo de la solicitud
                url: `${UPLOADS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        // Define un 'endpoint' para poder eliminar un producto
        deleteProduct: builder.mutation({
            // Define la consulta (query) para el punto final
            query: (productId) => ({
                // Configuración de la solicitud: URL y método
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
            // Etiqueta usada para la invalidación del caché después de la eliminación exitosa de un producto
            providesTags: ['Product'],
        }),
        // Define un 'endpoint' para poder dejar una 'review'
        createReview: builder.mutation({
            // Define la consulta (query) para el punto final
            query: (data) => ({
                // Configuración de la solicitud: URL, método y cuerpo de la solicitud
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            // Especifica las etiquetas de caché que deben invalidarse después de realizar esta mutación
            invalidatesTags: ['Product'],
        }),
    }),
});

// Exporta hooks generados automáticamente para las queries definidas
export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation
} = productsApiSlice;
