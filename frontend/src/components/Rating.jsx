import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color }) => {
    // Devuelve un elemento 'div' con la clase 'rating'.
    return (
        <div className="rating">
            {/* Muestra estrellas llenas, estrellas medio llenas o estrellas vacías
         dependiendo del valor de la calificación. */}
            <span>
                {value >= 1 ? (
                    // Una estrella llena si el valor es mayor o igual a 1.
                    <FaStar />
                ) : value >= 0.5 ? (
                    // Una estrella media llena si el valor está entre 0.5 y 1.
                    <FaStarHalfAlt />
                ) : (
                    // Una estrella vacía si el valor es menor a 0.5.
                    <FaRegStar />
                )}
            </span>
            {/* Se repite el código anterior para las siguientes 4 estrellas
         con incrementos de 1 en el valor de comparación. */}
            <span>
                {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>
                {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>
                {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>
                {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            {/* Muestra el texto de la calificación si está definido. */}
            {text && <span className="rating-text">{text}</span>}
        </div>
    );
};

// Define un valor predeterminado para el color de las estrellas.
Rating.defaultProps = {
    color: "#f8e825",
};

export default Rating;
