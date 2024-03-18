import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery,
    useDeliverOrderMutation
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
    // Obtén el ID del pedido de los parámetros de la URL
    const { id: orderId } = useParams();

    // Realiza la llamada a la API para obtener detalles del pedido usando el hook personalizado
    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);

    // Llamada a la mutación para pagar el pedido utilizando el hook personalizado
    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    // Llamada a la mutación para marcar el pedido como enviado utilizando el hook personalizado
    const [deliverOrder, { isLoading: loadingDeliver }] =
        useDeliverOrderMutation();

    // Obtener información del usuario desde el estado global utilizando useSelector
    const { userInfo } = useSelector((state) => state.auth);

    // Obtener el estado y el despachador del script de PayPal utilizando usePayPalScriptReducer
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    // Realizar la llamada a la API para obtener el ID de cliente de PayPal utilizando el hook personalizado
    const {
        data: paypal,
        isLoading: loadingPayPal,
        error: errorPayPal,
    } = useGetPaypalClientIdQuery();

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            // Cargar el script de PayPal cuando el ID del cliente de PayPal esté disponible
            const loadPaypalScript = async () => {
                // Restablecer las opciones y establecer el estado de carga del script de PayPal
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD',
                    },
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            };
            // Verificar si el pedido no está pagado y el script de PayPal no está cargado
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPaypalScript();
                }
            }
        }
    }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

    // Función que se ejecuta cuando el usuario aprueba el pago mediante PayPal
    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                // Llama a la mutación para pagar el pedido con los detalles capturados
                await payOrder({ orderId, details });
                // Vuelve a cargar los detalles del pedido para reflejar los cambios
                refetch();
                // Muestra un mensaje de éxito al usuario
                toast.success('Order is paid');
            } catch (err) {
                // Muestra un mensaje de error si hay un problema al pagar el pedido
                toast.error(err?.data?.message || err.error);
            }
        });
    }

    // Función de prueba para simular el pago del pedido (sin conexión a PayPal)
    async function onApproveTest() {
        // Llama a la mutación para pagar el pedido con detalles simulados
        await payOrder({ orderId, details: { payer: {} } });
        // Vuelve a cargar los detalles del pedido para reflejar los cambios
        refetch();
        // Muestra un mensaje de éxito al usuario
        toast.success('Order is paid');
    }

    // Función que se ejecuta en caso de error durante el proceso de pago
    function onError(err) {
        // Muestra un mensaje de error al usuario
        toast.error(err.message);
    }

    // Función que crea una orden de PayPal con los detalles del pedido
    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: order.totalPrice },
                    },
                ],
            })
            .then((orderID) => {
                // Devuelve el ID de la orden creada
                return orderID;
            });
    }

    // Función para marcar el pedido como enviado
    const deliverHandler = async () => {
        await deliverOrder(orderId);
        // Vuelve a cargar los detalles del pedido para reflejar los cambios
        refetch();
        // Muestra un mensaje de éxito al usuario
        toast.success('Order delivered');
    };

    return isLoading ? (
        // Muestra un loader mientras se carga la información del pedido
        <Loader />
    ) : error ? (
        // Muestra un mensaje de error si hay un problema al cargar los detalles del pedido
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
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
                            {/* Botones a mostrar si no se ha pagado el pedido */}
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {/* Muestra un loader mientras se procesa el pago */}
                                    {loadingPay && <Loader />}
                                    {/* Verifica si la carga del script de PayPal está en curso */}
                                    {isPending ? (
                                        <Loader />
                                    ) : (
                                        // Renderiza botones de prueba de pago y botones de PayPal
                                        <div>
                                            {/* Botón de prueba para simular el pago sin conexión a PayPal */}
                                            <Button
                                                style={{ marginBottom: '10px' }}
                                                onClick={onApproveTest}
                                            >
                                                Test Pay Order
                                            </Button>
                                            {/* Componente de botones de PayPal */}
                                            <div>
                                                <PayPalButtons
                                                    // Función para crear un nuevo pedido antes de iniciar el pago
                                                    createOrder={createOrder}
                                                    // Función que se ejecuta cuando el pago es aprobado por el usuario
                                                    onApprove={onApprove}
                                                    // Función que se ejecuta en caso de error durante el proceso de pago
                                                    onError={onError}
                                                ></PayPalButtons>
                                            </div>
                                        </div>
                                    )}
                                </ListGroup.Item>
                            )}
                            {/* Sección para marcar el pedido como enviado (si el usuario es 'Admin' y se ha pagado el pedido) */}
                            {loadingDeliver && <Loader />}
                            {userInfo &&
                                userInfo.isAdmin &&
                                order.isPaid &&
                                !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;
