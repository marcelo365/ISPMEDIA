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
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `id` int NOT NULL AUTO_INCREMENT,
  `autor` varchar(255) DEFAULT NULL,
  `caminho_ficheiro` varchar(255) DEFAULT NULL,
  `data_lancamento` date DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `duracao` time(6) DEFAULT NULL,
  `formato` varchar(255) DEFAULT NULL,
  `tamanho` int DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  `id_musica` int DEFAULT NULL,
  `caminho_foto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr9o9co3tpehan1b2486cqm6ri` (`id_categoria`),
  KEY `FK4569a8udxl8y1vw6u3wchl7d5` (`id_musica`),
  CONSTRAINT `FK4569a8udxl8y1vw6u3wchl7d5` FOREIGN KEY (`id_musica`) REFERENCES `musica` (`id`),
  CONSTRAINT `FKr9o9co3tpehan1b2486cqm6ri` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (1,'Francisco Lopes','/files/videos/video1.m3u8','2024-12-15','Vídeo oficial lançado por Francisco Lopes','00:03:25.000000','mp4',120,'Vídeo 1',11,NULL,'/files/imagens/video1img.png'),(2,'Óscar Cardoso','/files/videos/video2_0b356b9d-d48c-4e3e-8195-95305a6a3f5b.m3u8','2025-07-23','Vídeo Bom','00:00:29.000000','mp4',1,'Vídeo 2',9,NULL,'/files/imagens/video2img_f8269747-6865-459e-8830-768ae7cd028d.png'),(3,'Hélder Armando','/files/videos/video3_d389ffde-d04d-4285-875c-bac1b845879d.m3u8','2025-07-31','Vídeo animado','00:00:28.000000','mp4',1,'Vídeo 3',12,NULL,'/files/imagens/video3img_ca5b5acb-e46f-4ed9-9e20-741bf895b069.png'),(4,'Tetot','/files/videos/video4_be5a05cf-24f3-435e-9e88-b239cde70e12.m3u8','2025-07-30','djdjd','00:00:29.000000','mp4',1,'Vídeo 4',13,NULL,'/files/imagens/video4img_38d0636d-45a8-4886-a5e4-a681136c78e5.png'),(5,'Nzinga','/files/videos/video5_3d74d007-a9db-48f9-ae12-67ec5fbfbdfb.m3u8','2025-07-22','jsuudj','00:00:29.000000','mp4',2,'Vídeo 5',10,NULL,'/files/imagens/video5img_4ba5ad24-9335-4668-8127-45bd2758bde5.png'),(6,'Hélder Armando','/files/videos/video3_d389ffde-d04d-4285-875c-bac1b845879d_baede228-ca05-4c7e-8be4-f675e3ab3b5d.m3u8','2025-07-31','Vídeo animado','00:00:28.000000','mp4',1,'Vídeo 3',12,NULL,'/files/imagens/video3img_ca5b5acb-e46f-4ed9-9e20-741bf895b069_79bd929e-73ce-4918-b5cb-cabf68811ade.png');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-14  5:25:00
