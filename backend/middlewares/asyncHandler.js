// Función de orden superior con una función 'fn' como argumento
// Nos ayudará al trabajar con métodos asíncronos al evitar envolverlos en un 'try-catch'
const asyncHandler = (fn) =>
    // Retorna una nueva función que toma los objetos req, res y next de Express.js
    (req, res, next) =>
        // Inicia una Promise para resolver la función pasada (fn) con los argumentos req, res y next
        Promise.resolve(fn(req, res, next))
            // Si hay una excepción en la promesa (rechazo), pasa el error al siguiente middleware de manejo de errores en Express
            .catch(next);

// Exporta el asyncHandler para su uso en otros archivos
export default asyncHandler;
