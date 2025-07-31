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
-- Table structure for table `membro_grupo`
--

DROP TABLE IF EXISTS `membro_grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membro_grupo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` int DEFAULT NULL,
  `papel` int DEFAULT NULL,
  `id_grupo` int NOT NULL,
  `id_utilizador` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8ncc37cpy0fe7l8ij5c2tt9rl` (`id_grupo`),
  KEY `FK2wbq8r5ivdadaqmttrx1nut89` (`id_utilizador`),
  CONSTRAINT `FK2wbq8r5ivdadaqmttrx1nut89` FOREIGN KEY (`id_utilizador`) REFERENCES `utilizador` (`id`),
  CONSTRAINT `FK8ncc37cpy0fe7l8ij5c2tt9rl` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membro_grupo`
--

LOCK TABLES `membro_grupo` WRITE;
/*!40000 ALTER TABLE `membro_grupo` DISABLE KEYS */;
INSERT INTO `membro_grupo` VALUES (1,1,3,1,2),(2,1,1,1,1),(3,1,1,1,4),(4,1,3,4,4),(5,1,3,5,4),(34,1,1,1,5),(35,1,3,6,5),(37,1,1,5,5);
/*!40000 ALTER TABLE `membro_grupo` ENABLE KEYS */;
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
