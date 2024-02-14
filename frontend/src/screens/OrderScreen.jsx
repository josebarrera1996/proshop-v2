import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

const OrderScreen = () => {
    // Obtén el ID del pedido de los parámetros de la URL
    const { id: orderId } = useParams();

    // Realiza la llamada a la API para obtener detalles del pedido usando el hook personalizado
    const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

    return isLoading ? (
        // Muestra un loader mientras se carga la información del pedido
        <Loader />
    ) : error ? (
        // Muestra un mensaje de error si hay un problema al cargar los detalles del pedido
        <Message variant='danger'>{error}</Message>
    ) : (
        // Muestra la información del pedido si se cargó correctamente
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        {/* Sección de detalles de envío */}
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>{' '}
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                // Muestra un mensaje de entrega exitosa si el pedido ha sido entregado
                                <Message variant='success'>
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                // Muestra un mensaje de no entregado si el pedido no ha sido entregado
                                <Message variant='danger'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        {/* Sección de detalles de pago */}
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                // Muestra un mensaje de pago exitoso si el pedido ha sido pagado
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                // Muestra un mensaje de no pagado si el pedido no ha sido pagado
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        {/* Sección de detalles de los elementos del pedido */}
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                // Muestra un mensaje si el pedido no contiene elementos
                                <Message>Order is empty</Message>
                            ) : (
                                // Muestra la lista de elementos del pedido
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    {/* Enlace al producto correspondiente */}
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {/* Muestra la cantidad, precio unitario y precio total del elemento */}
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    {/* Resumen del pedido en una tarjeta */}
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    {/* Muestra el precio total de los elementos del pedido */}
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    {/* Muestra el costo de envío */}
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    {/* Muestra el monto de impuestos */}
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    {/* Muestra el precio total del pedido */}
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* Funciones para marcar como pagado y marcar como entregado (a implementar) */}
                            {/* PAY ORDER PLACEHOLDER */}
                            {/* {MARK AS DELIVERED PLACEHOLDER} */}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;
