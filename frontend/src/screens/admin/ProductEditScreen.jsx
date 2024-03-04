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
    useUploadProductImageMutation
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

    // Hook personalizado para poder actuailizar la imagen de un producto (al subir una nueva)
    const [uploadProductImage, { isLoading: loadingUpload }] =
        useUploadProductImageMutation();

    // Navegación para redireccionar después de la actualización del producto
    const navigate = useNavigate();

    // Función para manejar la carga de archivos
    const uploadFileHandler = async (e) => {
        // Crear un objeto FormData para enviar datos binarios (como archivos)
        const formData = new FormData();

        // Adjuntar el archivo al FormData utilizando la clave 'image'
        formData.append('image', e.target.files[0]);

        try {
            // Realizar la solicitud de carga de imagen utilizando la función 'uploadProductImage'
            const res = await uploadProductImage(formData).unwrap();

            // Mostrar un mensaje de éxito y actualizar la imagen en el estado
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            // Mostrar un mensaje de error, priorizando el mensaje de error proporcionado por el servidor
            toast.error(err?.data?.message || err.error);
        }
    };

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
                        <Form.Group controlId='name' className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price' className='my-2'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image' className='my-2'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.Control
                                label='Choose File'
                                onChange={uploadFileHandler}
                                type='file'
                            ></Form.Control>
                            {loadingUpload && <Loader />}
                        </Form.Group>
                        <Form.Group controlId='brand' className='my-2'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='countInStock' className='my-2'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter countInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category' className='my-2'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description' className='my-2'>
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