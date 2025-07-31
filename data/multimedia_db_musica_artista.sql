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
-- Table structure for table `musica_artista`
--

DROP TABLE IF EXISTS `musica_artista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musica_artista` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_artista` int NOT NULL,
  `id_musica` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtppchdtjniwm9wyge08xc6nla` (`id_artista`),
  KEY `FK30b2fp8uqaa0hhp80rxdp9562` (`id_musica`),
  CONSTRAINT `FK30b2fp8uqaa0hhp80rxdp9562` FOREIGN KEY (`id_musica`) REFERENCES `musica` (`id`),
  CONSTRAINT `FKtppchdtjniwm9wyge08xc6nla` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musica_artista`
--

LOCK TABLES `musica_artista` WRITE;
/*!40000 ALTER TABLE `musica_artista` DISABLE KEYS */;
INSERT INTO `musica_artista` VALUES (1,4,7),(2,4,8),(3,3,8),(4,3,5),(5,3,6),(6,2,3),(7,2,4),(8,1,1),(9,1,2),(10,5,9),(30,7,28),(31,10,29),(32,7,30),(33,5,32),(34,11,33),(35,11,34),(36,11,35);
/*!40000 ALTER TABLE `musica_artista` ENABLE KEYS */;
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
