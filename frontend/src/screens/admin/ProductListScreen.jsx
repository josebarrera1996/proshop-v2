import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetProductsQuery } from '../../slices/productsApiSlice';

// Componente para listar los productos
const ProductListScreen = () => {
    // Utilizar el hook 'useGetProductsQuery' para obtener la lista de productos
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();

    // Manejador de eventos para la eliminación de un producto (por implementar)
    const deleteHandler = () => {
        console.log('delete');
    };

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3'>
                        <FaPlus /> Create Product
                    </Button>
                </Col>
            </Row>

            {/* Renderizar loader, mensaje de error o tabla de productos según el estado */}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    {/* Tabla de productos */}
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapear cada producto en una fila de la tabla */}
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        {/* Botones de edición y eliminación para cada producto */}
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            <FaTrash style={{ color: 'white' }} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* Marcador de posición para la paginación (por implementar) */}
                </>
            )}
        </>
    );
};

export default ProductListScreen;