import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
    useGetProductDetailsQuery,
    useCreateReviewMutation,
} from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

// Componente funcional que representará la sección de los detalles del Producto
const ProductScreen = () => {
    // Obtener el valor del parámetro 'id'
    const { id: productId } = useParams(); // Asignarlo a 'productId'

    // Utilizamos el hook useGetProductDetailsQuery para obtener datos, estado de carga y errores
    // de nuestra API de productos. Los datos, en esta ocasión, serán del producto que coincida
    // el id obtenido, es decir, el de 'productId'
    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);

    // Hook de Redux para despachar acciones
    const dispatch = useDispatch();

    // Hook de React Router para navegar programáticamente
    const navigate = useNavigate();

    // Estados locales
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    // Utilizando este hook para obtener la info del usuario logeado
    const { userInfo } = useSelector((state) => state.auth);

    // Utilizando este hook personalizado para poder lograr que el usuario deje una 'review'
    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    // Función para manejar el evento de agregar producto al carrito
    const addToCartHandler = () => {
        // Despacha la acción addToCart con los detalles del producto y la cantidad
        dispatch(addToCart({ ...product, qty }));

        // Navega hacia la página del carrito
        navigate('/cart');
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            // Utiliza la mutación 'createReview' para enviar la reseña al servidor
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();

            // Refresca los datos después de la creación exitosa de la reseña
            refetch();

            // Muestra un mensaje de éxito
            toast.success('Review created successfully');

            // Reseteando los siguientes estados
            setRating(0);
            setComment('');
        } catch (err) {
            // Muestra un mensaje de error en caso de fallo, utilizando el mensaje del servidor si está disponible
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {/* Si se está cargando los datos del producto, mostrar el spinner de 'Loader' */}
            {isLoading ? (
                <Loader />
            ) : error ? (
                // En caso de error, mostrar el siguiente mensaje en una alerta con 'Message'
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                // Carga extiosa
                <>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {/* Se mostrará esta sección siempre y cuando haya stock del producto */}
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    {/* Selector de cantidad */}
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) => setQty(Number(e.target.value))}
                                                    >
                                                        {/* Generando las opciones de cantidad basadas en el stock disponible */}
                                                        {/* [...Array(product.countInStock).keys()] crea un array desde 0 hasta el número de items en stock */}
                                                        {/* Mapeando cada número a un elemento <option> en el selector */}
                                                        {[...Array(product.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            className='btn-block'
                                            type='button'
                                            disabled={product.countInStock === 0}
                                            onClick={addToCartHandler}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    {/* Sección para dejar 'reviews' */}
                    <Row className='review'>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {/* Muestra un mensaje si no hay reseñas disponibles */}
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {/* Mapea sobre las reseñas del producto y muestra cada una */}
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        {/* Utiliza el componente de Rating para mostrar la calificación de la reseña */}
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {/* Muestra un loader si se está cargando la creación de la reseña */}
                                    {loadingProductReview && <Loader />}

                                    {/* Verifica si el usuario está autenticado para mostrar el formulario de reseñas */}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group className='my-2' controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                {/* Despliega un menú desplegable para seleccionar la calificación */}
                                                <Form.Control
                                                    as='select'
                                                    required
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className='my-2' controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                {/* Cuadro de texto para ingresar el comentario de la reseña */}
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    required
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            {/* Botón para enviar la reseña */}
                                            <Button
                                                disabled={loadingProductReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        // Muestra un mensaje si el usuario no está autenticado
                                        <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;