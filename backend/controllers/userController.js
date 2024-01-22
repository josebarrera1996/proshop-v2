// Importando jwt para trabajar con la autenticación
import jwt from 'jsonwebtoken';
// Importamos asyncHandler, un middleware personalizado para manejar excepciones en controladores asíncronos
import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

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
        // Genera y establece un token JWT como cookie para la autenticación del usuario
        generateToken(res, user._id);

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
    // Extrae los datos del cuerpo de la petición
    const { name, email, password } = req.body;

    // Verifica si ya existe un usuario con el mismo correo electrónico
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400); // Código de respuesta 400 (Bad Request)
        throw new Error('User already exists'); // Lanza un error indicando que el usuario ya existe
    }

    // Crea un nuevo usuario utilizando el modelo User y los datos proporcionados
    const user = await User.create({
        name,
        email,
        password,
    });

    // Verifica si el usuario se ha creado exitosamente
    if (user) {
        // Genera y establece un token JWT como cookie para la autenticación del usuario
        generateToken(res, user._id);

        // Responde con los detalles del usuario recién creado
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400); // Código de respuesta 400 (Bad Request)
        throw new Error('Invalid user data'); // Lanza un error indicando que los datos del usuario son inválidos
    }
});

// @desc Deslogear usuario / limpiar la cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = (req, res) => {
    // Limpia la cookie 'jwt' al establecer su valor como una cadena vacía y configurando las opciones
    res.cookie('jwt', '', {
        httpOnly: true, // La cookie solo es accesible a través de HTTP y no a través de JavaScript del lado del cliente
        expires: new Date(0), // Establece la fecha de expiración en el pasado para eliminar la cookie
    });

    // Responde con un estado 200 (Éxito) y un mensaje indicando que se cerró sesión correctamente
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Obtener el perfil del usuario
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    // Busca al usuario por su ID en la base de datos
    const user = await User.findById(req.user._id);

    // Verifica si se encontró al usuario
    if (user) {
        // Responde con los detalles del perfil del usuario (sin incluir la contraseña)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404); // Código de respuesta 404 (Not Found)
        throw new Error('User not found'); // Lanza un error indicando que el usuario no fue encontrado
    }
});

// @desc    Actualizar el perfil del usuario
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    // Busca al usuario por su ID en la base de datos
    const user = await User.findById(req.user._id);

    // Verifica si se encontró al usuario
    if (user) {
        // Actualiza el nombre y el correo electrónico del usuario con los valores proporcionados en el cuerpo de la solicitud
        // O preservar los que ya estaban (si no se los modificó)
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // Actualiza la contraseña del usuario si se proporciona en el cuerpo de la solicitud
        if (req.body.password) {
            user.password = req.body.password;
        }

        // Guarda los cambios en la base de datos y obtiene el usuario actualizado
        const updatedUser = await user.save();

        // Responde con los detalles actualizados del perfil del usuario (sin incluir la contraseña)
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404); // Código de respuesta 404 (Not Found)
        throw new Error('User not found'); // Lanza un error indicando que el usuario no fue encontrado
    }
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