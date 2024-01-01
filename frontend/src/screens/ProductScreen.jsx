import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Rating from '../components/Rating';

// Componente funcional que representará la sección de los detalles del Producto
const ProductScreen = () => {
    // Obtener el valor del parámetro 'id'
    const { id: productId } = useParams(); // Asignarlo a 'productId'

    // Utilizamos el hook useGetProductDetailsQuery para obtener datos, estado de carga y errores
    // de nuestra API de productos. Los datos, en esta ocasión, serán del producto que coincida
    // el id obtenido, es decir, el de 'productId'
    const {
        data: product,
        isLoading,
        error,
    } = useGetProductDetailsQuery(productId);

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {/* Cargando... */}
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                // En caso de error, mostrar el siguiente mensaje:
                <div>{error?.data.message || error.error}</div>
            ) : (
                // Carga extiosa
                <>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button
                                            className='btn-block'
                                            type='button'
                                            disabled={product.countInStock === 0}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;