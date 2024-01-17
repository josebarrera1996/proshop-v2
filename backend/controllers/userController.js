// Importamos asyncHandler, un middleware personalizado para manejar excepciones en controladores asíncronos
import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userModel.js';

// @desc    Autenticar usuario (login)
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    // Extrae email y password del cuerpo de la petición
    const { email, password } = req.body;

    // Busca un usuario en la base de datos por email
    // Utiliza el modelo User para consultar a la base de datos de MongoDB
    const user = await User.findOne({ email });

    // Verifica si se encontró un usuario y si la contraseña es correcta
    if (user && (await user.matchPassword(password))) {
        // Si la autenticación es exitosa, responde con los datos del usuario (sin incluir la contraseña)
        res.json({
            _id: user._id, // ID del usuario
            name: user.name, // Nombre del usuario
            email: user.email, // Email del usuario
            isAdmin: user.isAdmin, // Indica si el usuario es administrador
        });
    } else {
        // Si la autenticación falla, responde con un error 401 (No Autorizado)
        res.status(401);
        // Estrategia recomendada de no indicarle al usuario cuál es la falla, si es la password o el email
        // Es más seguro esto porque puede haber usuarios que se fijen que emails están o no registrados.
        throw new Error('Invalid email or password');
    }
});

// @desc    Registrar un nuevo usuario
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('register user');
});

// @desc Deslogear usuario / limpiar la cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user');
})

// @desc    Obtener el perfil del usuario
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile');
});

// @desc    Actualizar el perfil del usuario
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile');
});

// @desc    Obtener todos los usuarios
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});

// @desc    Eliminar usuario
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

// @desc    Obtener usuario por ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

// @desc    Actualizar usuario
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
});

// Exportando los métodos
export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};