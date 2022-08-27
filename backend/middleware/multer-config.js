// Utilisation de multer(package de gestion de fichier) pour enregistrer les fichiers images
const multer = require('multer');

// Modification de l'extension des fichiers
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
// storage=multer.diskStorage a pour but indiquer au multer ou enregistrer les fichiers
const storage = multer.diskStorage({
    // Enregistrement dans le dossier 'images'
    destination: (req, file, callback) => {
        callback(null, 'images') //callback ''null'' signifie qu'il n'y a pas eu d'erreur
    },
    // Génération du nom du fichier : nom d'origine + numero unique + . + extension (il s'agit simplement d'une structure clasique d'un fichier)
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');//dans plusieur os pour gerer les 'white space' dans les fichier, lier split et .joint pour mettre _ à la place de l'espace 
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');