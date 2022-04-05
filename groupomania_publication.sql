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
-- Table structure for table `publication`
--

DROP TABLE IF EXISTS `publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publication` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(150) NOT NULL,
  `message` text,
  `utilisateur_id` int NOT NULL,
  `imageUrl` text,
  PRIMARY KEY (`id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  CONSTRAINT `publication_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publication`
--

LOCK TABLES `publication` WRITE;
/*!40000 ALTER TABLE `publication` DISABLE KEYS */;
INSERT INTO `publication` VALUES (14,'Bonjour et bienvenue','Notre entreprise, spécialisée dans la grande distribution,\r\nest en pleine expansion.\r\nNous avons actuellement plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années.\r\nNous étions uniquement 300 il y a 3 ans.',1,''),(15,'Salut tous le monde','je me présente, \r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus augue a pretium venenatis. Pellentesque fringilla a leo nec ultricies. Morbi et nunc non nisl tempor pulvinar in in eros. Vestibulum erat nisi, iaculis sit amet aliquam sit amet, ornare quis ligula. Maecenas vel ligula nec magna maximus auctor. Cras vitae urna vehicula, semper nibh et, semper leo. Aenean nec ultricies tellus. Nunc at suscipit ligula. Suspendisse iaculis mauris mi.',2,''),(16,'Projet repas d\'entreprise','Bonjour à tous(tes)\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor iaculis consequat. Fusce massa metus, scelerisque non neque ac, varius aliquam lorem. Mauris luctus, mi at egestas convallis, leo sapien interdum leo, sit amet vestibulum nisl felis nec libero. Suspendisse pharetra, mauris nec mollis molestie, diam tortor mollis elit, a vulputate tortor velit et dui. Vivamus nec magna urna. Suspendisse quis nisi consequat, tristique urna non, convallis nisi. Sed semper nisi at condimentum volutpat. Suspendisse et tempus lorem, at accumsan felis. Cras tempus et magna eu luctus. Nullam tempor nunc non dapibus porta. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\r\n\r\nNullam finibus enim sit amet risus laoreet, ut consectetur odio porta. Aenean vitae venenatis nibh. Nunc in tempor enim, sit amet ornare tortor. Maecenas pretium porttitor elementum. Aliquam quis ullamcorper neque. Nunc vel nisi nisl. Fusce vitae elit et orci luctus semper. Nulla sollicitudin, ante eget viverra vulputate, ex lacus egestas lorem, sed blandit neque lectus eu leo. Curabitur efficitur finibus metus et porta. Phasellus aliquam volutpat nisi, in blandit sem sodales nec. Curabitur congue nibh eleifend nisi dapibus, sit amet porta velit porttitor. Curabitur id est quis metus condimentum lobortis.',4,''),(17,'je pense que...','Maecenas in ex quis enim feugiat pretium dignissim hendrerit felis. Donec rhoncus velit arcu, auctor semper nunc placerat in. Quisque sapien arcu, gravida eu lorem pharetra, feugiat dignissim ante. Proin nec lobortis lacus, vitae auctor ipsum. Aliquam erat volutpat. Maecenas fermentum dictum ipsum quis tincidunt. Curabitur tempus condimentum elit, a vulputate lectus dignissim vel. Praesent dictum eget dolor at semper. Fusce tincidunt suscipit pulvinar. Duis imperdiet vulputate viverra.',4,'http://localhost:3000/images/lake-g61562ddd9_1920.jpg1648550058174.jpg'),(18,'Informations','Bonjour tous le monde, \r\n\r\nVivamus vehicula ante eu ultrices vestibulum.\r\nEtiam eleifend ex egestas, imperdiet turpis non, tempor velit.\r\nSuspendisse euismod risus at erat pretium sollicitudin.\r\nUt vulputate nisi ut ipsum porttitor tincidunt.\r\nCras fringilla ipsum feugiat, venenatis tellus sit amet, mattis libero.',2,'http://localhost:3000/images/school-gefa69da44_1920.jpg1648552331016.jpg');
/*!40000 ALTER TABLE `publication` ENABLE KEYS */;
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
