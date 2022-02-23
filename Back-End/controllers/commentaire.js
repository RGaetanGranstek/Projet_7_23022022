// importation du modele
const commentaire = require("../models/commentaire");
// importation de fs de node pour file system pour avoir accés aux différentes opérations du système de fichier
const fs = require("fs");

// Ici la logique pour chaque fonction

// Pour la création d'objet
exports.createcommentaire = (req, res, next) => {
  // chaine de caractére sous forme javascript req.body.commentaire
  const commentaireObject = JSON.parse(req.body.commentaire);
  // ont enléve l'id car mongoDB en génére un de lui même
  delete commentaireObject._id;
  const commentaire = new commentaire({
    // permet de récupérer tous les champs du corp de la requête
    ...commentaireObject,
    // ont génére une URL de l'image
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  // save dans la base de donnée MongoDB
  commentaire
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// modifier un objet existant dans la base de donnée
exports.modifycommentaire = (req, res, next) => {
  // permet de savoir si image existante ou si nouvelle
  const commentaireObject = req.file
    ? {
        ...JSON.parse(req.body.commentaire),
        // ont génére une URL de l'image
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }; // si il n'existe pas on fait une copie de req.body
  commentaire
    .updateOne(
      { _id: req.params.id },
      { ...commentaireObject, _id: req.params.id }
    )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// supprimer un objet existant dans la base de donnée
exports.deletecommentaire = (req, res, next) => {
  //ont trouve l'objet dans la base de donnée
  commentaire
    .findOne({ _id: req.params.id })
    .then((commentaire) => {
      // ont récupère le nom du fichier à supprimer
      const filename = commentaire.imageUrl.split("/images/")[1];
      // ont supprime l'objet
      fs.unlink(`images/${filename}`, () => {
        // ont renvoi une réponse si fonctionne ou non
        commentaire
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// :id <= parti de la route dynamique pour une recherche à l'unité dans la base de donnée
exports.getOnecommentaire = (req, res, next) => {
  // findOne pour trouver qu'un seul objet
  commentaire
    .findOne({ _id: req.params.id })
    .then((commentaire) => res.status(200).json(commentaire))
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllcommentaire = (req, res, next) => {
  // find pour trouver tous les objets
  commentaire
    .find()
    // récupération du tableau de tous les commentaires, et ont renvoi le tableau reçu par le Back-End (base de donnée)
    .then((commentaires) => res.status(200).json(commentaires))
    .catch((error) => res.status(500).json({ error }));
};

//Incrémentation des likes et dislikes utilisateur pour les commentaires
exports.likeDislikecommentaire = (req, res, next) => {
  if (req.body.like === undefined || req.body.userId === undefined) {
    return res.status(400).json({ message: "Bad request !" });
  }
  const id = req.params.id;
  const like = req.body.like;
  const userId = req.body.userId;
  console.log(req.body);

  switch (like) {
    // Décrémentation d'un like et d'un utilisateur
    case 0:
      commentaire
        .findOne({ _id: id })
        .then((commentaire) => {
          if (commentaire.usersLiked.includes(userId)) {
            commentaire
              .updateOne(
                { _id: id },
                // Décrémentation d'un like et d'un utilisateur
                { $inc: { likes: -1 }, $pull: { usersLiked: userId } }
              )
              .then(() => {
                res.status(201).json({
                  message: `Le vote pour la commentaire: ${commentaire.name} n'est plus pris en compte`,
                });
              })
              .catch((error) => res.status(400).json({ error }));
          }
          if (commentaire.usersDisliked.includes(userId)) {
            commentaire
              .updateOne(
                { _id: id },
                // Décrémentation d'un like et d'un utilisateur
                { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } }
              )
              .then(() => {
                res.status(201).json({
                  message: `Le vote pour la commentaire: ${commentaire.name} n'est plus pris en compte`,
                });
              })
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
      break;
    // L'utilisateur aime la commentaire
    case 1:
      commentaire
        .updateOne(
          { _id: id },
          // Incrémentation d'un like et d'un utilisateur
          { $inc: { likes: 1 }, $push: { usersLiked: userId } }
        )
        .then(() =>
          res.status(201).json({ message: `Vous aimez cette commentaire !` })
        )
        .catch((error) => res.status(500).json({ error }));
      break;
    // L'utilisateur n'aime pas la commentaire
    case -1:
      commentaire
        .updateOne(
          { _id: id },
          // Incrémentation d'un like et d'un utilisateur
          { $inc: { dislikes: 1 }, $push: { usersDisliked: userId } }
        )
        .then(() =>
          res
            .status(201)
            .json({ message: `Vous n'aimez pas cette commentaire !` })
        )
        .catch((error) => res.status(500).json({ error }));
      break;
  }
};
