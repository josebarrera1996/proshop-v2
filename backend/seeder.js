// Dependencias necesarias
import dotenv from 'dotenv';
import colors from 'colors';
// Datos de ejemplos
import users from './data/users.js';
import products from './data/products.js';
// Modelos
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
// Conexión
import connectDB from './config/db.js';

// Configurando dotenv para acceder a las variables de entorno
dotenv.config();

// Implementando la conexión con la B.D
connectDB();

// Función asíncrona para importar datos a la base de datos
const importData = async () => {
    try {
        // Limpieza de la base de datos eliminando registros existentes
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Inserción de usuarios de ejemplo y guardado de los usuarios creados
        const createdUsers = await User.insertMany(users);

        // Obtención del ID del usuario administrador asumiendo que es el primer usuario en el array
        const adminUser = createdUsers[0]._id;

        // Añadiendo la referencia del administrador a los productos de ejemplo
        // Esto indica que es este usuario el que los creó
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // Inserción de los productos con la referencia al administrador en la base de datos
        await Product.insertMany(sampleProducts);

        // Mensaje de éxito en la consola
        console.log('Data Imported!'.green.inverse);
        process.exit(); // Salida del proceso con éxito
    } catch (error) {
        // Manejo de errores en caso de que algo falle
        console.error(`${error}`.red.inverse);
        process.exit(1); // Salida del proceso con un código de error
    }
};

// Función asíncrona para destruir los datos en la base de datos
const destroyData = async () => {
    try {
        // Eliminación de todos los registros de las colecciones
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Mensaje de éxito en la consola
        console.log('Data Destroyed!'.red.inverse);
        process.exit(); // Salida del proceso con éxito
    } catch (error) {
        // Manejo de errores en caso de que algo falle
        console.error(`${error}`.red.inverse);
        process.exit(1); // Salida del proceso con un código de error
    }
};

// Comprobación de argumentos de la línea de comandos para determinar el comportamiento
if (process.argv[2] === '-d') {
    // Si se pasa el argumento '-d', se destruyen los datos
    destroyData();
} else {
    // De lo contrario, se importan los datos
    importData();
}
