-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: shortline.proxy.rlwy.net    Database: multimedia_db
-- ------------------------------------------------------
-- Server version	9.4.0

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
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `id` int NOT NULL AUTO_INCREMENT,
  `caminho_foto` varchar(255) DEFAULT NULL,
  `data_lancamento` date DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `id_utilizador` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdgfnm4416gotnn9svrdx5qkwt` (`id_utilizador`),
  CONSTRAINT `FKdgfnm4416gotnn9svrdx5qkwt` FOREIGN KEY (`id_utilizador`) REFERENCES `utilizador` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/issoetrap.jpg','2022-01-20','Álbum do brandao085 com batidas fortes e letras marcantes','Isso é Trap',2),(2,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/manualcomoamarerrado.jpg','2022-11-11','Sucesso do Wiu','Manual de Como Amar Errado',2),(3,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/maquinadotempo.jpg','2020-08-28','Primeiro álbum do Matuê','Máquina do Tempo',2),(4,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/previaszip.jpg','2022-12-15','Mixtape do Teto com vários hits','Previas.zip',2),(5,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/sza-sos_62db47e5-84ca-4f66-8b0a-95676dd280bb.jpg','2025-07-24','Álbum Relaxante','SOS',1);
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-01  0:55:59
