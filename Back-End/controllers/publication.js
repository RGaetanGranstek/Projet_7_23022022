// importation du model
let db = require("../models")
const Publication = db.Publication
const Commentaire = db.Commentaire
const User = db.User
// importation de fs de node pour file system pour avoir accés aux différentes opérations du système de fichier
const fs = require("fs");

// Ici la logique pour chaque fonction

// Pour la création d'objet
exports.createPublication = (req, res, next) => {
  let newImageUrl = "";
  if (req.file) { newImageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` };
  const publication = {
    utilisateur_id: req.body.utilisateur_id,
    titre: req.body.titre,
    message: req.body.message,
    imageUrl: newImageUrl,
  };
  console.log(publication)
  // save dans la base de donnée
  Publication.create(publication)
    .then(() => res.status(201).json({ message: "Publication créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

// modifier un objet existant dans la base de donnée
exports.modifyPublication = (req, res, next) => {
  const _id = req.params.id;
  console.log(req.body.userId);
  // permet de savoir si image existante ou si nouvelle
  const publicationImage = req.file
    ? {
      ...JSON.parse(req.body.userId),
      // ont génére une URL de l'image
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
        }`,
    }
    : { ...req.body }; // si il n'existe pas on fait une copie de req.body
  Publication.update(
    { ...publicationImage }, { where: { id: _id } }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// supprimer un objet existant dans la base de donnée
exports.deletePublication = (req, res, next) => {
  //ont trouve l'objet dans la base de donnée
  const _id = req.params.id;
  Publication.findByPk(_id)
    .then((publication) => {
      if (publication.imageUrl === null) {
        Publication.destroy({
          where: { id: _id },
        })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        // ont récupère le nom du fichier à supprimer
        const filename = publication.imageUrl.split("/images/")[1];
        // ont supprime l'objet
        fs.unlink(`images/${filename}`, () => {
          // ont renvoi une réponse si fonctionne ou non
          Publication.destroy({
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
exports.getOnePublication = (req, res, next) => {
  const _id = req.params.id;
  // findOne pour trouver qu'un seul objet
  Publication.findOne({
    where: {
      //Cible l'id de l'objet à afficher
      id: _id,
    },
    include: [
      { model: User, required: true, attributes: ['nom', 'prenom', 'pseudo', 'imageUrl'] },
      { model: Commentaire, required: false, include: [{ model: User, attributes: ['nom', 'prenom', 'pseudo', 'imageUrl'] }] }]
  })
    .then((publication) => res.status(200).json(publication))
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllPublication = (req, res, next) => {
  // findByPk pour trouver tous les objets
  Publication.findAll({
    order: [
      ['id', 'DESC'],
    ],
    include: [
      { model: User, required: true, attributes: ['nom', 'prenom', 'pseudo', 'imageUrl'] },
      { model: Commentaire, required: false, include: [{ model: User, attributes: ['nom', 'prenom', 'pseudo', 'imageUrl'] }] }]
  })
    // récupération du tableau de tous les publications, et ont renvoi le tableau reçu par le Back-End (base de donnée)
    .then((publications) => res.status(200).json(publications))
    .catch((error) => res.status(500).json({ error }));
};