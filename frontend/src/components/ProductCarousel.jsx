import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
    // Realiza una consulta para obtener los productos mejor valorados
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    return (
        // Si los datos están cargando, muestra un componente de carga
        isLoading ? (
            <Loader />
        ) :
            // Si hay un error en la consulta, muestra un mensaje de error
            error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                // Si no hay errores ni datos cargando, muestra el carrusel de productos
                <Carousel pause='hover' className='bg-primary mb-4'>
                    {/* Mapea los productos obtenidos para mostrar cada uno en un carrusel */}
                    {products.map((product) => (
                        <Carousel.Item key={product._id}>
                            {/* Cada producto es un elemento del carrusel, vinculado a su página de detalles */}
                            <Link to={`/product/${product._id}`}>
                                {/* Muestra la imagen del producto con su nombre y precio */}
                                <Image src={product.image} alt={product.name} fluid />
                                <Carousel.Caption className='carousel-caption'>
                                    <h2 className='text-white text-right'>
                                        {product.name} (${product.price})
                                    </h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )
    );
};

export default ProductCarousel;
