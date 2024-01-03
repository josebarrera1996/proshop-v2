// Importamos el hook personalizado useGetProductsQuery de nuestro slice de producto
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

// Componente funcional HomeScreen
const HomeScreen = () => {
    // Utilizamos el hook useGetProductsQuery para obtener datos, estado de carga y errores
    // de nuestra API de productos
    const { data: products, isLoading, error } = useGetProductsQuery();

    // Renderización del componente
    return (
        // Utilizamos fragmentos para agrupar múltiples elementos
        <>
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
                    <h1>Latest Products</h1>
                    <Row>
                        {/* Mapeamos los productos a componentes Product, cada uno en una columna */}
                        {products.map((product) => (
                            // La propiedad 'key' es necesaria cuando se hace un map en React
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                {/* Componente Product que muestra cada producto */}
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
};

// Exportamos el componente HomeScreen para su uso en otras partes de la aplicación
export default HomeScreen;
