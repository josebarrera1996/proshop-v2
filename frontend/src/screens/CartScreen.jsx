// Importaciones de React y Redux, así como componentes y estilos de React-Bootstrap y iconos
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
    // Hook para manejar la navegación
    const navigate = useNavigate();
    // Hook para poder realizar el dispatch de la acción
    const dispatch = useDispatch();

    // Acceso al estado del carrito de Redux Store
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    // Función para manejar la adición de productos al carrito
    const addToCartHandler = async (product, qty) => {
        // Llamando a la acción
        dispatch(addToCart({ ...product, qty }));
    };

    // Función para manejar la eliminación de productos del carrito
    const removeFromCartHandler = (id) => {
        // Llamando a la acción
        dispatch(removeFromCart(id));
    };

    return (
        <Row>
            <Col md={8}>
                {/* Título del carrito de compras */}
                <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
                {/* Mensaje en caso de que el carrito esté vacío */}
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    // Listado de productos en el carrito
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    {/* Imagen, nombre, precio, selector de cantidad y botón de eliminar para cada producto */}
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        {/* Selector de cantidad del producto */}
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) =>
                                                addToCartHandler(item, Number(e.target.value))
                                            }
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        {/* Botón para eliminar el producto del carrito */}
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item._id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                {/* Resumen del carrito */}
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            {/* Subtotal del carrito */}
                            <h2>
                                Subtotal: {cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)} items
                            </h2>
                            $
                            {cartItems
                                .reduce((acc, item) => acc + item.qty * item.price, 0)
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {/* Botón para proceder al pago */}
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;
