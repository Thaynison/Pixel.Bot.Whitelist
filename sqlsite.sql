-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.3.15-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura para tabela sitewl.configs
CREATE TABLE IF NOT EXISTS `configs` (
  `id` int(11) DEFAULT 1,
  `logo` varchar(150) DEFAULT '0',
  `banner` varchar(150) DEFAULT '0',
  `tentativas` int(11) DEFAULT 3,
  `whitelist` varchar(50) DEFAULT 'true',
  `canallogs` varchar(50) DEFAULT '0',
  `cargoaprovado` varchar(50) DEFAULT '0',
  `cargoreprovado` varchar(50) DEFAULT '0',
  `mensagemaprovado` varchar(500) DEFAULT '0',
  `mensagemreprovado` varchar(500) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sitewl.configs: ~1 rows (aproximadamente)
DELETE FROM `configs`;
/*!40000 ALTER TABLE `configs` DISABLE KEYS */;
INSERT INTO `configs` (`id`, `logo`, `banner`, `tentativas`, `whitelist`, `canallogs`, `cargoaprovado`, `cargoreprovado`, `mensagemaprovado`, `mensagemreprovado`) VALUES
	(1, '0', '0', 3, 'true', '0', '0', '0', '0', '0');
/*!40000 ALTER TABLE `configs` ENABLE KEYS */;

-- Copiando estrutura para tabela sitewl.forms
CREATE TABLE IF NOT EXISTS `forms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aswners` varchar(15000) NOT NULL DEFAULT '0',
  `date` varchar(250) NOT NULL DEFAULT '0',
  `status` varchar(250) NOT NULL DEFAULT '0',
  `questoesCorretas` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sitewl.forms: ~0 rows (aproximadamente)
DELETE FROM `forms`;
/*!40000 ALTER TABLE `forms` DISABLE KEYS */;
/*!40000 ALTER TABLE `forms` ENABLE KEYS */;

-- Copiando estrutura para tabela sitewl.questions
CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(250) NOT NULL DEFAULT '0',
  `answers` varchar(250) NOT NULL DEFAULT '0',
  `type` varchar(50) NOT NULL DEFAULT 'essay',
  `correta` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela sitewl.questions: ~4 rows (aproximadamente)
DELETE FROM `questions`;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` (`id`, `question`, `answers`, `type`, `correta`) VALUES
	(1, 'Qual o seu Nome?', '0', 'essay', 0),
	(2, 'Qual a sua Idade?', '0', 'essay', 0),
	(3, 'Qual o seu Email?', '0', 'essay', 0),
	(4, 'Qual o seu ID?', '0', 'essay', 0);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
