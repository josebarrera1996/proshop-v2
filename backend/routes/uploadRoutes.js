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

// Función de filtrado de archivos aceptados
function fileFilter(req, file, cb) {
    // Definir los tipos de archivo permitidos mediante expresiones regulares
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    // Verificar si la extensión del archivo cumple con los tipos permitidos
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Verificar si el tipo MIME del archivo cumple con los tipos permitidos
    const mimetype = mimetypes.test(file.mimetype);

    // Si tanto la extensión como el tipo MIME son válidos, llamar al callback con 'null' y 'true'
    if (extname && mimetype) {
        cb(null, true);
    } else {
        // Si el archivo no cumple con los criterios, llamar al callback con un error y 'false'
        cb(new Error('Images only!'), false);
    }
}

// Configuración de multer con el almacenamiento y el filtro
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

// Ruta para manejar la subida de imágenes mediante POST
router.post('/', (req, res) => {
    // Ejecuta la subida de una sola imagen
    uploadSingleImage(req, res, function (err) {
        if (err) {
            // Si hay un error, envía un mensaje de error con el estado 400
            res.status(400).send({ message: err.message });
        }

        // Si la subida es exitosa, envía un mensaje de éxito con la URL de la imagen
        res.status(200).send({
            message: 'Image uploaded successfully',
            image: `/${req.file.path}`,
        });
    });
});

// Exporta el router configurado
export default router;
