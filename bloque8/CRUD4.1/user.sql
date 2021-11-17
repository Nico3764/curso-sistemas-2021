-- Adminer 4.8.1 MySQL 5.5.5-10.3.31-MariaDB-0+deb10u1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `session_key` varchar(36) DEFAULT NULL,
  `hash_key` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `session_Key` (`session_key`),
  UNIQUE KEY `hash_key` (`hash_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`id`, `username`, `password`, `session_key`, `hash_key`) VALUES
(7,	'nico',	'1234',	NULL,	'72520745'),
(9,	'Carlos',	'0000',	'619452c3d2fc6',	'1952623900'),
(10,	'Gabriela',	'pancho',	NULL,	'-1744499704'),
(12,	'Pancho',	'3764',	NULL,	'1415041199'),
(13,	'Nina',	'234',	NULL,	'-678569339'),
(18,	'lele',	'123456',	NULL,	'-1773807211'),
(21,	'paola',	'4321',	NULL,	'-405735919'),
(30,	'pedro',	'321',	NULL,	'41374374'),
(38,	'lolos',	'4',	NULL,	'-1097180441');

-- 2021-11-17 00:56:08
