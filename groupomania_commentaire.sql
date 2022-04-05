-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentaire` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text,
  `publication_id` int NOT NULL,
  `utilisateur_id` int NOT NULL,
  `imageUrl` text,
  PRIMARY KEY (`id`),
  KEY `publication_id` (`publication_id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`id`) ON DELETE CASCADE,
  CONSTRAINT `commentaire_ibfk_2` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaire`
--

LOCK TABLES `commentaire` WRITE;
/*!40000 ALTER TABLE `commentaire` DISABLE KEYS */;
INSERT INTO `commentaire` VALUES (12,'Bonjour et Merci pour l\'accueil !',14,2,''),(14,'Aussi n\'oublions pas ^^ Maecenas in ex quis enim feugiat pretium dignissim hendrerit felis. Donec rhoncus velit arcu, auctor semper nunc placerat in. Quisque sapien arcu, gravida eu lorem pharetra, feugiat dignissim ante. Proin nec lobortis lacus, vitae auctor ipsum. Aliquam erat volutpat. Maecenas fermentum dictum ipsum quis tincidunt. Curabitur tempus condimentum elit, a vulputate lectus dignissim vel. Praesent dictum eget dolor at semper. Fusce tincidunt suscipit pulvinar. Duis imperdiet vulputate viverra.',16,4,''),(15,'trèe jolie l\'endroit, c\'est une excellente idée, le lac offre une belle vue le soir',17,1,'http://localhost:3000/images/sunset-g8e38827c4_1920.jpg1648550258317.jpg'),(16,'tout à fait',16,1,''),(17,'',16,2,'http://localhost:3000/images/road-g34fcc3a89_1920.jpg1648552349168.jpg'),(19,'Nam eu luctus nulla. Phasellus et nisl at odio feugiat volutpat id et massa. In cursus libero eu bibendum imperdiet. Suspendisse ultrices viverra libero, at iaculis dolor hendrerit ac. Nulla imperdiet feugiat elementum. Etiam et elit quis ante vestibulum consectetur. Duis vitae turpis non lorem efficitur luctus. Nam pellentesque condimentum augue id consectetur. Praesent eget massa non dolor tristique egestas. Pellentesque pharetra fringilla arcu. Integer id lectus at lacus ultrices dictum et et purus. In a tortor urna. Suspendisse viverra nisi sed scelerisque ullamcorper. Aliquam hendrerit sollicitudin congue. Phasellus ante tortor, aliquam eu elit eget, ornare porttitor sem. Aliquam vitae leo ac magna ornare hendrerit nec non libero. Vestibulum porta pellentesque commodo. Morbi gravida porttitor neque, sed imperdiet felis malesuada accumsan. Maecenas nec pulvinar risus. Proin interdum nisi tincidunt elit aliquet sodales.',15,4,'');
/*!40000 ALTER TABLE `commentaire` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-05 10:37:13
