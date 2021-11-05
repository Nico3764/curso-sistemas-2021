-- Adminer 4.7.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `crud` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `crud`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(7,	'nico',	'1234'),
(9,	'Carlos',	'0000'),
(10,	'Gabriela',	'pancho'),
(12,	'Pancho',	'3764'),
(13,	'Nina',	'234'),
(18,	'lele',	'123456'),
(19,	'Pablo',	'pow');

-- 2021-11-03 21:16:46
