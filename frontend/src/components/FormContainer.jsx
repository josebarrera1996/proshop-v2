import { Container, Row, Col } from 'react-bootstrap';

// Componente funcional 'FormContainer' para los formularios de 'LoginScreen' & 'RegisterScreen'
const FormContainer = ({ children }) => { // Recibe 'children' como prop (elementos hijos)
  return (
    // Contenedor principal utilizando el componente 'Container' de Bootstrap
    <Container>
      {/* Fila centrada verticalmente utilizando el componente 'Row' de Bootstrap */}
      <Row className='justify-content-md-center'>
        {/* Columna de ancho completo en dispositivos pequeños y de ancho medio en dispositivos medianos */}
        <Col xs={12} md={6}>
          {/* Renderiza los elementos hijos que se pasan como prop (contenido del formulario) */}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

// Exporta el componente 'FormContainer' para su uso en otras partes de la aplicación
export default FormContainer;
