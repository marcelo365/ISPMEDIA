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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musica`
--

LOCK TABLES `musica` WRITE;
/*!40000 ALTER TABLE `musica` DISABLE KEYS */;
INSERT INTO `musica` VALUES (1,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/brandao085-deondeeuvenho.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/issoetrap.jpg','2022-01-20','00:02:40.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/brandao085-deondeeuvenho.txt',6,'De Onde Eu Venho',1,4),(2,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/brandao085-sonhos.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/issoetrap.jpg','2022-01-20','00:03:53.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/brandao085-sonhos.txt',5,'Sonhos',1,2),(3,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/wiu-coracaodegelo.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/manualcomoamarerrado.jpg','2022-11-11','00:02:55.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/wiu-coracaodegelo.txt',5,'Coração de Gelo',2,4),(4,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/wiu-flowespacial.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/manualcomoamarerrado.jpg','2022-11-11','00:03:30.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/wiu-flowespacial.txt',7,'Flow Espacial',2,4),(5,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/matue-kennyg.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/maquinadotempo.jpg','2020-08-28','00:02:40.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/matue-kennyg.txt',5,'Kenny G',3,4),(6,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/matue-777666.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/maquinadotempo.jpg','2020-08-28','00:03:05.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/matue-777666.txt',6,'777-666',3,4),(7,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/teto-mustangpreto/teto-mustangpreto.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/previaszip.jpg','2022-12-15','00:02:50.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/teto-mustangpreto.txt',5,'Mustang Preto',4,4),(8,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/teto-m4.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/previaszip.jpg','2022-12-15','00:03:10.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/teto-m4.txt',6,'M4 (feat. Matuê)',4,4),(9,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/jahkoy-bitter.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/jahkoy-bitter.jpg','2022-10-15','00:02:19.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/jahkoy-bitter.txt',3,'Bitter',NULL,1),(28,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/SZA - Kill Bill_2a1eabe8-eaa3-4dcc-b884-b49bc2fe465c.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/sza-sos_c1d1a643-4717-4ca4-a140-d8aa9db3d7ee.jpg','2025-07-02','00:02:33.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/Kill_Bill_2bc50fb7-d3f4-4c4f-92ba-4b4eec64130c.txt',6,'Kill Bill',5,2),(29,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/Tory Lanez - So Drunk I Forgot You (Twitch Tapes)_74e7048d-1864-4b17-8743-7c246fe13390.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/drunkimgoppp_ff817301-320d-4ef4-a7b7-d08f8665bcb8.png','2025-07-25','00:01:21.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/So_Drunk_I_Forgot_You_83595924-8013-47c8-9ac1-8bd7ba655f05.txt',3,'So Drunk I Forgot You',NULL,3),(30,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/SZA - Get Behind Me (Interlude)_f52a7a7b-835c-4359-b19d-23d6903afd17.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/getbehindimg_1e17655e-d487-4fd3-8bd7-614ebe7fed64.png','2025-07-31','00:01:48.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/Get_Behind_Me__Interlude__e44037a9-645d-4b46-b97b-153b08774672.txt',4,'Get Behind Me (Interlude)',NULL,1),(32,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/jahkoy-bitter_9cf64f09-9dcf-40d1-b70d-213ba93ef6df.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/jahkoy-bitter_6de8b37e-976b-4082-91f8-23a9646996bb.jpg','2022-10-15','00:02:19.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/jahkoy-bitter_3e7b5ee2-d026-4e67-b1e8-2a5216e1f3ad.txt',3,'Bitter',NULL,1),(36,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/01 Anna Joyce - Destino_2bd2d536-1000-4753-b341-ce3054759b23/01 Anna Joyce - Destino_2bd2d536-1000-4753-b341-ce3054759b23.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/anna_joyce_c81b280a-b4ff-4d5c-856d-d44b931a1edf.jpg','2025-08-21','00:03:50.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/Destino_6cb2c80c-2b30-4970-9aa1-00438f4b5b84.txt',9,'Destino',NULL,6),(37,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/01 Anna Joyce - Destino_d341a9c9-e158-4cfd-9f55-77e4a6196154/01 Anna Joyce - Destino_d341a9c9-e158-4cfd-9f55-77e4a6196154.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/anna_joyce_8c6a1e7a-1c80-4764-b843-59f961b76a87.jpg','2025-08-21','00:03:50.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/Destino_40ac5658-3101-4796-a755-48c31a7859a9.txt',9,'Destino',NULL,6),(38,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/01 Anna Joyce - Destino_9a184ec1-624c-43e1-a995-656de4ae0348/01 Anna Joyce - Destino_9a184ec1-624c-43e1-a995-656de4ae0348.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/anna_joyce_54243ada-d221-4239-a73b-77501e024f1b.jpg','2025-08-21','00:03:50.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/Destino_0cccf2ef-c0bd-4e13-ab1f-5d7449c5d682.txt',9,'Destino',NULL,6),(39,'https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/musicas/01 Anna Joyce - Destino_52412fac-d0fb-4349-aa0d-2e37b10ca0b1/01 Anna Joyce - Destino_52412fac-d0fb-4349-aa0d-2e37b10ca0b1.m3u8','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/anna_joyce_a26218dc-79c8-4940-88bd-5f4bac40fccc.jpg','2025-08-21','00:03:50.000000','mp3','https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/letras/Destino_942a13ed-0584-4222-94a8-edae9fa3931d.txt',9,'Destino',NULL,6);
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

-- Dump completed on 2025-09-01  0:55:51
