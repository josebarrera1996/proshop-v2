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

// Middleware que se ejecuta antes de guardar el usuario en la base de datos
userSchema.pre('save', async function (next) {
    // Verifica si la contraseña ha sido modificada antes de realizar el hash
    if (!this.isModified('password')) {
        next(); // Si no ha sido modificada, continúa con la siguiente operación (por ejemplo, guardar)
    }

    // Genera un salt (valor aleatorio para fortalecer el hash)
    const salt = await bcrypt.genSalt(10);

    // Hash de la contraseña utilizando el salt generado
    this.password = await bcrypt.hash(this.password, salt);

    // Continúa con la siguiente operación (por ejemplo, guardar)
    next();
});
// Creación del modelo 'User' basado en el esquema de usuario
const User = mongoose.model('User', userSchema);

// Exportación del modelo 'User' para su uso en otras partes de la aplicación
export default User;