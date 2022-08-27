const User = require('../models/User');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Logiques métiers pour les utilisateurs
// Création de nouveaux utilisateurs (Post signup)
exports.signup = (req, res, next) => {
    // Hash du mot de passe avec bcrypt
    bcrypt.hash(req.body.password, 10)//passer le mot de passe du corp de la requete passer par le frontend, mettre 10 tour de solt pour le hashage
        .then(hash => { // il s'agit d'une methode asynchrone donc mettre un then et un catch

            // Création du nouvel utilisateur dans le hash du password
            const user = new User({
                email: req.body.email,
                password: hash
            })
            // Sauvegarde dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))// code 201 pour la creation de ressource
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Création de connexion d'utilisateur enregistré (Post login)
exports.login = (req, res, next) => {

    // Recherche d'un utilisateur dans la base de données
    User.findOne({ email: req.body.email })
        .then(user => {
            // Si on ne trouve pas l'utilisateur
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé ou Mot de passe incorrect !' })
            }
            // On compare le mot de passe de la requete avec celui de la base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Utilisateur non trouvé ou Mot de passe incorrect !' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        // Création d'un token pour sécuriser le compte de l'utilisateur
                        token: jwt.sign(          // sign de jsonwebtoken pour chiffrer un nouveau token. Ce token contient l'ID de l'utilisateur en tant que payload(les données encodées dans le token).
                            { userId: user._id },
                            'token-mystere',   //crypte le token en la remplacent pars une chaine aleatoire
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};