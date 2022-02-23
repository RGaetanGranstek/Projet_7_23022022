// création d'un routeur
const express = require("express");
const router = express.Router();
// importation du controllers
const commentaireControllers = require("../controllers/commentaire");
// importation du auth (login)
const auth = require("../middleware/auth");
// importation de multer
const multer = require("../middleware/multer-config");

// logique de création d'objet + protection d'une route (auth)
// multer aprés auth pour assurer l'authentification avant toute modification de l'image
router.post("/", auth, multer, commentaireControllers.createCommentaire);
router.post("/:id/like", auth, commentaireControllers.likeDislikeCommentaire);

// modifier un objet existant dans la base de donnée
router.put("/:id", auth, multer, commentaireControllers.modifyCommentaire);

// supprimer un objet existant dans la base de donnée
router.delete("/:id", auth, commentaireControllers.deleteCommentaire);

// :id <= parti de la route dynamique pour une recherche à l'unité dans la base de donnée
router.get("/:id", auth, commentaireControllers.getOneCommentaire);
// pour trouver tous les objets
router.get("/", auth, commentaireControllers.getAllCommentaire);

module.exports = router;
