import mongoose from 'mongoose';

// Definición del esquema para los usuarios
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // No podran haber emails iguales
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Creación del modelo 'User' basado en el esquema de usuario
const User = mongoose.model('User', userSchema);

// Exportación del modelo 'User' para su uso en otras partes de la aplicación
export default User;