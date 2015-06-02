-- MySQL dump 10.13  Distrib 5.7.4-m14, for Win64 (x86_64)
--
-- Host: localhost    Database: yog_lillehammer
-- ------------------------------------------------------
-- Server version	5.6.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bets`
--

DROP TABLE IF EXISTS `bets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bets` (
  `b_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` int(11) NOT NULL,
  `user_hash` varchar(32) NOT NULL,
  `e_id` int(11) NOT NULL,
  `tokens` int(11) NOT NULL,
  PRIMARY KEY (`b_id`),
  KEY `country_id` (`country_id`),
  KEY `e_id` (`e_id`),
  KEY `user_hash` (`user_hash`),
  CONSTRAINT `bets_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country` (`c_id`),
  CONSTRAINT `bets_ibfk_2` FOREIGN KEY (`e_id`) REFERENCES `event` (`e_id`),
  CONSTRAINT `bets_ibfk_3` FOREIGN KEY (`user_hash`) REFERENCES `user` (`user_hash`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bets`
--

LOCK TABLES `bets` WRITE;
/*!40000 ALTER TABLE `bets` DISABLE KEYS */;
INSERT INTO `bets` VALUES (16,400,'abcd',1,10),(17,400,'abcd',1,10);
/*!40000 ALTER TABLE `bets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=406 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (204,'Afghanistan'),(205,'Albania'),(206,'Algeria'),(207,'American Samoa'),(208,'Andorra'),(209,'Angola'),(210,'Antigua and Barbuda'),(211,'Argentina'),(212,'Armenia'),(213,'Aruba'),(214,'Australia'),(215,'Austria'),(216,'Azerbaijan'),(217,'Bahamas'),(218,'Bahrain'),(219,'Bangladesh'),(220,'Barbados'),(221,'Belarus'),(222,'Belgium'),(223,'Belize'),(224,'Benin'),(225,'Bermuda'),(226,'Bhutan'),(227,'Bolivia'),(228,'Bosnia and Herzegovina'),(229,'Botswana'),(230,'Brazil'),(231,'British Virgin Islands'),(232,'Brunei'),(233,'Bulgaria'),(234,'Burkina Faso'),(235,'Burundi'),(236,'Cambodia'),(237,'Cameroon'),(238,'Canada'),(239,'Cape Verde'),(240,'Cayman Islands'),(241,'Central African Republic'),(242,'Chad'),(243,'Chile'),(244,'China'),(245,'Chinese Taipei'),(246,'Colombia'),(247,'Comoros'),(248,'Congo'),(249,'DR Congo'),(250,'Cook Islands'),(251,'Costa Rica'),(252,'Croatia'),(253,'Cuba'),(254,'Cyprus'),(255,'Czech Republic'),(256,'Denmark'),(257,'Djibouti'),(258,'Dominica'),(259,'Dominican Republic'),(260,'Ecuador'),(261,'Egypt'),(262,'El Salvador'),(263,'Equatorial Guinea'),(264,'Eritrea'),(265,'Estonia'),(266,'Ethiopia'),(267,'Federated States of Micronesia'),(268,'Fiji'),(269,'Finland'),(270,'France'),(271,'Gabon'),(272,'The Gambia'),(273,'Georgia'),(274,'Germany'),(275,'Ghana'),(276,'Great Britain'),(277,'Greece'),(278,'Grenada'),(279,'Guam'),(280,'Guatemala'),(281,'Guinea'),(282,'Guinea-Bissau'),(283,'Guyana'),(284,'Haiti'),(285,'Honduras'),(286,'Hong Kong'),(287,'Hungary'),(288,'Iceland'),(289,'India'),(290,'Indonesia'),(291,'Individual Olympic Athletes'),(292,'Iran'),(293,'Iraq'),(294,'Ireland'),(295,'Israel'),(296,'Italy'),(297,'Ivory Coast'),(298,'Jamaica'),(299,'Japan'),(300,'Jordan'),(301,'Kazakhstan'),(302,'Kenya'),(303,'Kiribati'),(304,'North Korea'),(305,'South Korea'),(306,'Kuwait'),(307,'Kyrgyzstan'),(308,'Laos'),(309,'Latvia'),(310,'Lebanon'),(311,'Lesotho'),(312,'Libya'),(313,'Liechtenstein'),(314,'Lithuania'),(315,'Luxembourg'),(316,'Macedonia'),(317,'Madagascar'),(318,'Malawi'),(319,'Malaysia'),(320,'Maldives'),(321,'Mali'),(322,'Malta'),(323,'Marshall Islands'),(324,'Mauritania'),(325,'Mauritius'),(326,'Mexico'),(327,'Moldova'),(328,'Monaco'),(329,'Mongolia'),(330,'Montenegro'),(331,'Morocco'),(332,'Mozambique'),(333,'Myanmar'),(334,'Namibia'),(335,'Nauru'),(336,'Nepal'),(337,'Netherlands'),(338,'New Zealand'),(339,'Nicaragua'),(340,'Niger'),(341,'Norway'),(342,'Oman'),(343,'Pakistan'),(344,'Palau'),(345,'Palestine'),(346,'Panama'),(347,'Papua New Guinea'),(348,'Paraguay'),(349,'Peru'),(350,'Philippines'),(351,'Poland'),(352,'Portugal'),(353,'Puerto Rico'),(354,'Qatar'),(355,'Romania'),(356,'Russia'),(357,'Rwanda'),(358,'Saint Kitts and Nevis'),(359,'Saint Lucia'),(360,'Saint Vincent and the Grenadines'),(361,'Samoa'),(362,'San Marino'),(363,'SÃ£o TomÃ© and PrÃ­ncipe'),(364,'Saudi Arabia'),(365,'Senegal'),(366,'Serbia'),(367,'Seychelles'),(368,'Singapore'),(369,'Slovakia'),(370,'Slovenia'),(371,'Somalia'),(372,'Solomon Islands'),(373,'South Africa'),(374,'Spain'),(375,'Sri Lanka'),(376,'Sudan'),(377,'Suriname'),(378,'Swaziland'),(379,'Sweden'),(380,'Switzerland'),(381,'Syria'),(382,'Tajikistan'),(383,'Tanzania'),(384,'Thailand'),(385,'Timor-Leste'),(386,'Togo'),(387,'Tonga'),(388,'Trinidad and Tobago'),(389,'Tunisia'),(390,'Turkey'),(391,'Turkmenistan'),(392,'Tuvalu'),(393,'Uganda'),(394,'Ukraine'),(395,'United Arab Emirates'),(396,'United States'),(397,'Uruguay'),(398,'Uzbekistan'),(399,'Vanuatu'),(400,'Venezuela'),(401,'Vietnam'),(402,'Virgin Islands'),(403,'Yemen'),(404,'Zambia'),(405,'Zimbabwe');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'400mSprint','2015-06-12 00:00:00'),(2,'furting','2015-06-12 12:40:02'),(3,'climbing','2015-06-19 22:30:42'),(4,'boxing','2015-06-29 22:30:42'),(5,'swimming','2015-07-09 22:30:42'),(6,'jump','2015-08-22 00:03:00');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medals`
--

DROP TABLE IF EXISTS `medals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medals` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT,
  `value` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  PRIMARY KEY (`m_id`),
  KEY `event_id` (`event_id`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `medals_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`e_id`),
  CONSTRAINT `medals_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `country` (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medals`
--

LOCK TABLES `medals` WRITE;
/*!40000 ALTER TABLE `medals` DISABLE KEYS */;
INSERT INTO `medals` VALUES (2,2,1,300),(3,3,1,350),(6,1,2,344),(8,2,2,380),(9,3,2,280),(10,1,3,298),(11,2,3,302),(12,3,3,309),(13,1,4,280),(14,2,4,280),(15,3,4,400),(18,3,5,280),(19,2,5,280),(20,1,5,400),(21,1,6,280),(22,2,6,400),(24,3,6,310),(28,1,1,400);
/*!40000 ALTER TABLE `medals` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`mobile`@`localhost`*/ /*!50003 TRIGGER tokenupdate BEFORE INSERT ON medals
FOR EACH ROW
BEGIN
IF NEW.value = '1' THEN
UPDATE user INNER JOIN bets ON user.user_hash = bets.user_hash AND bets.e_id = NEW.event_id AND bets.country_id = NEW.country_id SET token = bets.tokens * 2 + token;
ELSEIF NEW.value = '2' THEN
UPDATE user INNER JOIN bets ON user.user_hash = bets.user_hash AND bets.e_id = NEW.event_id AND bets.country_id = NEW.country_id SET token = bets.tokens * 1.5 + token;
ELSEIF NEW.value = '3' THEN
UPDATE user INNER JOIN bets ON user.user_hash = bets.user_hash AND bets.e_id = NEW.event_id AND bets.country_id = NEW.country_id SET token = bets.tokens * 1.2 + token;
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_hash` varchar(32) NOT NULL,
  `country_id` int(11) NOT NULL,
  `token` int(11) NOT NULL,
  PRIMARY KEY (`user_hash`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country` (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('abc',400,1),('abcd',400,73),('efgah',324,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlogin`
--

DROP TABLE IF EXISTS `userlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userlogin` (
  `ul_id` int(11) NOT NULL AUTO_INCREMENT,
  `last_login` date NOT NULL,
  `today_login` int(11) NOT NULL DEFAULT '0',
  `user_hash` varchar(32) NOT NULL,
  PRIMARY KEY (`ul_id`),
  KEY `user_hash` (`user_hash`),
  CONSTRAINT `userlogin_ibfk_1` FOREIGN KEY (`user_hash`) REFERENCES `user` (`user_hash`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlogin`
--

LOCK TABLES `userlogin` WRITE;
/*!40000 ALTER TABLE `userlogin` DISABLE KEYS */;
INSERT INTO `userlogin` VALUES (1,'2015-05-27',3,'abcd');
/*!40000 ALTER TABLE `userlogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uservoucher`
--

DROP TABLE IF EXISTS `uservoucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uservoucher` (
  `uv_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_hash` varchar(32) NOT NULL,
  `v_id` int(11) NOT NULL,
  PRIMARY KEY (`uv_id`),
  KEY `v_id` (`v_id`),
  KEY `user_hash` (`user_hash`),
  CONSTRAINT `uservoucher_ibfk_1` FOREIGN KEY (`v_id`) REFERENCES `voucher` (`v_id`),
  CONSTRAINT `uservoucher_ibfk_2` FOREIGN KEY (`user_hash`) REFERENCES `user` (`user_hash`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uservoucher`
--

LOCK TABLES `uservoucher` WRITE;
/*!40000 ALTER TABLE `uservoucher` DISABLE KEYS */;
INSERT INTO `uservoucher` VALUES (1,'abcd',1),(3,'abcd',1);
/*!40000 ALTER TABLE `uservoucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `voucher` (
  `v_id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  PRIMARY KEY (`v_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES (1,10,40),(2,20,80),(3,30,120),(4,40,160),(5,50,200);
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-06-02 15:55:55
