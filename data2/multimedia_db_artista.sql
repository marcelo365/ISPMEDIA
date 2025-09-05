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
-- Table structure for table `artista`
--

DROP TABLE IF EXISTS `artista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artista` (
  `id` int NOT NULL AUTO_INCREMENT,
  `biografia` varchar(255) DEFAULT NULL,
  `caminho_foto` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artista`
--

LOCK TABLES `artista` WRITE;
/*!40000 ALTER TABLE `artista` DISABLE KEYS */;
INSERT INTO `artista` VALUES (1,'Artista brasileiro de música urbana.','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/brandaoimg.webp','Brandão085'),(2,'Artista brasileiro de música urbana.','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/wiuimg.jpg','Wiu'),(3,'Rapper brasileiro conhecido pelo trap e autotune.','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/matueimg.webp','Matuê'),(4,'Cantor do selo 30PRAUM, destaque no trap nacional.','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/tetoimg.jpg','Teto'),(5,'Cantor e compositor canadense de R&B e música eletrônica. ','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/jahkoy.jpg','Jahkoy'),(7,'SZA','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/szaArtista.webp','SZA'),(10,'Artista Rap - Norte Americano','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/toryimg_13fa95ac-37ca-4423-8009-9e2017ddcd3c.jpg','Tory Lanez'),(11,'Cantor Brasileiro','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/veighimg_cdf93dd4-9125-4cda-9d16-2b32d0300c07.jfif','Veigh'),(13,'Cantora Angolana','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/anna_joyce_87d45a4a-21d1-476e-9b86-0cc0a585c246.jpg','Anna Joyce');
/*!40000 ALTER TABLE `artista` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-01  0:55:41
