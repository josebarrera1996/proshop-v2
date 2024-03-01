import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
    useGetProductDetailsQuery,
    useUpdateProductMutation,
} from '../../slices/productsApiSlice';

// Componente principal para editar detalles de un producto
const ProductEditScreen = () => {
    // Obtiene el ID del producto de los parámetros de la URL
    const { id: productId } = useParams();

    // Estados para almacenar los detalles del producto
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    // Hook personalizado para obtener detalles del producto desde la API
    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);

    // Hook personalizado para actualizar detalles del producto en la API
    const [updateProduct, { isLoading: loadingUpdate }] =
        useUpdateProductMutation();

    // Navegación para redireccionar después de la actualización del producto
    const navigate = useNavigate();

    // Función para manejar el envío del formulario de edición
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // Llama a la función de actualización del producto con los nuevos detalles
            await updateProduct({
                productId,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            });
            // Muestra una notificación de éxito
            toast.success('Product updated successfully');
            // Refresca los detalles del producto
            refetch();
            // Redirecciona a la lista de productos en el área de administración
            navigate('/admin/productlist');
        } catch (err) {
            // Muestra un mensaje de error en caso de fallo en la actualización
            toast.error(err?.data?.message || err.error);
        }
    };

    // Efecto para cargar los detalles del producto en los estados al montar el componente
    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    // Renderización del componente
    return (
        <>
            {/* Enlace para regresar a la lista de productos en el área de administración */}
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            {/* Contenedor de formulario */}
            <FormContainer>
                {/* Título de la página */}
                <h1>Edit Product</h1>
                {/* Loader durante la actualización del producto */}
                {loadingUpdate && <Loader />}
                {/* Loader mientras se obtienen los detalles del producto */}
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    // Mensaje de error si hay un problema al obtener los detalles del producto
                    <Message variant='danger'>{error}</Message>
                ) : (
                    // Formulario de edición de productos
                    <Form onSubmit={submitHandler}>
                        {/* Campos del formulario para editar detalles del producto */}
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {/* Campo de imagen (placeholder) */}
                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter countInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {/* Botón para enviar el formulario */}
                        <Button
                            type='submit'
                            variant='primary'
                            style={{ marginTop: '1rem' }}
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

// Exporta el componente
export default ProductEditScreen;