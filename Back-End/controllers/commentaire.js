// importation du model
let db = require("../models")
const Publication = db.Publication
const Commentaire = db.Commentaire
const User = db.User
// importation de fs de node pour file system pour avoir accés aux différentes opérations du système de fichier
const fs = require("fs");

// Ici la logique pour chaque fonction

// Pour la création d'objet
exports.createCommentaire = (req, res, next) => {
  let newImageUrl = "";
  if (req.file) { newImageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` };
  const commentaire = {
    utilisateur_id: req.body.utilisateur_id,
    publication_id: req.body.publication_id,
    message: req.body.message,
    imageUrl: newImageUrl,
  };
  console.log(commentaire)
  // save dans la base de donnée
  Commentaire.create(commentaire)
    .then(() => res.status(201).json({ message: "Commentaire créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

// modifier un objet existant dans la base de donnée
exports.modifyCommentaire = (req, res, next) => {
  const _id = req.params.id;
  console.log(req.body.userId);
  // permet de savoir si image existante ou si nouvelle
  const commentaireImage = req.file
    ? {
      ...JSON.parse(req.body.userId),
      // ont génére une URL de l'image
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
        }`,
    }
    : { ...req.body }; // si il n'existe pas on fait une copie de req.body
  Commentaire.update(
    { ...commentaireImage }, { where: { id: _id } }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// supprimer un objet existant dans la base de donnée
exports.deleteCommentaire = (req, res, next) => {
  //ont trouve l'objet dans la base de donnée
  const _id = req.params.id;
  Commentaire.findByPk(_id)
    .then((commentaire) => {
      if (commentaire.imageUrl === null) {
        Commentaire.destroy({
          where: { id: _id },
        })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        // ont récupère le nom du fichier à supprimer
        const filename = commentaire.imageUrl.split("/images/")[1];
        // ont supprime l'objet
        fs.unlink(`images/${filename}`, () => {
          // ont renvoi une réponse si fonctionne ou non
          Commentaire.destroy({
            where: { id: _id },
          })
            .then(() => res.status(200).json({ message: "Objet supprimé !" }))
            .catch((error) => res.status(400).json({ error }));

        })
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// :id <= parti de la route dynamique pour une recherche à l'unité dans la base de donnée
exports.getOneCommentaire = (req, res, next) => {
  const _id = req.params.id;
  // findOne pour trouver qu'un seul objet
  Commentaire.findOne({
    where: {
      //Cible l'id de l'objet à afficher
      id: _id,
    }, include: [
      { model: Publication, required: true },
      { model: User, required: true, attributes: ['nom', 'prenom', 'pseudo', 'imageUrl'] }]
  })
    .then((commentaire) => res.status(200).json(commentaire))
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllCommentaire = (req, res, next) => {
  // findByPk pour trouver tous les objets
  Commentaire.findAll({
    include: [
      { model: Publication, required: true, },
      { model: User, required: true, attributes: ['nom', 'prenom', 'pseudo', 'imageUrl'] }]
  })
    // récupération du tableau de tous les commentaires, et ont renvoi le tableau reçu par le Back-End (base de donnée)
    .then((commentaires) => res.status(200).json(commentaires))
    .catch((error) => res.status(500).json({ error }));
};