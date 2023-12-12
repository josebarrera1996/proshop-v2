// Importación de componentes necesarios de react-bootstrap y react-icons
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

// Definición del componente funcional Header
const Header = () => {
    // Renderización del componente
    return (
        // Elemento <header> para la semántica HTML y estructura de la página
        <header>
            {/* Navbar de react-bootstrap para la navegación. Configurado para un fondo oscuro y variante oscura. */}
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                {/* Contenedor de react-bootstrap para alinear y organizar el contenido de la Navbar */}
                <Container>
                    {/* Marca de la Navbar, funciona como un enlace a la página de inicio */}
                    <Navbar.Brand href='/'>ProShop</Navbar.Brand>
                    {/* Botón de alternar para pantallas pequeñas, controla la visibilidad de los elementos de la Navbar */}
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    {/* Elementos colapsables de la Navbar, se muestran en pantallas grandes y se ocultan en pantallas pequeñas */}
                    <Navbar.Collapse id='basic-navbar-nav'>
                        {/* Navegación de la Navbar, alineada al final con la clase ms-auto */}
                        <Nav className='ms-auto'>
                            {/* Enlace de la Navbar con ícono de carrito de compras, lleva a la página del carrito */}
                            <Nav.Link href='/cart'>
                                <FaShoppingCart /> Cart
                            </Nav.Link>
                            {/* Enlace de la Navbar con ícono de usuario, lleva a la página de inicio de sesión */}
                            <Nav.Link href='/login'>
                                <FaUser /> Sign In
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

// Exportación del componente Header para su uso en otras partes de la aplicación
export default Header;
