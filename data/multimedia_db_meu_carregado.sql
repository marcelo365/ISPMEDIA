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
-- Table structure for table `meu_carregado`
--

DROP TABLE IF EXISTS `meu_carregado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meu_carregado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vinculo_direto` bit(1) DEFAULT NULL,
  `id_musica` int DEFAULT NULL,
  `id_utilizador` int NOT NULL,
  `id_video` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKon5l9srbk6echqa7by3fa452r` (`id_musica`),
  KEY `FKrfyv5vx892qmwnrdmdbnun8d2` (`id_utilizador`),
  KEY `FKe5ohgmft8d6wma4j05nc53048` (`id_video`),
  CONSTRAINT `FKe5ohgmft8d6wma4j05nc53048` FOREIGN KEY (`id_video`) REFERENCES `video` (`id`),
  CONSTRAINT `FKon5l9srbk6echqa7by3fa452r` FOREIGN KEY (`id_musica`) REFERENCES `musica` (`id`),
  CONSTRAINT `FKrfyv5vx892qmwnrdmdbnun8d2` FOREIGN KEY (`id_utilizador`) REFERENCES `utilizador` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meu_carregado`
--

LOCK TABLES `meu_carregado` WRITE;
/*!40000 ALTER TABLE `meu_carregado` DISABLE KEYS */;
INSERT INTO `meu_carregado` VALUES (1,_binary '',1,2,NULL),(2,_binary '',2,2,NULL),(3,_binary '',3,2,NULL),(4,_binary '',4,2,NULL),(5,_binary '',5,2,NULL),(6,_binary '',6,2,NULL),(7,_binary '',7,2,NULL),(8,_binary '',8,2,NULL),(9,_binary '',NULL,2,1),(10,_binary '\0',9,4,NULL),(27,_binary '',28,4,NULL),(28,_binary '',NULL,4,2),(29,_binary '\0',NULL,1,3),(30,_binary '\0',NULL,4,4),(31,_binary '',NULL,1,5),(32,_binary '',29,4,NULL),(33,_binary '\0',30,2,NULL),(34,_binary '\0',33,5,NULL),(35,_binary '',35,4,NULL);
/*!40000 ALTER TABLE `meu_carregado` ENABLE KEYS */;
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
