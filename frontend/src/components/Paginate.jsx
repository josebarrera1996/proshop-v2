import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/**
 * Componente de paginación
 * @param {number} props.pages - Número total de páginas disponibles.
 * @param {number} props.page - Página actual.
 * @param {boolean} [props.isAdmin=false] - Indica si el componente se utiliza en el área de administración.
 */
const Paginate = ({ pages, page, isAdmin = false }) => {
    
    return (
        // Verifica si hay más de una página
        pages > 1 && (
            // Renderiza el componente Pagination de react-bootstrap
            <Pagination>
                {/* Mapea sobre un array de keys para renderizar los elementos de paginación */}
                {[...Array(pages).keys()].map((x) => (
                    // Utiliza LinkContainer para envolver cada elemento de paginación con un enlace react-router-bootstrap
                    <LinkContainer
                        key={x + 1}
                        // Configura la ruta del enlace según si es para usuarios regulares o para el área de administración
                        to={!isAdmin ? `/page/${x + 1}` : `/admin/productlist/${x + 1}`}
                    >
                        {/* Renderiza un elemento de paginación activo si coincide con la página actual */}
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
};

export default Paginate;
