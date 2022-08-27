//permet de cree un model de donnée dans notre base de donne mongoose
const mongoose = require('mongoose');

// Création du model de Sauce pour le stockage dans la base de données
const sauceSchema = mongoose.Schema({ //schema mis a disposition avec le package mongoose
    userId: { type: String, required: true }, // require true qui signifit que c'est un champs requis dans la base
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

module.exports = mongoose.model('Sauce', sauceSchema); //La méthode  model  transforme ce modèle en un modèle utilisable