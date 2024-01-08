import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Form, Button } from 'react-bootstrap';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

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

    // Hook de Redux para despachar acciones
    const dispatch = useDispatch();

    // Hook de React Router para navegar programáticamente
    const navigate = useNavigate();

    // Estado local para gestionar la cantidad seleccionada del producto
    const [qty, setQty] = useState(1);

    // Función para manejar el evento de agregar producto al carrito
    const addToCartHandler = () => {
        // Despacha la acción addToCart con los detalles del producto y la cantidad
        dispatch(addToCart({ ...product, qty }));
        // Navega hacia la página del carrito
        navigate('/cart');
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {/* Si se está cargando los datos del producto, mostrar el spinner de 'Loader' */}
            {isLoading ? (
                <Loader />
            ) : error ? (
                // En caso de error, mostrar el siguiente mensaje en una alerta con 'Message'
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
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
                                    {/* Se mostrará esta sección siempre y cuando haya stock del producto */}
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    {/* Selector de cantidad */}
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {/* Generando las opciones de cantidad basadas en el stock disponible */}
                                                        {/* [...Array(product.countInStock).keys()] crea un array desde 0 hasta el número de items en stock */}
                                                        {/* Mapeando cada número a un elemento <option> en el selector */}
                                                        {[...Array(product.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            className='btn-block'
                                            type='button'
                                            disabled={product.countInStock === 0}
                                            onClick={addToCartHandler}
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