import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetUsersQuery } from '../../slices/usersApiSlice';

const UserListScreen = () => {
    // Obtener datos de usuarios, estado de carga y errores mediante el hook personalizado
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    // Manejador para eliminar un usuario
    const deleteHandler = async (id) => {
        console.log('delete');
    };

    return (
        <>
            <h1>Users</h1>
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
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <FaCheck style={{ color: 'green' }} />
                                    ) : (
                                        <FaTimes style={{ color: 'red' }} />
                                    )}
                                </td>
                                <td>
                                    {!user.isAdmin && (
                                        // Si el usuario no es 'admin' que se muestre esto:
                                        <>
                                            <LinkContainer
                                                to={`/admin/user/${user._id}/edit`}
                                                style={{ marginRight: '10px' }}
                                            >
                                                <Button variant='light' className='btn-sm'>
                                                    <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() => deleteHandler(user._id)}
                                            >
                                                <FaTrash style={{ color: 'white' }} />
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserListScreen;