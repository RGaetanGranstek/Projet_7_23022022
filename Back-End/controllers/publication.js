// importation du modele
const publication = require("../models/publication");
// importation de fs de node pour file system pour avoir accés aux différentes opérations du système de fichier
const fs = require("fs");

// Ici la logique pour chaque fonction

// Pour la création d'objet
exports.createPublication = (req, res, next) => {
  // chaine de caractére sous forme javascript req.body.publication
  const publicationObject = JSON.parse(req.body.publication);
  // ont enléve l'id car mongoDB en génére un de lui même
  delete publicationObject._id;
  const publication = new publication({
    // permet de récupérer tous les champs du corp de la requête
    ...publicationObject,
    // ont génére une URL de l'image
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  // save dans la base de donnée
  publication
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// modifier un objet existant dans la base de donnée
exports.modifyPublication = (req, res, next) => {
  // permet de savoir si image existante ou si nouvelle
  const publicationObject = req.file
    ? {
        ...JSON.parse(req.body.publication),
        // ont génére une URL de l'image
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }; // si il n'existe pas on fait une copie de req.body
  publication
    .updateOne(
      { _id: req.params.id },
      { ...publicationObject, _id: req.params.id }
    )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// supprimer un objet existant dans la base de donnée
exports.deletePublication = (req, res, next) => {
  //ont trouve l'objet dans la base de donnée
  publication
    .findOne({ _id: req.params.id })
    .then((publication) => {
      // ont récupère le nom du fichier à supprimer
      const filename = publication.imageUrl.split("/images/")[1];
      // ont supprime l'objet
      fs.unlink(`images/${filename}`, () => {
        // ont renvoi une réponse si fonctionne ou non
        publication
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// :id <= parti de la route dynamique pour une recherche à l'unité dans la base de donnée
exports.getOnePublication = (req, res, next) => {
  // findOne pour trouver qu'un seul objet
  publication
    .findOne({ _id: req.params.id })
    .then((publication) => res.status(200).json(publication))
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllPublication = (req, res, next) => {
  // find pour trouver tous les objets
  publication
    .find()
    // récupération du tableau de tous les publications, et ont renvoi le tableau reçu par le Back-End (base de donnée)
    .then((publications) => res.status(200).json(publications))
    .catch((error) => res.status(500).json({ error }));
};

//Incrémentation des likes et dislikes utilisateur pour les publications
exports.likeDislikePublication = (req, res, next) => {
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
      publication
        .findOne({ _id: id })
        .then((publication) => {
          if (publication.usersLiked.includes(userId)) {
            publication
              .updateOne(
                { _id: id },
                // Décrémentation d'un like et d'un utilisateur
                { $inc: { likes: -1 }, $pull: { usersLiked: userId } }
              )
              .then(() => {
                res.status(201).json({
                  message: `Le vote pour la publication: ${publication.name} n'est plus pris en compte`,
                });
              })
              .catch((error) => res.status(400).json({ error }));
          }
          if (publication.usersDisliked.includes(userId)) {
            publication
              .updateOne(
                { _id: id },
                // Décrémentation d'un like et d'un utilisateur
                { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } }
              )
              .then(() => {
                res.status(201).json({
                  message: `Le vote pour la publication: ${publication.name} n'est plus pris en compte`,
                });
              })
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
      break;
    // L'utilisateur aime la publication
    case 1:
      publication
        .updateOne(
          { _id: id },
          // Incrémentation d'un like et d'un utilisateur
          { $inc: { likes: 1 }, $push: { usersLiked: userId } }
        )
        .then(() =>
          res.status(201).json({ message: `Vous aimez cette publication !` })
        )
        .catch((error) => res.status(500).json({ error }));
      break;
    // L'utilisateur n'aime pas la publication
    case -1:
      publication
        .updateOne(
          { _id: id },
          // Incrémentation d'un like et d'un utilisateur
          { $inc: { dislikes: 1 }, $push: { usersDisliked: userId } }
        )
        .then(() =>
          res
            .status(201)
            .json({ message: `Vous n'aimez pas cette publication !` })
        )
        .catch((error) => res.status(500).json({ error }));
      break;
  }
};
