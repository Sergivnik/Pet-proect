-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: pet_proect
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `oderslist`
--

DROP TABLE IF EXISTS `oderslist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oderslist` (
  `id` int NOT NULL,
  `date` varchar(12) DEFAULT NULL,
  `idDriver` int DEFAULT NULL,
  `idOder` int DEFAULT NULL,
  `idLoadingPoint` int DEFAULT NULL,
  `idUnloadingPoint` int DEFAULT NULL,
  `customerPrice` decimal(8,2) DEFAULT NULL,
  `driverPrice` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `driverToOders_idx` (`idDriver`),
  KEY `oderToOder_idx` (`idOder`),
  KEY `cityToOders_idx` (`idLoadingPoint`,`idUnloadingPoint`),
  KEY `cityToUnloaing_idx` (`idUnloadingPoint`),
  CONSTRAINT `cityToLoading` FOREIGN KEY (`idLoadingPoint`) REFERENCES `cities` (`id`),
  CONSTRAINT `cityToUnloaing` FOREIGN KEY (`idUnloadingPoint`) REFERENCES `cities` (`id`),
  CONSTRAINT `driverToOders` FOREIGN KEY (`idDriver`) REFERENCES `drivers` (`id`),
  CONSTRAINT `oderToOder` FOREIGN KEY (`idOder`) REFERENCES `oders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oderslist`
--

LOCK TABLES `oderslist` WRITE;
/*!40000 ALTER TABLE `oderslist` DISABLE KEYS */;
INSERT INTO `oderslist` VALUES (1,'2021-02-28',2,2,1,1,10000.00,9000.00),(2,'2021-02-28',3,4,4,1,9000.00,8000.00),(3,'2021-03-03',1,3,1,4,10000.00,9000.00),(4,'2021-03-03',3,1,1,1,3500.00,3000.00),(5,'2021-03-02',2,1,1,4,10000.00,9000.00),(6,'2021-03-04',NULL,1,4,1,9000.00,8000.00),(7,'2021-03-02',NULL,3,NULL,NULL,10000.00,9000.00),(8,'',1,4,NULL,NULL,10000.00,9000.00),(9,'',NULL,1,3,1,NULL,NULL);
/*!40000 ALTER TABLE `oderslist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-01  6:18:05
