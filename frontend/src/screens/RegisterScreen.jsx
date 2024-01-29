import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

// Componente funcional para la pantalla de registro de usuarios
const RegisterScreen = () => {
    // Estados locales para almacenar la información del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Hook para realizar el 'dispatch' de acciones de Redux
    const dispatch = useDispatch();

    // Hook para la navegación
    const navigate = useNavigate();

    // Utilización del hook generado para realizar la llamada de registro
    const [register, { isLoading }] = useRegisterMutation();

    // Selecciona la información del usuario autenticado del estado global de Redux
    const { userInfo } = useSelector((state) => state.auth);

    // Obtiene la ubicación actual de la URL y extrae el parámetro 'redirect'
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    // Efecto que redirige al usuario a la página indicada en 'redirect' si ya está autenticado
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    // Manejador para el envío del formulario de registro
    const submitHandler = async (e) => {
        e.preventDefault();

        // Verifica si las contraseñas coinciden
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                // Realiza la llamada de registro y desempaqueta la respuesta exitosa
                const res = await register({ name, email, password }).unwrap();
                // Despacha la acción para establecer las credenciales del usuario en el estado de autenticación
                dispatch(setCredentials({ ...res }));
                // Redirige al usuario a la página indicada en 'redirect'
                navigate(redirect);
            } catch (err) {
                // Muestra un mensaje de error utilizando la biblioteca 'react-toastify'
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    // Renderiza el formulario de registro
    return (
        <FormContainer>
            <h1>Register</h1>
            <Form onSubmit={submitHandler}>
                {/* Campo de entrada para el nombre */}
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Campo de entrada para el correo electrónico */}
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

                {/* Campo de entrada para confirmar la contraseña */}
                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Botón de registro */}
                <Button disabled={isLoading} type='submit' variant='primary'>
                    Register
                </Button>

                {/* Muestra un spinner de carga si la llamada está en curso */}
                {isLoading && <Loader />}
            </Form>

            {/* Enlace para redirigir a la página de inicio de sesión */}
            <Row className='py-3'>
                <Col>
                    Already have an account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
