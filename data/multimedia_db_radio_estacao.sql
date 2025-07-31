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
-- Table structure for table `radio_estacao`
--

DROP TABLE IF EXISTS `radio_estacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `radio_estacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `url_stream` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `radio_estacao`
--

LOCK TABLES `radio_estacao` WRITE;
/*!40000 ALTER TABLE `radio_estacao` DISABLE KEYS */;
INSERT INTO `radio_estacao` VALUES (1,'Rádio RNA','Angola','https://paineldj5.com.br:20087/stream'),(2,'Rádio MFM','Angola','https://centova87.instainternet.com/proxy/mfm?mp=/stream'),(3,'Rádio Hero Angola','Angola','https://a2.asurahosting.com:6790/angola.mp3'),(4,'Rádio Maria Angola','Angola','https://dreamsiteradiocp5.com/proxy/rmangola?mp=/stream.mp3'),(5,'Rádio Fé Angola','Angola','https://stream.zeno.fm/gsndh1xvczetv'),(7,'Rádio M80','Portugal','https://stream-icy.bauermedia.pt/m80nacional.aac'),(8,'Rádio 100% Portugal','Portugal','https://play.radioregional.pt/stream/6/'),(9,'Rádio Amor Portugal','Portugal','https://stream.radioamorportugal.com:8443/rap.mp3'),(10,'Rádio Comercial Portugal','Portugal','https://stream-icy.bauermedia.pt/rctuga.aac'),(11,'Rádio Portugal Somos Nós','Portugal','https://sp0.redeaudio.com:7178/live'),(12,'Rádio Salsa México','México','https://radiolatina.info/8064/stream'),(13,'Rádio Stereorey','México','https://playerservices.streamtheworld.com/api/livestream-redirect/STEREOREY_SC'),(14,'Rádio Romântica México','México','https://stream.zeno.fm/236umhv03mzuv'),(15,'Rádio Ochentas México','México','https://stream.zeno.fm/e37m779v2ehvv'),(16,'Rádio Cumbia México','México','https://stream.zeno.fm/9y6n2h9v2ehvv'),(17,'Rádio RTL','Itália','https://streamingv2.shoutcast.com/rtl-1025_48.aac'),(18,'Rádio 105','Itália','https://icecast.unitedradio.it/Radio105rp.aac'),(19,'Rádio Sportiva','Itália','https://sportiva.inmystream.it/stream/sportiva'),(20,'Rádio Kiss Kiss','Itália','https://kisskiss.fluidstream.eu/KissKiss.aac?FLID=6'),(21,'Rádio One Dance','Itália','https://ice04.fluidstream.net/rn1_2.aac?FLID=6'),(22,'Rádio 2SM','Austrália','https://cast4.asurahosting.com/proxy/2sm1269/stream'),(23,'Rádio Gold','Austrália','https://playerservices.streamtheworld.com/api/livestream-redirect/ARN_GOLD1043AAC_SC'),(24,'Rádio Smooth FM','Austrália','https://playerservices.streamtheworld.com/api/livestream-redirect/SMOOTH953.mp3?dist=mytuner'),(25,'Rádio Totally 70s','Austrália','https://playerservices.streamtheworld.com/api/livestream-redirect/T_RAD_70S_S01_SC'),(26,'Rádio Totally Hits','Austrália','https://playerservices.streamtheworld.com/api/livestream-redirect/T_RAD_HITS_S01AAC_SC?dist=triton-widget&pname=tdwidgets'),(27,'Rádio FM Lo Nuestro','Panamá','https://www.streaming507.net:8136/stream'),(28,'Rádio La Ky','Panamá','https://playerservices.streamtheworld.com/api/livestream-redirect/LAKY_PANAMAAAC_SC?dist=lakyPanaWeb'),(29,'Rádio Chiriqui','Panamá','https://radiolatina.info/8180/stream'),(30,'Rádio Estereo Azul','Panamá','https://playerservices.streamtheworld.com/api/livestream-redirect/ESTEREOAZULAAC_SC'),(31,'Rádio Reforma','Panamá','https://www.streaming507.net:8072/stream');
/*!40000 ALTER TABLE `radio_estacao` ENABLE KEYS */;
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
