// Importación de componentes de React Bootstrap
import { Container, Row, Col } from 'react-bootstrap';

// Componente Footer funcional
const Footer = () => {
    // Obtener el año actual
    const currentYear = new Date().getFullYear();

    // Renderizar el footer
    return (
        // Uso del elemento <footer> para la semántica HTML
        <footer>
            {/* Contenedor de React Bootstrap para centrar y alinear el contenido */}
            <Container>
                {/* Fila (Row) de React Bootstrap para organizar el contenido en una sola fila */}
                <Row>
                    {/* Columna (Col) de React Bootstrap para alinear el texto al centro y añadir padding vertical */}
                    <Col className='text-center py-3'>
                        {/* Parágrafo con el nombre de la compañía y el año actual */}
                        <p>ProShop &copy; {currentYear}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

// Exportación del componente Footer para su uso en otras partes de la aplicación
export default Footer;
