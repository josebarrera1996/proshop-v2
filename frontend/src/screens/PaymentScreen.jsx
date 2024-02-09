import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

// Componente funcional PaymentScreen para la selección del método de pago
const PaymentScreen = () => {
    // Hook para manejar la navegación
    const navigate = useNavigate();

    // Accede al estado del carrito desde el store de Redux
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    // Efecto para redirigir a la pantalla de envío si la dirección de envío no está establecida
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [navigate, shippingAddress]);

    // Estado local para almacenar el método de pago seleccionado
    const [paymentMethod, setPaymentMethod] = useState('PayPal'); // Por defecto, es 'PayPal'

    // Hook para realizar el 'dispatch' de las acciones de Redux
    const dispatch = useDispatch();

    // Manejador para el envío del formulario de selección de método de pago
    const submitHandler = (e) => {
        e.preventDefault();
        // Despacha la acción para guardar el método de pago seleccionado en el estado del carrito
        dispatch(savePaymentMethod(paymentMethod));
        // Navega a la siguiente pantalla (Place Order)
        navigate('/placeorder');
    };

    return (
        // Contenedor de formulario personalizado
        <FormContainer>
            {/* Componente CheckoutSteps que muestra los pasos del proceso de pago */}
            <CheckoutSteps step1 step2 step3 />
            {/* Título de la pantalla */}
            <h1>Payment Method</h1>
            {/* Formulario para la selección del método de pago */}
            <Form onSubmit={submitHandler}>
                {/* Grupo de formulario para la selección del método de pago */}
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        {/* Opción de pago con PayPal o tarjeta de crédito */}
                        <Form.Check
                            className='my-2'
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                {/* Botón para continuar al siguiente paso */}
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

// Exporta el componente PaymentScreen para su uso en otras partes de la aplicación
export default PaymentScreen;
