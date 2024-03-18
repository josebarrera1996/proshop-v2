import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

// Componente funcional HomeScreen
const HomeScreen = () => {
    // Obtenemos el número de página
    const { pageNumber, keyword } = useParams();

    // Utilizamos el hook para obtener todos los productos, estado de carga y errores
    // de nuestra API de productos
    const { data, isLoading, error } = useGetProductsQuery({ pageNumber, keyword });

    // Renderización del componente
    return (
        // Utilizamos fragmentos para agrupar múltiples elementos
        <>
            {/* Mostrar el carousel de productos (siempre y cuando no háyamos realizado ninguna búsqueda) */}
            {!keyword ? (
                <ProductCarousel />
            ) : (
                // Si hemos realizado una búsqueda, brindar la posibilidad de volver hacia atrás 
                <Link to='/' className='btn btn-light'>
                    Go Back
                </Link>
            )}
            {/* Mostramos el Spinner 'Loader' si los datos aún están cargándose */}
            {isLoading ? (
                <Loader />
            ) : error ? ( // Si hay un error, lo mostramos
                // Se verifica primero si hay un mensaje de error en los datos, de lo contrario se muestra error.error
                // La forma en la que se mostrará todo esto es a través de la alert definida en 'Message'
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                // Renderización de los productos si no hay errores y no se están cargando
                <>
                    <Meta />
                    <h1>Latest Products</h1>
                    <Row>
                        {/* Mapeamos los productos a componentes Product, cada uno en una columna */}
                        {data.products.map((product) => (
                            // La propiedad 'key' es necesaria cuando se hace un map en React
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                {/* Componente Product que muestra cada producto */}
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    {/* Paginador */}
                    <Paginate
                        pages={data.pages}
                        page={data.page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    );
};

// Exportamos el componente HomeScreen para su uso en otras partes de la aplicación
export default HomeScreen;
