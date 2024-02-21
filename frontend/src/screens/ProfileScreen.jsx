import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
    // Estado local para gestionar los campos del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Hook para realizar los dispatch de acciones
    const dispatch = useDispatch();

    // Obtener la información del usuario desde el estado global
    const { userInfo } = useSelector((state) => state.auth);

    // Hook personalizado para traer los pedidos
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    // Hook personalizado para realizar la mutación del perfil del usuario
    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    // Actualizar el estado local al montar el componente con la información del usuario
    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.name]);

    // Manejar la presentación del formulario y enviar la solicitud de actualización del perfil
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // Mostrar un mensaje de error si las contraseñas no coinciden
            toast.error('Passwords do not match');
        } else {
            try {
                // Realizar la solicitud de actualización del perfil
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                }).unwrap();
                // Actualizar la información del usuario en el estado global
                dispatch(setCredentials({ ...res }));
                // Mostrar un mensaje de éxito
                toast.success('Profile updated successfully');
            } catch (err) {
                // Mostrar un mensaje de error en caso de fallo en la solicitud
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <Row>
            {/* Sección para editar el perfil del usuario */}
            <Col md={3}>
                <h2>User Profile</h2>
                {/* Formulario para actualizar el perfil */}
                <Form onSubmit={submitHandler}>
                    {/* Campo para el nombre del usuario */}
                    <Form.Group className='my-2' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {/* Campo para la dirección de correo electrónico del usuario */}
                    <Form.Group className='my-2' controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {/* Campo para la contraseña del usuario */}
                    <Form.Group className='my-2' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {/* Campo para confirmar la contraseña del usuario */}
                    <Form.Group className='my-2' controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {/* Botón para enviar la actualización del perfil */}
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                    {/* Mostrar un loader mientras se procesa la actualización */}
                    {loadingUpdateProfile && <Loader />}
                </Form>
            </Col>
            {/* Sección para visualizar los pedidos del usuario */}
            <Col md={9}>
                <h2>My Orders</h2>
                {/* Si los pedidos se están cargando, mostrar este componente */}
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    // En caso de error, mostrar el componente con su respectivo mensaje
                    <Message variant='danger'>
                        {error?.data?.message || error.error}
                    </Message>
                ) : (
                    <Table striped table hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {/* Mostrar la fecha de pago si el pedido está pagado, de lo contrario, mostrar un ícono de "X" en rojo */}
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <FaTimes style={{ color: 'red' }} />
                                        )}
                                    </td>
                                    <td>
                                        {/* Mostrar la fecha de entrega si el pedido está entregado, de lo contrario, mostrar un ícono de "X" en rojo */}
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <FaTimes style={{ color: 'red' }} />
                                        )}
                                    </td>
                                    <td>
                                        {/* Botón para ver los detalles del pedido */}
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
};

export default ProfileScreen;
