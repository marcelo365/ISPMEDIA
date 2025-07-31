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
-- Table structure for table `musica`
--

DROP TABLE IF EXISTS `musica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `caminho_ficheiro` varchar(255) DEFAULT NULL,
  `caminho_foto` varchar(255) DEFAULT NULL,
  `data_lancamento` date DEFAULT NULL,
  `duracao` time(6) DEFAULT NULL,
  `formato` varchar(255) DEFAULT NULL,
  `letra` varchar(255) DEFAULT NULL,
  `tamanho` int DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `id_album` int DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrtg5cc0py68ch4bn877m9hx0n` (`id_album`),
  KEY `FK2o3u7w2d0rfw9h69ghrer51fq` (`id_categoria`),
  CONSTRAINT `FK2o3u7w2d0rfw9h69ghrer51fq` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`),
  CONSTRAINT `FKrtg5cc0py68ch4bn877m9hx0n` FOREIGN KEY (`id_album`) REFERENCES `album` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musica`
--

LOCK TABLES `musica` WRITE;
/*!40000 ALTER TABLE `musica` DISABLE KEYS */;
INSERT INTO `musica` VALUES (1,'/files/musicas/brandao085-deondeeuvenho.m3u8','/files/imagens/issoetrap.jpg','2022-01-20','00:02:40.000000','mp3','/files/letras/brandao085-deondeeuvenho.txt',6,'De Onde Eu Venho',1,4),(2,'/files/musicas/brandao085-sonhos.m3u8','/files/imagens/issoetrap.jpg','2022-01-20','00:03:53.000000','mp3','/files/letras/brandao085-sonhos.txt',5,'Sonhos',1,2),(3,'/files/musicas/wiu-coracaodegelo.m3u8','/files/imagens/manualcomoamarerrado.jpg','2022-11-11','00:02:55.000000','mp3','/files/letras/wiu-coracaodegelo.txt',5,'Coração de Gelo',2,4),(4,'/files/musicas/wiu-flowespacial.m3u8','/files/imagens/manualcomoamarerrado.jpg','2022-11-11','00:03:30.000000','mp3','/files/letras/wiu-flowespacial.txt',7,'Flow Espacial',2,4),(5,'/files/musicas/matue-kennyg.m3u8','/files/imagens/maquinadotempo.jpg','2020-08-28','00:02:40.000000','mp3','/files/letras/matue-kennyg.txt',5,'Kenny G',3,4),(6,'/files/musicas/matue-777666.m3u8','/files/imagens/maquinadotempo.jpg','2020-08-28','00:03:05.000000','mp3','/files/letras/matue-777666.txt',6,'777-666',3,4),(7,'/files/musicas/teto-mustangpreto.m3u8','/files/imagens/previaszip.jpg','2022-12-15','00:02:50.000000','mp3','/files/letras/teto-mustangpreto.txt',5,'Mustang Preto',4,4),(8,'/files/musicas/teto-m4.m3u8','/files/imagens/previaszip.jpg','2022-12-15','00:03:10.000000','mp3','/files/letras/teto-m4.txt',6,'M4 (feat. Matuê)',4,4),(9,'/files/musicas/jahkoy-bitter.m3u8','/files/imagens/jahkoy-bitter.jpg','2022-10-15','00:02:19.000000','mp3','/files/letras/jahkoy-bitter.txt',3,'Bitter',NULL,1),(28,'/files/musicas/SZA - Kill Bill_2a1eabe8-eaa3-4dcc-b884-b49bc2fe465c.m3u8','/files/imagens/sza-sos_d3998a3b-e5d6-4cfd-a454-fa11c207656e.jpg','2025-07-02','00:02:33.000000','mp3','/files/letras/Kill_Bill_2bc50fb7-d3f4-4c4f-92ba-4b4eec64130c.txt',6,'Kill Bill',5,2),(29,'/files/musicas/Tory Lanez - So Drunk I Forgot You (Twitch Tapes)_74e7048d-1864-4b17-8743-7c246fe13390.m3u8','/files/imagens/drunkimg_6fb87967-c948-4ff5-8906-3fb69f0fa2c5.png','2025-07-25','00:01:21.000000','mp3','/files/letras/So_Drunk_I_Forgot_You_83595924-8013-47c8-9ac1-8bd7ba655f05.txt',3,'So Drunk I Forgot You',NULL,3),(30,'/files/musicas/SZA - Get Behind Me (Interlude)_f52a7a7b-835c-4359-b19d-23d6903afd17.m3u8','/files/imagens/getbehindimg_1e17655e-d487-4fd3-8bd7-614ebe7fed64.png','2025-07-31','00:01:48.000000','mp3','/files/letras/Get_Behind_Me__Interlude__e44037a9-645d-4b46-b97b-153b08774672.txt',4,'Get Behind Me (Interlude)',NULL,1),(32,'/files/musicas/jahkoy-bitter_9cf64f09-9dcf-40d1-b70d-213ba93ef6df.m3u8','/files/imagens/jahkoy-bitter_6de8b37e-976b-4082-91f8-23a9646996bb.jpg','2022-10-15','00:02:19.000000','mp3','/files/letras/jahkoy-bitter_3e7b5ee2-d026-4e67-b1e8-2a5216e1f3ad.txt',3,'Bitter',NULL,1),(33,'/files/musicas/Veigh - Reuniões comigo mesmo_deefda88-83e2-4dfd-b289-ef3bc29c8b4e.m3u8','/files/imagens/Captura de ecrã 2025-07-14 012031_1c994120-b019-467e-87c7-1b0cf6f438ff.png','2025-07-09','00:02:10.000000','mp3','/files/letras/Reuni_es_comigo_mesmo_7458bfa9-1412-4c05-b9cb-9a53d41d3823.txt',5,'Reuniões comigo mesmo',NULL,4),(34,'/files/musicas/Veigh - Reuniões comigo mesmo_deefda88-83e2-4dfd-b289-ef3bc29c8b4e_d1625899-0e5b-4dca-b832-baef1b3360a7.m3u8','/files/imagens/Captura de ecrã 2025-07-14 012031_1c994120-b019-467e-87c7-1b0cf6f438ff_b375496b-3a51-4826-82b6-2fbd6d40abde.png','2025-07-09','00:02:10.000000','mp3','/files/letras/Reuni_es_comigo_mesmo_7458bfa9-1412-4c05-b9cb-9a53d41d3823_7b4f2dca-e1b2-4135-9fd8-4328c1db7f60.txt',5,'Reuniões comigo mesmo',NULL,4),(35,'/files/musicas/Veigh - Perdoe-me por ser um astro (interlúdio)_e05b8bd7-9748-492d-8dfa-c740aba66efe.m3u8','/files/imagens/Captura de ecrã 2025-07-14 012031_a8559ec0-2bc7-4cd7-b8e0-c0c3f66ebcd0.png','2025-07-25','00:01:50.000000','mp3','/files/letras/Perdoe-me__Interl_dio__93740f6b-124a-46d0-abbf-b41149de98a3.txt',4,'Perdoe-me (Interlúdio)',NULL,4);
/*!40000 ALTER TABLE `musica` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-14  5:25:02
