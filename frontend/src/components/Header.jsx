// Importación de componentes necesarios de react-bootstrap y react-icons
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
// Bootstrap navegable
import { LinkContainer } from 'react-router-bootstrap';
// Navegación
import { useNavigate } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
// Búsqueda
import SearchBox from './SearchBox';
// Importando el Logo de la app
import Logo from '../assets/logo.png';

// Definición del componente funcional Header
const Header = () => {
    // Utilizando el hook para poder acceder al state 'cart' que está dentro del 'store'
    // Y utilizar el 'cartItems'
    const { cartItems } = useSelector((state) => state.cart);

    // Utilizando el hook para poder acceder al state 'auth' que está dentro del 'store'
    // Y utilizar el 'userInfo'
    const { userInfo } = useSelector((state) => state.auth);

    // Hook para manejar el 'dispatch' de las acciones
    const dispatch = useDispatch();

    // Hook para manejar la navegación
    const navigate = useNavigate();

    // Hook personalizado para manejar el deslogeo
    const [logoutApiCall] = useLogoutMutation();

    // Método para gestionar el proceso de cierre de sesión del usuario
    const logoutHandler = async () => {
        try {
            // Realiza la llamada a la API para cerrar sesión y desempaqueta la respuesta exitosa
            await logoutApiCall().unwrap();
            // Despacha la acción para actualizar el estado de autenticación (logout)
            dispatch(logout());
            // Navega al componente de inicio de sesión después del cierre de sesión exitoso
            navigate('/login');
        } catch (err) {
            // Manejo de errores en caso de fallo al cerrar sesión
            console.error(err);
        }
    };

    return (
        <header>
            {/* Navbar de react-bootstrap para la navegación. Configurado para un fondo oscuro y variante oscura. */}
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                {/* Contenedor de react-bootstrap para alinear y organizar el contenido de la Navbar */}
                <Container>
                    {/* Marca de la Navbar, funciona como un enlace a la página de inicio */}
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img src={Logo} alt="ProShop" />
                            ProShop
                        </Navbar.Brand>
                    </LinkContainer>
                    {/* Botón de alternar para pantallas pequeñas, controla la visibilidad de los elementos de la Navbar */}
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    {/* Elementos colapsables de la Navbar, se muestran en pantallas grandes y se ocultan en pantallas pequeñas */}
                    <Navbar.Collapse id='basic-navbar-nav'>
                        {/* Navegación de la Navbar, alineada al final con la clase ms-auto */}
                        <Nav className='ms-auto'>
                            {/* Campo de búsqueda */}
                            <SearchBox />
                            {/* Enlace de la Navbar con ícono de carrito de compras, lleva a la página del carrito */}
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <FaShoppingCart /> Cart
                                    {/* Mostrar la cantidad de items en el carrito (siempre y cuando los haya) */}
                                    {cartItems.length > 0 && (
                                        <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            {/* Condicional para mostrar enlace de usuario o dropdown con opciones */}
                            {userInfo ? (
                                <>
                                    {/* Dropdown para el usuario autenticado */}
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                // Enlace a la página de inicio de sesión
                                <LinkContainer LinkContainer to='/login'>
                                    <Nav.Link>
                                        <FaUser /> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {/* Dropdown para los usuarios de tipo 'admin' */}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    );
};

export default Header;