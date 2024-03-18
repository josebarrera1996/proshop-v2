// Middleware para manejar rutas no encontradas en la aplicación
const notFound = (req, res, next) => {
    // Crea un nuevo objeto de Error con un mensaje que incluye la URL solicitada
    const error = new Error(`Not Found - ${req.originalUrl}`);
    // Establece el código de estado de la respuesta a 404 (No encontrado)
    res.status(404);
    // Pasa el error al siguiente middleware (usualmente un manejador de errores)
    next(error);
};

// Middleware para manejar errores generales en la aplicación
const errorHandler = (err, req, res, next) => {
    // Establece el código de estado de la respuesta. Si por alguna razón es 200, lo cambia a 500.
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message; // Mensaje predeterminado del error

    // Envía la respuesta de error en formato JSON
    res.status(statusCode).json({
        message: message, // Mensaje de error
        // Incluye el stacktrace del error solo si la aplicación no está en producción
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

// Exporta los middlewares para su uso en otros archivos del proyecto
export { notFound, errorHandler };
