import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Componente funcional que muestra los pasos del proceso de pago
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        // Barra de navegación de Bootstrap alineada al centro y con un margen inferior
        <Nav className='justify-content-center mb-4'>
            {/* Paso 1: Sign In */}
            <Nav.Item>
                {step1 ? (
                    // Si el paso está completado, enlaza a '/login' usando LinkContainer y muestra el enlace
                    <LinkContainer to='/login'>
                        <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                ) : (
                    // Si el paso no está completado, muestra el enlace deshabilitado
                    <Nav.Link disabled>Sign In</Nav.Link>
                )}
            </Nav.Item>

            {/* Paso 2: Shipping */}
            <Nav.Item>
                {step2 ? (
                    // Si el paso está completado, enlaza a '/shipping' usando LinkContainer y muestra el enlace
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    // Si el paso no está completado, muestra el enlace deshabilitado
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>

            {/* Paso 3: Payment */}
            <Nav.Item>
                {step3 ? (
                    // Si el paso está completado, enlaza a '/payment' usando LinkContainer y muestra el enlace
                    <LinkContainer to='/payment'>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    // Si el paso no está completado, muestra el enlace deshabilitado
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>

            {/* Paso 4: Place Order */}
            <Nav.Item>
                {step4 ? (
                    // Si el paso está completado, enlaza a '/placeorder' usando LinkContainer y muestra el enlace
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Place Order</Nav.Link>
                    </LinkContainer>
                ) : (
                    // Si el paso no está completado, muestra el enlace deshabilitado
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

// Exporta el componente CheckoutSteps para su uso en otras partes de la aplicación
export default CheckoutSteps;
