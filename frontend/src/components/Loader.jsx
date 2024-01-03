// Importamos el componente Spinner de react-bootstrap
import { Spinner } from 'react-bootstrap';

// Definimos el componente funcional Loader
const Loader = () => {
    // Renderizamos el componente
    return (
        // Utilizamos el componente Spinner de react-bootstrap
        <Spinner
            animation='border' // Establecemos el tipo de animación para el spinner, en este caso 'border'
            role='status' // Asignamos un rol de 'status' para accesibilidad, indicando que algo está en progreso
            style={{
                width: '100px', // Establecemos un ancho fijo para el spinner
                height: '100px', // Establecemos una altura fija para el spinner
                margin: 'auto', // Centramos el spinner horizontalmente en su contenedor
                display: 'block', // Aseguramos que el spinner se muestre como un bloque (ocupa su propia línea)
            }}
        ></Spinner> // Cierre del componente Spinner
    );
};

// Exportamos el componente Loader para que pueda ser utilizado en otras partes de la aplicación
export default Loader;
