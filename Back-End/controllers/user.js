let db = require("../models")
const Publication = db.Publication
const Commentaire = db.Commentaire
const User = db.User
// model user
// const User = require("../models/user");
// package cryptage des mots de passe (hashage)
const bcrypt = require("bcrypt");
// création de token et permet aussi de les vérifier
const jwt = require("jsonwebtoken");
// maskdata est un module Node.js pour masquer différents types de données. Avec l’aide de maskdata, vous pouvez masquer l’e-mail, le numéro de téléphone, le numéro de carte, les champs JSON, le mot de passe, etc.
const MaskData = require("maskdata");
// mise en place d'un validateur de mot de passe + complexe
const passwordValidator = require("password-validator");
// importation de fs de node pour file system pour avoir accés aux différentes opérations du système de fichier
const fs = require("fs");

// Création d'un schema pour le mot de passe
const schema = new passwordValidator();
schema
  .is()
  .min(10) // longueur minimum 10
  .is()
  .max(100) // longueur maximum 100
  .has()
  .uppercase(1) // 1 majuscule minimum
  .has()
  .lowercase(1) // 1 minuscule minimum
  .has()
  .digits(2) // 2 chiffres minimum
  .has()
  .symbols(1) // 1 symbole minimum
  .has()
  .not()
  .spaces() // aucun espace
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist certain mdp défini

// utilisation des options de maskdata pour cacher l'email
const emailMask2Options = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 3,
  unmaskedEndCharactersAfterAt: 2,
  maskAtTheRate: false,
};

// middleware signup pour l'enregistrement des new utilisateur en cryptant le mot de passe
exports.signup = (req, res, next) => {
  if (!schema.validate(req.body.password)) {
    //Renvoie une erreur si le schema de mot de passe n'est pas respecté
    return res.status(400).json({
      message:
        "Le mot de passe doit contenir au moins 10 caractères, une majuscule, une minuscule, 2 chiffres, un symbole ainsi qu'aucun espace.",
    });
  }
  // hash (fonction asynchrome qui prend du temps) pour crypter
  // salt = 10, tour pour l'algorithme de hashage, suffisant pour un mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      // création d'un nouvel utilisateur avec le mot de passe crypté et email
      const user = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        pseudo: req.body.pseudo,
        email: req.body.email,
        // email: MaskData.maskEmail2(req.body.email, emailMask2Options),
        password: hash,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${process.env.imageUrlDefault
          }`,
      };
      // console.log(user);
      User.create(user).then(() =>
        res.status(201).json({ message: "Utilisateur créé !" })
      )
        .catch(() => res.status(503).json({ message: "Utilisateur existant !" }));
    })
  // .catch((error) => res.status(502).json({ error }));
};

//fonction login pour connecter les utilisateurs existants
exports.login = (req, res, next) => {
  // ont récupère l'utilisateur dans la base de donnée qui correspond à l'adresse email entrée par l'utilisateur
  User.findOne({
    where: {
      email: req.body.email,
      // email: MaskData.maskEmail2(req.body.email, emailMask2Options),
    },
  })
    .then((user) => {
      // si ont ne trouve pas de correspondance ont renvoi une erreur
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      // ont compare le mot de passe entré avec le hash enregistré dans la base de donnée
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // si la comparaison n'est pas bonne on renvoi une erreur
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          // si l'identification est bonne on renvoi le user._id attendu par le front-end et un token
          res.status(200).json({
            userId: user.id,
            role: user.role,
            token: jwt.sign(
              // donnée que l'ont veux encodé à l'intérieur du token
              { userId: user.id },
              // clé secrete pour l'encodage
              process.env.TOKEN,
              // argument de configuration (expiration 24H)
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(501).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// modifier un objet existant dans la base de donnée
exports.updateUtilisateur = (req, res, next) => {
  const _id = req.params.id;
  // console.log(_id);
  // console.log(req);
  console.log(req.body.userId);
  // permet de savoir si image existante ou si nouvelle
  const profilImage = req.file
    ? {
      ...JSON.parse(req.body.userId),
      // ont génére une URL de l'image
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
        }`,
    }
    : { ...req.body }; // si il n'existe pas on fait une copie de req.body}
  User.update(
    { ...profilImage }, { where: { id: _id } }
  )
    .then(() => res.status(200).json({ message: "Utilisateur modifié !" }))
    .catch((error) => res.status(505).json({ error }));
  console.log(User);
  console.log(profilImage);
};

//fonction delete pour supprimer un utilisateur existants de la base de donnée
exports.deleteUtilisateur = (req, res, next) => {
  const _id = req.params.id;
  User.findByPk(_id)
    .then((utilisateur) => {
      if (utilisateur.imageUrl === null) {
        User.destroy({
          where: { id: _id },
        })
          .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        // ont récupère le nom du fichier à supprimer
        const filename = utilisateur.imageUrl.split("/images/")[1];
        // ont supprime l'objet
        console.log(_id);
        console.log(filename);
        fs.unlink(`images/${filename}`, () => {
          // ont renvoi une réponse si fonctionne ou non
          User.destroy({
            where: { id: _id },
          })
            .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
            .catch((error) => res.status(400).json({ error }));

        })
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// recherche d'information utilisateur
exports.userProfil = (req, res, next) => {
  const _id = req.params.id;
  // console.log(_id);
  User.findOne({
    where: {
      //Cible l'id de l'objet à afficher
      id: _id,
    }
    , include: [
      { model: Publication, required: true },
      { model: Commentaire, required: true }]
  })
    .then((profil) => res.status(200).json(profil))
    .catch((error) => res.status(505).json({ error }));
};

// recherche d'information all utilisateur
exports.userProfilAll = (req, res, next) => {
  // console.log(_id);
  User.findAll({
    include: [
      { model: Publication, required: true },
      { model: Commentaire, required: true }]
  })
    .then((profil) => res.status(200).json(profil))
    .catch((error) => res.status(505).json({ error }));
};