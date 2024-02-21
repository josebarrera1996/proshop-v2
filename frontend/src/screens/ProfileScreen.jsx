import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
    // Estado local para gestionar los campos del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    // Obtener la información del usuario desde el estado global
    const { userInfo } = useSelector((state) => state.auth);

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
            </Col>
        </Row>
    )
};

export default ProfileScreen;
