import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation
} from '../../slices/productsApiSlice';

// Componente para listar los productos
const ProductListScreen = () => {
    // Obtenemos el número de página
    const { pageNumber } = useParams();

    // Utilizar el hook 'useGetProductsQuery' para obtener la lista de productos
    const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });

    // Utilizar este hook para poder crear un nuevo producto
    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    // Utilizar este hook para poder eliminar un producto
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    // Manejador para poder crear un nuevo producto
    const createProductHandler = async () => {
        // Verificar si realmente vamos a querer crear un nuevo producto
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                // Llamando al método
                await createProduct();
                // Listar nuevamente los productos
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    // Manejador de eventos para la eliminación de un producto (por implementar)
    const deleteHandler = async (id) => {
        // Mostrar un cuadro de confirmación al usuario
        if (window.confirm('Are you sure')) {
            try {
                // Llamar a la función de eliminación de producto con el ID correspondiente
                await deleteProduct(id);

                // Refrescar los datos después de la eliminación exitosa
                refetch();
            } catch (err) {
                // Manejar errores y mostrar un mensaje de error al usuario
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <FaPlus /> Create Product
                    </Button>
                </Col>
            </Row>
            {/* Renderizar el loader mientras se este creando o eliminando el producto */}
            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
            {/* Renderizar loader, mensaje de error o tabla de productos según el estado */}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error.data.message}</Message>
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
                            {data.products.map((product) => (
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
                    {/* Paginador */}
                    <Paginate pages={data.pages} page={data.page} isAdmin={true} />
                </>
            )}
        </>
    );
};

export default ProductListScreen;