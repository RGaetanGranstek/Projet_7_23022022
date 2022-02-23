// création d'un routeur
const express = require("express");
const router = express.Router();
// importation du controllers
const publicationControllers = require("../controllers/publication");
// importation du auth (login)
const auth = require("../middleware/auth");
// importation de multer
const multer = require("../middleware/multer-config");

// logique de création d'objet + protection d'une route (auth)
// multer aprés auth pour assurer l'authentification avant toute modification de l'image
router.post("/", auth, multer, publicationControllers.createPublication);
router.post("/:id/like", auth, publicationControllers.likeDislikePublication);

// modifier un objet existant dans la base de donnée
router.put("/:id", auth, multer, publicationControllers.modifyPublication);

// supprimer un objet existant dans la base de donnée
router.delete("/:id", auth, publicationControllers.deletePublication);

// :id <= parti de la route dynamique pour une recherche à l'unité dans la base de donnée
router.get("/:id", auth, publicationControllers.getOnePublication);
// pour trouver tous les objets
router.get("/", auth, publicationControllers.getAllPublication);

module.exports = router;
