import jwt from 'jsonwebtoken';

// Función para generar un token JWT y establecerlo como una cookie HTTP-Only en la respuesta
const generateToken = (res, userId) => {
    // Genera un token JWT utilizando el userId y el secreto JWT proporcionado
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Establece la expiración del token a 1 hora
    });

    // Establece el token JWT como una cookie HTTP-Only en la respuesta
    res.cookie('jwt', token, {
        httpOnly: true, // La cookie solo es accesible a través de HTTP y no a través de JavaScript del lado del cliente
        secure: process.env.NODE_ENV !== 'development', // Utiliza cookies seguras en producción para conexiones HTTPS
        sameSite: 'strict', // Previene ataques CSRF al limitar el envío de cookies a peticiones del mismo sitio
        maxAge: 60 * 60 * 1000, // Duración máxima de la cookie: 1 hora en milisegundos
    });
};

export default generateToken;
