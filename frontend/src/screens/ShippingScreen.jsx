import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';

// Componente funcional para la pantalla de envío
const ShippingScreen = () => {
    // Obtiene el estado del carrito y la dirección de envío desde el estado global de Redux
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    // Estados locales para manejar los campos de dirección, ciudad, código postal y país
    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    // Hook para realizar el 'dispatch' de acciones de Redux
    const dispatch = useDispatch();

    // Hook para manejar la navegación
    const navigate = useNavigate();

    // Manejador para el envío del formulario de dirección de envío
    const submitHandler = (e) => {
        e.preventDefault();

        // Dispatch de la acción para guardar la dirección de envío en el estado del carrito
        dispatch(saveShippingAddress({ address, city, postalCode, country }));

        // Navega al siguiente paso del proceso de pago (página de pago)
        navigate('/payment');
    };

    // Estructura del componente con el formulario de dirección de envío
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                {/* Campo de entrada para la dirección */}
                <Form.Group className='my-2' controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Campo de entrada para la ciudad */}
                <Form.Group className='my-2' controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Campo de entrada para el código postal */}
                <Form.Group className='my-2' controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Campo de entrada para el país */}
                <Form.Group className='my-2' controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Botón para continuar al siguiente paso */}
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

// Exporta el componente ShippingScreen para su uso en otras partes de la aplicación
export default ShippingScreen;
