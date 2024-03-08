import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
    useGetUserDetailsQuery,
    useUpdateUserMutation,
} from '../../slices/usersApiSlice';

const UserEditScreen = () => {
    // Obtiene el ID del usuario de los parámetros de la URL
    const { id: userId } = useParams();

    // Estados locales
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    // Utiliza la consulta 'useGetUserDetailsQuery' para obtener detalles del usuario
    const {
        data: user,         // Datos del usuario
        isLoading,          // Estado de carga
        error,              // Error, si ocurre
        refetch,            // Función para volver a cargar los detalles del usuario
    } = useGetUserDetailsQuery(userId);

    // Utiliza la mutación 'useUpdateUserMutation' para actualizar los detalles del usuario
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    // Utiliza el hook 'useNavigate' para la navegación programática
    const navigate = useNavigate();

    // Manejador de envío de formulario
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // Llama a la función 'updateUser' con los nuevos detalles del usuario
            await updateUser({ userId, name, email, isAdmin });

            // Muestra un mensaje de éxito con la biblioteca 'toast'
            toast.success('User updated successfully');

            // Vuelve a cargar los detalles del usuario después de la actualización
            refetch();

            // Navega a la lista de usuarios en el panel de administración
            navigate('/admin/userlist');
        } catch (err) {
            // En caso de error, muestra un mensaje de error utilizando 'toast'
            toast.error(err?.data?.message || err.error);
        }
    };

    // Efecto secundario que se ejecuta cuando los datos del usuario cambian
    useEffect(() => {
        // Si existen datos del usuario, establece los estados locales con esos datos
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {/* Muestra un loader si se está realizando una actualización */}
                {loadingUpdate && <Loader />}
                {/* Muestra un loader si se están cargando los datos del usuario */}
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    // Muestra un mensaje de error si ocurre un problema al cargar los datos del usuario
                    <Message variant='danger'>
                        {error?.data?.message || error.error}
                    </Message>
                ) : (
                    // Formulario de edición del usuario
                    <Form onSubmit={submitHandler}>
                        {/* Campo de entrada para el nombre del usuario */}
                        <Form.Group className='my-2' controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {/* Campo de entrada para el correo electrónico del usuario */}
                        <Form.Group className='my-2' controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {/* Casilla de verificación para el estado de administrador del usuario */}
                        <Form.Group className='my-2' controlId='isadmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        {/* Botón de envío del formulario */}
                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

// Exporta el componente principal
export default UserEditScreen;