import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/**
 * Componente de paginación para la interfaz de usuario.
 * @param {number} props.pages - Número total de páginas.
 * @param {number} props.page - Página actual.
 * @param {boolean} props.isAdmin - Indica si el usuario es un administrador (por defecto: false).
 * @param {string} props.keyword - Palabra clave de búsqueda (por defecto: vacío).
 */
const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return (
        // Renderiza la paginación solo si hay más de una página
        pages > 1 && (
            <Pagination>
                {/* Mapea un rango de números de página */}
                {[...Array(pages).keys()].map((x) => (
                    // Envolvente de enlace para la paginación
                    <LinkContainer
                        key={x + 1}
                        to={
                            // Determina la ruta del enlace de paginación en función del estado del usuario
                            !isAdmin // Si el usuario no es un administrador
                                ? keyword // Si hay una palabra clave de búsqueda
                                    ? `/search/${keyword}/page/${x + 1}` // Construye la ruta de búsqueda con la palabra clave y el número de página
                                    : `/page/${x + 1}` // Construye la ruta de la página regular con el número de página
                                : `/admin/productlist/${x + 1}` // Si el usuario es un administrador, construye la ruta de la lista de productos del administrador con el número de página
                        }
                    >
                        {/* Elemento de paginación, con activación condicional */}
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
};

export default Paginate;
