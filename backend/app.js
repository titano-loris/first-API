require('dotenv').config()
console.log(process.env) // a retirer une fois qu'il fonctionne
var validator = require('validator');//permet de s'assurer que le mot de passe de l'utilisateur est correct
const express = require('express');// install express
const bp = require('body-parser')// npm package pour afficher le corp de la requete
const mongoose = require('mongoose');
const app = express();


const rateLimit = require('express-rate-limit') // utiliser pour limité le surnombre de requete et evité des attaques de DOS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite 100 requete utilisateur pendant les 15 minutes
  standardHeaders: true, // retourne l'info de la ratelimit 
  legacyHeaders: false, // desactive la rate limite si la limite de 100 depasser
})
app.use(limiter)

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


app.use(bp.json()) //transforme le text json et JS
app.use(bp.urlencoded({ extended: true }))// la meme chose pour la requete URL "true" précise que le body contien d'autre elem que des
//parametrage du cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');//accee api depuis n'importe quelle origine '*'
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//ajoute les header mentionner au requete vers API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//methode de requette http
  next();
});

//import du code depuis mondodb pour liee la base de donnée
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://api-hot-ones:api-hot@cluster0.6sp4d.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  console.log(err)
  if (err) {
    console.log("erreur de connection mongodb")
  } else {
    console.log("connection mongodb reussi")
  }
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use(bodyParser.json());

// Enregistrement des routeurs
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);




module.exports = app;