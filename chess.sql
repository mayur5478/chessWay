-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost:3308
-- Generation Time: Oct 06, 2015 at 07:48 AM
-- Server version: 5.6.24-log
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `chess`
--

-- --------------------------------------------------------

--
-- Table structure for table `chessdb.members`
--

CREATE TABLE IF NOT EXISTS `chessdb.members` (
  `Memberid` int(10) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Email` varchar(20) NOT NULL,
  `Password` varchar(10) NOT NULL,
  `Activation` varchar(40) DEFAULT 'N',
  `loggedIn` varchar(5) DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chessdb.members`
--

INSERT INTO `chessdb.members` (`Memberid`, `Username`, `Email`, `Password`, `Activation`, `loggedIn`) VALUES
(21, 'admin', 'playchesstowin@gmail', '1', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `Memberid` int(10) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Email` varchar(20) NOT NULL,
  `Password` varchar(10) NOT NULL,
  `Activation` varchar(40) DEFAULT NULL,
  `loggedIn` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`Memberid`, `Username`, `Email`, `Password`, `Activation`, `loggedIn`) VALUES
(21, 'admin', 'playchesstowin@gmail', '1', NULL, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `problems`
--

CREATE TABLE IF NOT EXISTS `problems` (
  `Level` varchar(200) NOT NULL,
  `Chapter` varchar(200) NOT NULL,
  `SubChapter` varchar(200) NOT NULL,
  `Problem_Id` int(11) NOT NULL AUTO_INCREMENT,
  `problem_name` varchar(200) NOT NULL,
  PRIMARY KEY (`Problem_Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Table structure for table `puzzle_answer`
--

CREATE TABLE IF NOT EXISTS `puzzle_answer` (
  `Level` varchar(255) NOT NULL,
  `Chapter` varchar(255) NOT NULL,
  `SubChapter` varchar(255) NOT NULL,
  `Problem_Id` int(11) NOT NULL,
  `Problem_name` varchar(255) NOT NULL,
  `move_Id` int(11) NOT NULL,
  `answer_Id` int(11) NOT NULL,
  `user_Move` varchar(200) NOT NULL,
  `admin_Move` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `puzzle_question`
--

CREATE TABLE IF NOT EXISTS `puzzle_question` (
  `Level` varchar(255) NOT NULL,
  `Chapter` varchar(255) NOT NULL,
  `SubChapter` varchar(255) NOT NULL,
  `Problem_id` int(11) NOT NULL AUTO_INCREMENT,
  `problem_name` varchar(200) NOT NULL,
  `Position` varchar(200) NOT NULL,
  `startPosition` varchar(200) NOT NULL,
  PRIMARY KEY (`Problem_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;

-- --------------------------------------------------------

--
-- Table structure for table `training_hierarchy`
--

CREATE TABLE IF NOT EXISTS `training_hierarchy` (
  `LevelName` varchar(200) NOT NULL,
  `ChapterName` varchar(200) NOT NULL,
  `SubChapterName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
