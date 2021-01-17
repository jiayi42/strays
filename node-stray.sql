-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: node-stray
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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pid` int NOT NULL,
  `level` varchar(32) DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=190 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='stray category';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (184,'dog',180,'V2','http://localhost:8000/images/category/09170da0-446a-11eb-9e04-a1ef808247a6.jpg'),(180,'cat',7,'V2','http://localhost:8000/images/category/6b0e7ad0-586e-11eb-84e8-9d937f7ef4fc.jpeg'),(165,'bird',2,'V2','http://localhost:8000/images/category/d0575b60-5886-11eb-808d-a930560f19cc.jpg'),(187,'mind',185,'V2','http://localhost:8000/images/category/8484bab0-586e-11eb-84e8-9d937f7ef4fc.jpg'),(185,'monster',165,'V2','http://localhost:8000/images/category/91f017d0-586e-11eb-84e8-9d937f7ef4fc.jpg'),(186,'giant',164,'V2','http://localhost:8000/images/category/9c79d8d0-586e-11eb-84e8-9d937f7ef4fc.png'),(188,'Human',187,'V2','http://localhost:8000/images/category/8c435980-5889-11eb-808d-a930560f19cc.jpeg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manage_user`
--

DROP TABLE IF EXISTS `manage_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manage_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `head_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '/images/head/head.jpeg',
  `mobile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='user list';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manage_user`
--

LOCK TABLES `manage_user` WRITE;
/*!40000 ALTER TABLE `manage_user` DISABLE KEYS */;
INSERT INTO `manage_user` VALUES (1,'admin','123456','/images/head/head.jpeg','12332112345','USA'),(27,'tester','666666','/images/head/cat.jpg','22226666777','Japan'),(28,'mWm','556677','/images/head/Doge.jpg','12121212121','UK');
/*!40000 ALTER TABLE `manage_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stray`
--

DROP TABLE IF EXISTS `stray`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stray` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_first` int NOT NULL,
  `category_second` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `deposit` int NOT NULL,
  `tax_deposit` int NOT NULL,
  `weight` int NOT NULL,
  `images` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `detail` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `freight` int DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='stray list';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stray`
--

LOCK TABLES `stray` WRITE;
/*!40000 ALTER TABLE `stray` DISABLE KEYS */;
INSERT INTO `stray` VALUES (69,2,165,'bobo',16889,12666,9,'http://localhost:8000/images/stray/496cd560-446f-11eb-8df4-d16ae607260b.jpeg','<p>cute but poor doggyxx</p>',0),(94,123,321,'fe',55,779,24,'http://localhost:8000/images/stray/a02474d0-586f-11eb-a512-dfcf0338ad14.jpg','<p><img src=\"http://localhost:8000/images/detail/6f6a3800-5867-11eb-9621-f19b3db596b0.jpg\" style=\"max-width:100%;\"><br></p><p>She likes this stray dog fe.</p>',102),(95,123,321,'ffd',123,321,5,'http://localhost:8000/images/stray/05140d70-586a-11eb-8dc8-ddc44b6c564b.jpg','<p><img src=\"http://localhost:8000/images/detail/21000840-586a-11eb-8dc8-ddc44b6c564b.jpg\" style=\"max-width:100%;\">ll<br></p>',10),(96,123,321,'qwq',33,444,500,'http://localhost:8000/images/stray/48e23970-5877-11eb-b3c0-bd5af9a80fb1.png','<p><img src=\"http://localhost:8000/images/detail/0a07adc0-5877-11eb-b3c0-bd5af9a80fb1.jpg\" style=\"max-width:100%;\"><br></p>',10),(90,123,321,'ggfg',666,555,5,'http://localhost:8000/images/stray/97308e20-447b-11eb-b041-c3c8b02e3773.jpeg','<p>wcwcewrtr<img src=\"http://localhost:8000/images/detail/9feeddf0-447b-11eb-b041-c3c8b02e3773.jpg\" style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; max-width: 100%;\"></p>',9077),(98,123,321,'wer',222,333,55,'http://localhost:8000/images/stray/d2251450-5877-11eb-b3c0-bd5af9a80fb1.jpg','<p><img src=\"http://localhost:8000/images/detail/d9877da0-5877-11eb-b3c0-bd5af9a80fb1.jpg\" style=\"max-width:100%;\"><br></p><p>She looks like a bird.</p>',10),(99,123,321,'2dd2',33,123,25,'http://localhost:8000/images/stray/fcf2ccb0-5884-11eb-808d-a930560f19cc.jpeg','<p>wrong</p>',10),(100,123,321,'teest',123,321,9487,'http://localhost:8000/images/stray/3609dfc0-588a-11eb-808d-a930560f19cc.jpg','<p>This is just a test. Not offend</p>',10),(97,123,321,'aaaa',33,333,54,'http://localhost:8000/images/stray/35086ff0-5877-11eb-b3c0-bd5af9a80fb1.jpg','<p><img src=\"http://localhost:8000/images/detail/27eb59e0-5877-11eb-b3c0-bd5af9a80fb1.jpg\" style=\"max-width:100%;\"><br></p>',101);
/*!40000 ALTER TABLE `stray` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-17  1:25:26
