// Importa el paquete 'jsonwebtoken' para trabajar con JSON Web Tokens (JWT)
import jwt from 'jsonwebtoken';
// Importa el middleware personalizado 'asyncHandler' para manejar excepciones en funciones asíncronas
import asyncHandler from './asyncHandler.js';
// Importa el modelo User que representa la colección de usuarios en la base de datos
import User from '../models/userModel.js';

// Middleware 'protect': Asegura que el usuario esté autenticado mediante un token JWT
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Lee el token JWT desde la cookie llamada 'jwt'
    token = req.cookies.jwt;

    if (token) {
        try {
            // Verifica y decodifica el token JWT utilizando la clave secreta definida en el entorno
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Busca al usuario en la base de datos usando el ID del usuario obtenido del token
            // Excluye la contraseña del resultado usando '.select('-password')'
            // Este objeto 'req.user' podrá ser utilizado en todas las rutas que apliquen este middleware
            req.user = await User.findById(decoded.userId).select('-password');

            next(); // Continúa con la siguiente función de middleware o controlador
        } catch (error) {
            // En caso de error del token
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        // En caso de error al no tener el token...
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Middleware 'admin': Asegura que el usuario autenticado sea un administrador
const admin = (req, res, next) => {
    // Verifica si existe un usuario autenticado y si es un administrador
    if (req.user && req.user.isAdmin) {
        next(); // Continúa con la siguiente función de middleware o controlador
    } else {
        // En caso de error, es decir, el usuario no es admin...
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

// Exporta los middlewares 'protect' y 'admin' para su uso en otras partes de la aplicación
export { protect, admin };
