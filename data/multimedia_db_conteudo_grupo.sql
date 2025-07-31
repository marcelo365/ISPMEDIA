-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: multimedia_db
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `conteudo_grupo`
--

DROP TABLE IF EXISTS `conteudo_grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conteudo_grupo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_grupo` int NOT NULL,
  `id_musica` int DEFAULT NULL,
  `id_utilizador` int NOT NULL,
  `id_video` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2fal95plvro4odyhee8xjmymt` (`id_grupo`),
  KEY `FKpp7qu9epeqpa33oyrlytxp25` (`id_musica`),
  KEY `FK8nydd1vixh1mjxe3xg8gfsrnq` (`id_utilizador`),
  KEY `FKa0copbitrhb2edwkhtmw9raln` (`id_video`),
  CONSTRAINT `FK2fal95plvro4odyhee8xjmymt` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`),
  CONSTRAINT `FK8nydd1vixh1mjxe3xg8gfsrnq` FOREIGN KEY (`id_utilizador`) REFERENCES `utilizador` (`id`),
  CONSTRAINT `FKa0copbitrhb2edwkhtmw9raln` FOREIGN KEY (`id_video`) REFERENCES `video` (`id`),
  CONSTRAINT `FKpp7qu9epeqpa33oyrlytxp25` FOREIGN KEY (`id_musica`) REFERENCES `musica` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conteudo_grupo`
--

LOCK TABLES `conteudo_grupo` WRITE;
/*!40000 ALTER TABLE `conteudo_grupo` DISABLE KEYS */;
INSERT INTO `conteudo_grupo` VALUES (1,1,1,2,NULL),(2,1,2,2,NULL),(3,1,3,2,NULL),(4,1,4,2,NULL),(5,1,5,2,NULL),(6,1,6,2,NULL),(7,1,7,2,NULL),(8,1,8,2,NULL),(9,1,NULL,2,1),(23,1,28,4,NULL),(24,1,NULL,4,2),(25,1,NULL,1,5),(26,1,29,4,NULL),(28,1,32,4,NULL),(29,1,NULL,1,6),(30,6,34,5,NULL),(31,1,35,4,NULL);
/*!40000 ALTER TABLE `conteudo_grupo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-14  5:25:01
