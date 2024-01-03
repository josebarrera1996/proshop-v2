// Importamos el componente Alert de react-bootstrap
import { Alert } from 'react-bootstrap';

// Definimos el componente funcional Message
// Este componente acepta props: 'variant' para definir el tipo de alerta, y 'children' para el contenido
const Message = ({ variant, children }) => {
    // Renderizamos el componente
    return (
        // Usamos el componente Alert de react-bootstrap
        <Alert variant={variant}>{children}</Alert> // Establecemos la variante del Alert y pasamos los children como contenido
    );
};

// Establecemos valores predeterminados para las props del componente
Message.defaultProps = {
    variant: 'info', // Si no se proporciona una variante, se usará 'info' por defecto
};

// Exportamos el componente Message para que pueda ser utilizado en otras partes de la aplicación
export default Message;
