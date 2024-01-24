import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginScreen = () => {
    // Estado local para almacenar el email y la contraseña del usuario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Definiendo el hook para realizar el 'dispatch' de las acciones
    const dispatch = useDispatch();

    // Hook para manejar la navegación
    const navigate = useNavigate();

    // Utilización del hook generado para realizar la llamada de login
    const [login, { isLoading }] = useLoginMutation();

    // Selecciona la información del usuario autenticado del estado global de Redux
    const { userInfo } = useSelector((state) => state.auth);

    // Obtiene la ubicación actual de la URL y extrae el parámetro 'redirect'
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    // Redirige al usuario a la página indicada en 'redirect' si ya está autenticado
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    // Manejador para el envío del formulario de inicio de sesión
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // Realiza la llamada de login y desempaqueta la respuesta exitosa
            const res = await login({ email, password }).unwrap();
            // Despacha la acción para establecer las credenciales del usuario en el estado de autenticación
            dispatch(setCredentials({ ...res }));
            // Redirige al usuario a la página indicada en 'redirect'
            navigate(redirect);
        } catch (err) {
            // Muestra un mensaje de error utilizando la biblioteca 'react-toastify'
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>

            {/* Formulario de inicio de sesión */}
            <Form onSubmit={submitHandler}>
                {/* Campo de entrada para el email */}
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Campo de entrada para la contraseña */}
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Botón de inicio de sesión */}
                <Button disabled={isLoading} type='submit' variant='primary'>
                    Sign In
                </Button>

                {/* Muestra un spinner de carga si la llamada está en curso */}
                {isLoading && <Loader />}
            </Form>

            {/* Enlace para registrar una nueva cuenta */}
            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
