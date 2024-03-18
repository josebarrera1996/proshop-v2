// Importar la función isValidObjectId de mongoose para validar ObjectIds
import { isValidObjectId } from 'mongoose';

// Middleware para verificar si un parámetro de ruta es un ObjectId válido
function checkObjectId(req, res, next) {
    // Verificar si el parámetro de ruta es un ObjectId válido
    if (!isValidObjectId(req.params.id)) {
        // Si no es válido, establecer el estado de la respuesta en 404 y lanzar un error
        res.status(404);
        throw new Error(`Invalid ObjectId of: ${req.params.id}`);
    }
    // Si es válido, pasar al siguiente middleware en la cadena de middleware
    next();
}

// Exportar la función checkObjectId para su uso en otras partes de la aplicación
export default checkObjectId;
