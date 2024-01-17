import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

// Método añadido al Schema para comparar contraseñas (la ingresada con la almacenada en la b.d)
userSchema.methods.matchPassword = async function (enteredPassword) {
    // Compara la contraseña ingresada con la contraseña almacenada usando bcrypt
    return await bcrypt.compare(enteredPassword, this.password);
};

// Creación del modelo 'User' basado en el esquema de usuario
const User = mongoose.model('User', userSchema);

// Exportación del modelo 'User' para su uso en otras partes de la aplicación
export default User;