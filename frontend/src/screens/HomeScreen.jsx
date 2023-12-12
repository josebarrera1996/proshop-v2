// Importación de componentes de React Bootstrap y componentes personalizados
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product'; // Importación del componente Product
import products from '../products'; // Importación de la lista de productos

// Componente funcional HomeScreen
const HomeScreen = () => {
    // Renderización del componente
    return (
        // Fragmento de React para agrupar múltiples elementos sin añadir nodos extra al DOM
        <>
            {/* Título de la sección */}
            <h1>Latest Products</h1>
            {/* Row de React Bootstrap para organizar los productos en una cuadrícula */}
            <Row>
                {/* Mapeo de la lista de productos a componentes individuales */}
                {products.map((product) => (
                    // Columna de React Bootstrap para cada producto. Las propiedades sm, md, lg, y xl controlan el tamaño y la responsividad.
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        {/* Componente Product que muestra los detalles de cada producto */}
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

// Exportación del componente HomeScreen para su uso en otras partes de la aplicación
export default HomeScreen;
