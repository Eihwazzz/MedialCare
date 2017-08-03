-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-08-2017 a las 19:59:11
-- Versión del servidor: 10.1.24-MariaDB
-- Versión de PHP: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `medicaldb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id_administrador` int(8) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `clave` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `foto` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id_administrador`, `nombre`, `mail`, `clave`, `foto`, `telefono`) VALUES
(1, 'Martin', 'mike@hotmail.com', '1234', 'administrador.png', '42454344'),
(6, 'Carlos Matias', 'mimail2@hotmail.com', '1234', 'Jellyfish.jpg', '42345342'),
(7, 'Mariano', 'example@hotmail.com', '1234', 'Koala.jpg', '42345464'),
(8, 'Carlos', 'example@hotmail.com', '1234', 'pordefecto.png', '42546456');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigo_registros`
--

CREATE TABLE `codigo_registros` (
  `codigo` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `codigo_registros`
--

INSERT INTO `codigo_registros` (`codigo`) VALUES
(12345);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disponibilidad_dias`
--

CREATE TABLE `disponibilidad_dias` (
  `id_dia` int(8) NOT NULL,
  `dia` varchar(20) NOT NULL,
  `codigo_dia` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `disponibilidad_dias`
--

INSERT INTO `disponibilidad_dias` (`id_dia`, `dia`, `codigo_dia`) VALUES
(1, 'domingo', 0),
(2, 'lunes', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disponibilidad_horaria`
--

CREATE TABLE `disponibilidad_horaria` (
  `id_hora` int(8) NOT NULL,
  `hora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `disponibilidad_horaria`
--

INSERT INTO `disponibilidad_horaria` (`id_hora`, `hora`) VALUES
(1, '18:30:00'),
(2, '19:00:00'),
(3, '17:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctores`
--

CREATE TABLE `doctores` (
  `cod_doctor` int(8) NOT NULL,
  `nombre` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `apellido` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `dni` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `clave` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `fechaNac` date NOT NULL,
  `foto` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `telefono` int(15) NOT NULL DEFAULT '42504000',
  `latitud` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `longitud` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `doctores`
--

INSERT INTO `doctores` (`cod_doctor`, `nombre`, `apellido`, `mail`, `dni`, `clave`, `fechaNac`, `foto`, `telefono`, `latitud`, `longitud`) VALUES
(1, 'Roberto', 'Gladores', 'roberto@hotmail.com', '24435654', '1234', '1973-07-20', 'doctor.png', 42504000, '-34.6750806', '-58.3515754'),
(3, 'Marcos Matias', '', 'MarcosLepastra@hotmail.com', '', '1234', '0000-00-00', 'doctor.png', 42504432, '-34.7004625', '-58.4014481'),
(4, 'Mariana', '', 'example@hotmail.com', '', '1234', '0000-00-00', 'pordefecto.png', 42504000, '-34.6730416', '-58.3837242'),
(5, 'Mariana', '', 'MarianaMedina@hotmail.com', '', '1234', '0000-00-00', 'pordefecto.png', 42504543, '-34.6829715', '-58.3554494'),
(6, 'Mariano', '', 'example@hotmail.com', '', '1234', '0000-00-00', 'pordefecto.png', 42504000, '-34.7005797', '-58.380242'),
(7, 'Mariano', '', 'example@hotmail.com', '', '1234', '0000-00-00', 'pordefecto.png', 42504765, '-34.700519', '-58.3751986'),
(8, 'Mariano', '', 'example@hotmail.com', '', '1234', '0000-00-00', 'doctor.png', 42504988, '-34.6577468', '-58.3572842'),
(9, 'Marcos', 'Peralta', 'marcospe@gmail.com', '32.256.356', '1234', '0000-00-00', 'pordefecto.png', 42504908, '-34.6789788', '-58.4041956'),
(10, 'Pedro Morales', '', 'PedroMora@hotmail.com', '', '1234', '0000-00-00', 'doctor.png', 42504000, '-34.6977415', '-58.3729229'),
(11, 'Pedro Matias', '', 'mariandoce@hotmail.com', '', '1234', '0000-00-00', 'doctor.png', 42504000, '-34.6727216', '-58.3631692'),
(12, 'Martin Marcos', '', 'marmarcos@hotmail.com', '', '1234', '0000-00-00', 'doctor.png', 42504000, '-34.6564338', '-58.3530948'),
(13, 'Mario Jose', '', 'jomase@hotmail.com', '', '1234', '0000-00-00', 'doctor.png', 42504000, '-34.6584015', '-58.3570815'),
(14, 'Roberto Alberto', '', 'distretodos@hotmail.com', '', '1234', '0000-00-00', 'doctor.png', 42504000, '-34.6678738', '-58.3530025'),
(15, 'Alberto', '', 'mike4hunter@hotmail.com', '', '1234', '0000-00-00', 'doctor.png', 42504000, '-34.6980712', '-58.3722131'),
(17, 'Martin Test', '', 'MartinTestDoctor@hotmail.com', '', '1234', '0000-00-00', 'doctor.png', 42504143, '-34.6551879', '-58.3533832'),
(18, 'Julio Perez', '', 'perjuliodoce@hotmail.com', '', '1234', '0000-00-00', 'doctor.png', 42436574, '-34.6829715', '-58.3554494');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entidad`
--

CREATE TABLE `entidad` (
  `id_empresa` int(4) NOT NULL,
  `nombre_empresa` varchar(50) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `latitud` varchar(50) NOT NULL,
  `longitud` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `entidad`
--

INSERT INTO `entidad` (`id_empresa`, `nombre_empresa`, `telefono`, `latitud`, `longitud`) VALUES
(1, 'Medical Care', '01142451542', '-34.6586849', '-58.3723948');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `cod_espec` int(8) NOT NULL,
  `nombre_espec` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`cod_espec`, `nombre_espec`) VALUES
(1, 'Traumatologia'),
(2, 'Psicologia'),
(3, 'Medico Clinico'),
(4, 'Pediatria'),
(5, 'Gastroenterologia'),
(6, 'Otorrinolaringologia'),
(7, 'Hematologia'),
(8, 'Radiologia'),
(9, 'Dermatologia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id_horario` int(8) NOT NULL,
  `dia` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id_horario`, `dia`, `hora_inicio`, `hora_fin`) VALUES
(1, 'Lunes', '19:30:00', '20:00:00'),
(2, 'Martes', '19:30:00', '20:00:00'),
(3, 'Miercoles', '19:30:00', '20:00:00'),
(4, 'Jueves', '19:30:00', '20:00:00'),
(5, 'Viernes', '19:30:00', '20:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs`
--

CREATE TABLE `logs` (
  `id_log` int(8) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `perfil` varchar(15) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `ip` varchar(30) NOT NULL,
  `pais` varchar(50) NOT NULL,
  `accion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `logs`
--

INSERT INTO `logs` (`id_log`, `usuario`, `perfil`, `mail`, `ip`, `pais`, `accion`) VALUES
(1, 'Martin', 'Administrador', 'mike@hotmail.com', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Administrador. Aug 2, 2017 8:46:09 PM'),
(2, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 2, 2017 11:51:41 PM'),
(3, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 12:10:19 AM'),
(4, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 12:54:12 AM'),
(5, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 1:15:50 AM'),
(6, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 1:45:19 AM'),
(7, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 3:43:12 AM'),
(8, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 3:58:34 AM'),
(9, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 4:15:12 AM'),
(10, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 4:32:44 AM'),
(11, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 4:48:29 AM'),
(12, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 5:34:42 AM'),
(13, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 5:52:55 AM'),
(14, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 6:08:39 AM'),
(15, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 11:46:27 AM'),
(16, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 12:13:27 PM'),
(17, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 12:29:25 PM'),
(18, 'Roberto', 'Doctor', 'roberto@hotmail.com', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Doctor. Aug 3, 2017 12:33:20 PM'),
(19, 'Martin', 'Administrador', 'mike@hotmail.com', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Administrador. Aug 3, 2017 12:46:39 PM'),
(20, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 12:46:45 PM'),
(21, 'Roberto', 'Doctor', 'roberto@hotmail.com', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Doctor. Aug 3, 2017 12:46:48 PM'),
(22, 'Roberto', 'Doctor', 'roberto@hotmail.com', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Doctor. Aug 3, 2017 1:03:30 PM'),
(23, 'Roberto', 'Doctor', 'roberto@hotmail.com', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Doctor. Aug 3, 2017 1:21:10 PM'),
(24, 'Roberto', 'Doctor', 'roberto@hotmail.com', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Doctor. Aug 3, 2017 1:38:36 PM'),
(25, 'Roberto', 'Doctor', 'roberto@hotmail.com', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Doctor. Aug 3, 2017 1:55:13 PM'),
(26, 'Roberto', 'Doctor', 'roberto@hotmail.com', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Doctor. Aug 3, 2017 2:10:31 PM'),
(27, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 2:13:23 PM'),
(28, 'Marcos', 'Paciente', 'marcos@gmail.com.ar', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Paciente. Aug 3, 2017 2:13:33 PM'),
(29, 'Martin', 'Administrador', 'mike@hotmail.com', '190.176.116.48', 'Argentina', 'Ingreso a la aplicacion como: Administrador. Aug 3, 2017 2:26:17 PM');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `med_espec`
--

CREATE TABLE `med_espec` (
  `cod_med` int(8) NOT NULL,
  `cod_espec` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `med_espec`
--

INSERT INTO `med_espec` (`cod_med`, `cod_espec`) VALUES
(1, 3),
(3, 2),
(4, 4),
(5, 5),
(6, 6),
(7, 5),
(8, 1),
(9, 8),
(10, 1),
(11, 4),
(12, 8),
(13, 2),
(14, 6),
(15, 1),
(17, 1),
(18, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_paciente` int(8) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `apellido` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `fechaNac` date NOT NULL,
  `mail` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `clave` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `dni` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `domicilio` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `foto` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `latitud` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `longitud` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id_paciente`, `nombre`, `apellido`, `fechaNac`, `mail`, `clave`, `dni`, `domicilio`, `foto`, `latitud`, `longitud`, `telefono`) VALUES
(1, 'Marcos', 'Perlin', '1976-06-09', 'marcos@gmail.com.ar', '1234', '28325652', 'Peralta 243', 'invitado.jpg', '-34.7019099', '-58.3791374', '42434543'),
(2, 'Manuel', '', '0000-00-00', 'Pedro4532423425@hotmail.com', '1234', '', '', 'pordefecto.png', '-34.6583448', '-58.373093', '45434534'),
(3, 'MarianoLean', '', '0000-00-00', 'leanM@hotmail.com', '1234', '', '', 'pordefecto.png', '-34.6044134', '-58.3753192', '42454647'),
(4, 'Eliana', '', '0000-00-00', 'ElianaDorpe@hotmail.com', '1234', '', '', 'Penguins.jpg', '-34.6153584', '-58.3834173', '41239807'),
(5, 'Mariano', '', '0000-00-00', 'example@hotmail.com', '1234', '', '', 'pordefecto.png', '-34.7364053', '-58.2965294', '42454321'),
(6, 'Mercedes', '', '0000-00-00', 'platerodos@hotmail.com', '1234', '', '', 'invitado.jpg', '-34.6943095', '-58.395121', '46455675');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rel_disponibilidad_doctor`
--

CREATE TABLE `rel_disponibilidad_doctor` (
  `id_disponibilidad_doctor` int(8) NOT NULL,
  `cod_doctor` int(8) NOT NULL,
  `id_dia` int(8) NOT NULL,
  `id_hora` int(8) NOT NULL,
  `disponible` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rel_disponibilidad_doctor`
--

INSERT INTO `rel_disponibilidad_doctor` (`id_disponibilidad_doctor`, `cod_doctor`, `id_dia`, `id_hora`, `disponible`) VALUES
(1, 1, 2, 2, 1),
(2, 3, 2, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rel_doctor_dia`
--

CREATE TABLE `rel_doctor_dia` (
  `id_doctor_dia` int(8) NOT NULL,
  `cod_doctor` int(8) NOT NULL,
  `cod_dia` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rel_doctor_dia`
--

INSERT INTO `rel_doctor_dia` (`id_doctor_dia`, `cod_doctor`, `cod_dia`) VALUES
(15, 1, 4),
(16, 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `id_turno` int(8) NOT NULL,
  `cod_doctor` int(8) NOT NULL,
  `id_paciente` int(8) NOT NULL,
  `fecha` date NOT NULL,
  `horario` time NOT NULL,
  `asistido` int(1) DEFAULT NULL,
  `nombre_espec` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`id_turno`, `cod_doctor`, `id_paciente`, `fecha`, `horario`, `asistido`, `nombre_espec`) VALUES
(14, 1, 1, '2017-08-18', '17:00:00', NULL, 'Medico Clinico'),
(15, 1, 2, '2017-01-23', '06:00:00', 1, 'Medico Clinico'),
(16, 1, 3, '2017-03-24', '06:00:00', 1, 'Medico Clinico'),
(17, 1, 4, '2017-04-12', '07:00:00', 1, 'Medico Clinico'),
(18, 1, 5, '2017-03-16', '07:00:00', 1, 'Medico Clinico'),
(19, 1, 5, '2017-05-23', '07:00:00', 1, 'Medico Clinico'),
(20, 1, 6, '2017-05-29', '07:00:00', 1, 'Medico Clinico'),
(21, 1, 2, '2017-05-03', '07:00:00', 1, 'Medico Clinico'),
(22, 1, 1, '2017-05-12', '07:00:00', 1, 'Medico Clinico'),
(23, 1, 2, '2017-06-11', '06:00:00', 1, 'Medico Clinico'),
(24, 1, 3, '2017-06-09', '06:00:00', 1, 'Medico Clinico'),
(25, 1, 4, '2017-05-30', '08:00:00', 1, 'Medico Clinico'),
(26, 1, 6, '2017-06-12', '07:00:00', 1, 'Medico Clinico'),
(27, 1, 2, '2017-07-11', '07:00:00', 1, 'Medico Clinico'),
(28, 1, 3, '2017-07-09', '07:00:00', 1, 'Medico Clinico'),
(29, 1, 4, '2017-07-12', '08:00:00', 1, 'Medico Clinico'),
(30, 1, 6, '2017-06-26', '06:00:00', 1, 'Medico Clinico'),
(31, 1, 1, '2017-05-22', '07:00:00', 1, 'Medico Clinico'),
(32, 1, 1, '2017-06-03', '07:00:00', 1, 'Medico Clinico'),
(33, 1, 1, '2017-04-15', '08:00:00', 1, 'Medico Clinico'),
(34, 1, 1, '2017-03-26', '06:00:00', 1, 'Medico Clinico'),
(35, 1, 1, '2017-06-22', '07:00:00', 0, 'Medico Clinico'),
(36, 1, 1, '2017-07-03', '07:00:00', 0, 'Medico Clinico'),
(37, 1, 1, '2017-08-15', '08:00:00', NULL, 'Medico Clinico'),
(38, 1, 1, '2017-09-26', '06:00:00', NULL, 'Medico Clinico'),
(41, 1, 1, '2017-08-28', '17:00:00', NULL, 'Medico Clinico'),
(42, 8, 1, '2017-08-22', '17:00:00', NULL, 'Traumatologia'),
(43, 8, 1, '2017-09-21', '18:00:00', NULL, 'Traumatologia'),
(44, 1, 1, '2017-08-29', '18:00:00', NULL, 'Medico Clinico'),
(45, 14, 1, '2017-08-02', '18:00:00', NULL, 'Otorrinolaringologia'),
(46, 1, 1, '2017-08-02', '17:00:00', 1, 'Medico Clinico'),
(47, 1, 1, '2017-08-02', '17:00:00', 1, 'Medico Clinico'),
(48, 1, 1, '2017-08-02', '16:00:00', 1, 'Medico Clinico'),
(49, 1, 1, '2017-08-02', '17:00:00', 1, 'Medico Clinico'),
(50, 1, 1, '2017-08-02', '18:00:00', 1, 'Medico Clinico'),
(54, 15, 1, '2017-08-07', '18:00:00', NULL, 'Traumatologia'),
(55, 1, 1, '2017-08-10', '19:00:00', NULL, 'Medico Clinico'),
(56, 1, 1, '2017-08-09', '18:00:00', NULL, 'Medico Clinico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(8) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `clave` varchar(10) NOT NULL,
  `perfil` varchar(30) NOT NULL,
  `foto` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `mail`, `clave`, `perfil`, `foto`) VALUES
(1, 'Martin', 'mike@hotmail.com', '1234', 'Administrador', 'administrador.png'),
(2, 'Usuario', 'usuario@hotmail.com', '1234', 'Paciente', 'usuario.png'),
(3, 'Invitado', 'invitado@hotmail.com', '1234', 'Invitado', 'invitado.jpg'),
(4, 'Roberto', 'robert@gmail.com.ar', '1234', 'Doctor', 'doctor.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id_administrador`);

--
-- Indices de la tabla `disponibilidad_dias`
--
ALTER TABLE `disponibilidad_dias`
  ADD PRIMARY KEY (`id_dia`);

--
-- Indices de la tabla `disponibilidad_horaria`
--
ALTER TABLE `disponibilidad_horaria`
  ADD PRIMARY KEY (`id_hora`);

--
-- Indices de la tabla `doctores`
--
ALTER TABLE `doctores`
  ADD PRIMARY KEY (`cod_doctor`);

--
-- Indices de la tabla `entidad`
--
ALTER TABLE `entidad`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`cod_espec`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id_horario`);

--
-- Indices de la tabla `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id_log`);

--
-- Indices de la tabla `med_espec`
--
ALTER TABLE `med_espec`
  ADD PRIMARY KEY (`cod_med`,`cod_espec`),
  ADD KEY `cod_espec` (`cod_espec`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_paciente`);

--
-- Indices de la tabla `rel_disponibilidad_doctor`
--
ALTER TABLE `rel_disponibilidad_doctor`
  ADD PRIMARY KEY (`id_disponibilidad_doctor`),
  ADD KEY `cod_doctor` (`cod_doctor`),
  ADD KEY `id_dia` (`id_dia`),
  ADD KEY `id_hora` (`id_hora`);

--
-- Indices de la tabla `rel_doctor_dia`
--
ALTER TABLE `rel_doctor_dia`
  ADD PRIMARY KEY (`id_doctor_dia`),
  ADD KEY `cod_doctor` (`cod_doctor`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`id_turno`,`cod_doctor`,`id_paciente`),
  ADD KEY `cod_doctor` (`cod_doctor`),
  ADD KEY `id_paciente` (`id_paciente`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id_administrador` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `disponibilidad_dias`
--
ALTER TABLE `disponibilidad_dias`
  MODIFY `id_dia` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `disponibilidad_horaria`
--
ALTER TABLE `disponibilidad_horaria`
  MODIFY `id_hora` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `doctores`
--
ALTER TABLE `doctores`
  MODIFY `cod_doctor` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT de la tabla `entidad`
--
ALTER TABLE `entidad`
  MODIFY `id_empresa` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `cod_espec` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id_horario` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `logs`
--
ALTER TABLE `logs`
  MODIFY `id_log` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_paciente` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `rel_disponibilidad_doctor`
--
ALTER TABLE `rel_disponibilidad_doctor`
  MODIFY `id_disponibilidad_doctor` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `rel_doctor_dia`
--
ALTER TABLE `rel_doctor_dia`
  MODIFY `id_doctor_dia` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `id_turno` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `med_espec`
--
ALTER TABLE `med_espec`
  ADD CONSTRAINT `med_espec_ibfk_1` FOREIGN KEY (`cod_med`) REFERENCES `doctores` (`cod_doctor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `med_espec_ibfk_2` FOREIGN KEY (`cod_espec`) REFERENCES `especialidades` (`cod_espec`);

--
-- Filtros para la tabla `rel_disponibilidad_doctor`
--
ALTER TABLE `rel_disponibilidad_doctor`
  ADD CONSTRAINT `rel_disponibilidad_doctor_ibfk_1` FOREIGN KEY (`cod_doctor`) REFERENCES `doctores` (`cod_doctor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rel_disponibilidad_doctor_ibfk_2` FOREIGN KEY (`id_dia`) REFERENCES `disponibilidad_dias` (`id_dia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rel_disponibilidad_doctor_ibfk_3` FOREIGN KEY (`id_hora`) REFERENCES `disponibilidad_horaria` (`id_hora`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rel_doctor_dia`
--
ALTER TABLE `rel_doctor_dia`
  ADD CONSTRAINT `rel_doctor_dia_ibfk_1` FOREIGN KEY (`cod_doctor`) REFERENCES `doctores` (`cod_doctor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`cod_doctor`) REFERENCES `doctores` (`cod_doctor`),
  ADD CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
