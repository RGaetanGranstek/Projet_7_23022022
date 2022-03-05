// importation du model
const Commentaire = require("../models/commentaire");
// importation de fs de node pour file system pour avoir accés aux différentes opérations du système de fichier
const fs = require("fs");

// Ici la logique pour chaque fonction

// Pour la création d'objet
exports.createCommentaire = (req, res, next) => {
  const commentaire = {
    message: req.body.message,
    utilisateur_id: req.body.utilisateur_id,
    publication_id: req.body.publication_id,
    imageUrl: req.body.imageUrl,
    // imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  };
  // save dans la base de donnée
  Commentaire.create(commentaire)
    .then(() => res.status(201).json({ message: "Commentaire créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

// modifier un objet existant dans la base de donnée
exports.modifyCommentaire = (req, res, next) => {
  const _id = req.params.id;
  Commentaire.update(req.body, {
    where: { id: _id },
  })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// supprimer un objet existant dans la base de donnée
exports.deleteCommentaire = (req, res, next) => {
  //ont trouve l'objet dans la base de donnée
  const _id = req.params.id;
  Commentaire.findByPk(_id)
    .then((commentaire) => {
      // ont récupère le nom du fichier à supprimer
      const filename = commentaire.image.split("/images/")[1];
      // ont supprime l'objet
      // console.log(_id);
      // console.log(filename);
      fs.unlink(`images/${filename}`, () => {
        // ont renvoi une réponse si fonctionne ou non
        Commentaire.destroy({
          where: { id: _id },
        })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// :id <= parti de la route dynamique pour une recherche à l'unité dans la base de donnée
exports.getOneCommentaire = (req, res, next) => {
  const _id = req.params.id;
  // findByPk pour trouver qu'un seul objet
  Commentaire.findByPk(_id)
    .then((commentaire) => res.status(200).json(commentaire))
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllCommentaire = (req, res, next) => {
  const _id = req.params.id;
  // findByPk pour trouver qu'un seul objet
  Commentaire.findAll(_id)
    // récupération du tableau de tous les commentaires, et ont renvoi le tableau reçu par le Back-End (base de donnée)
    .then((commentaires) => res.status(200).json(commentaires))
    .catch((error) => res.status(500).json({ error }));
};

//
//
//
//Incrémentation des likes et dislikes utilisateur pour les commentaires
// exports.likeDislikeCommentaire = (req, res, next) => {
//   if (req.body.like === undefined || req.body.utilisateur_id === undefined) {
//     return res.status(401).json({ message: "Bad request !" });
//   }
//   const _id = req.params.id;
//   const like = req.body.like;
//   const utilisateur_id = req.body.utilisateur_id;
//   console.log(req.body);
//   console.log(like);

//   switch (like) {
//     // Décrémentation d'un like et d'un utilisateur
//     case 0:
//       // findByPk pour trouver qu'un seul objet
//       Commentaire.findByPk(_id)
//         .then((commentaire) => {
//           if (commentaire.usersLiked.includes(utilisateur_id)) {
//             Commentaire.update(
//               req.body,
//               {
//                 where: { id: _id },
//               },
//               // Décrémentation d'un like et d'un utilisateur
//               { $inc: { likes: -1 }, $pull: { usersLiked: utilisateur_id } }
//             )
//               .then(() => {
//                 res.status(201).json({
//                   message: `Le vote pour la commentaire: ${commentaire.titre} n'est plus pris en compte`,
//                 });
//               })
//               .catch((error) => res.status(402).json({ error }));
//           }
//           if (commentaire.usersDisliked.includes(utilisateur_id)) {
//             Commentaire.update(
//               req.body,
//               {
//                 where: { id: _id },
//               },
//               // Décrémentation d'un like et d'un utilisateur
//               {
//                 $inc: { dislikes: -1 },
//                 $pull: { usersDisliked: utilisateur_id },
//               }
//             )
//               .then(() => {
//                 res.status(201).json({
//                   message: `Le vote pour la commentaire: ${commentaire.titre} n'est plus pris en compte`,
//                 });
//               })
//               .catch((error) => res.status(403).json({ error }));
//           }
//         })
//         .catch((error) => {
//           return res.status(500).json({ error });
//         });
//       break;
//     // L'utilisateur aime la commentaire
//     case 1:
//       Commentaire.update(
//         req.body,
//         {
//           where: { id: _id },
//         },
//         // Incrémentation d'un like et d'un utilisateur
//         { $inc: { likes: 1 }, $push: { usersLiked: utilisateur_id } }
//       )
//         .then(() =>
//           res.status(201).json({ message: `Vous aimez cette commentaire !` })
//         )
//         .catch((error) => res.status(500).json({ error }));
//       break;
//     // L'utilisateur n'aime pas la commentaire
//     case -1:
//       Commentaire.update(
//         req.body,
//         {
//           where: { id: _id },
//         },
//         // Incrémentation d'un like et d'un utilisateur
//         { $inc: { dislikes: 1 }, $push: { usersDisliked: utilisateur_id } }
//       )
//         .then(() =>
//           res
//             .status(201)
//             .json({ message: `Vous n'aimez pas cette commentaire !` })
//         )
//         .catch((error) => res.status(500).json({ error }));
//       break;
//   }
// };
