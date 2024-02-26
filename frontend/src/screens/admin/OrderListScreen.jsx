import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

// Componente funcional que representa la pantalla de lista de pedidos
const OrderListScreen = () => {
    // Obtener datos de pedidos, estado de carga y errores mediante el hook personalizado
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    return (
        <>
            {/* Encabezado de la página */}
            <h1>Orders</h1>
            {/* Condición de carga: muestra un indicador de carga si los datos están cargando */}
            {isLoading ? (
                <Loader />
            ) : error ? (
                // Condición de error: muestra un mensaje de error si hay un problema al cargar los datos
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                // Condición de éxito: muestra la tabla de pedidos si los datos se cargan correctamente
                <Table striped bordered hover responsive className='table-sm'>
                    {/* Encabezados de la tabla */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    {/* Cuerpo de la tabla: Mapea cada pedido para mostrar la información en filas */}
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                {/* Condición para mostrar la fecha de pago o un icono de 'FaTimes' si no está pagado */}
                                <td>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <FaTimes style={{ color: 'red' }} />
                                    )}
                                </td>
                                {/* Condición para mostrar la fecha de entrega o un icono de 'FaTimes' si no está entregado */}
                                <td>
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <FaTimes style={{ color: 'red' }} />
                                    )}
                                </td>
                                {/* Botón que redirige a la página de detalles del pedido */}
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default OrderListScreen;
