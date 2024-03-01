import path from 'path';
import express from 'express';
import multer from 'multer';

// Creación de un router de Express
const router = express.Router();

// Configuración del almacenamiento para Multer
const storage = multer.diskStorage({
    // Directorio de destino para guardar archivos subidos
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    // Generación del nombre de archivo
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); 
    },
});

// Función para verificar el tipo de archivo permitido
function checkFileType(file, cb) {
    // Tipos de archivo permitidos (jpg, jpeg, png)
    const filetypes = /jpg|jpeg|png/;
    // Verifica la extensión y el tipo MIME del archivo
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    // Llama al callback con el resultado de la verificación
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb({ message: 'Images only!' });
    }
}

// Configuración de Multer con la función de almacenamiento y verificación de tipo de archivo
const upload = multer({
    storage,
});

// Ruta para manejar la subida de imágenes mediante POST
router.post('/', upload.single('image'), (req, res) => {
    // Envía una respuesta con un mensaje de éxito y la ruta de la imagen subida
    res.send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`,
    });
});

// Exporta el router configurado
export default router;
