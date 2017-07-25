-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-07-2017 a las 02:53:15
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
  `foto` varchar(60) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id_administrador`, `nombre`, `mail`, `clave`, `foto`) VALUES
(1, 'Martin', 'mike@hotmail.com', '1234', 'administrador.png'),
(6, 'Carlos Pedro', 'mimail2@hotmail.com', '1234', 'Lighthouse.jpg'),
(7, 'Mariano', 'example@hotmail.com', '1234', 'Koala.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disp_med`
--

CREATE TABLE `disp_med` (
  `cod_doctor` int(8) NOT NULL,
  `id_horario` int(8) NOT NULL,
  `disponible` varchar(3) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
(1, 'Roberto', 'Gladores', 'roberto@hotmail.com', '24435654', '1234', '1973-07-20', 'doctor.png', 42504000, '-34.6750806', '-58.3515754');

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
(1, 3);

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
  `longitud` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id_paciente`, `nombre`, `apellido`, `fechaNac`, `mail`, `clave`, `dni`, `domicilio`, `foto`, `latitud`, `longitud`) VALUES
(1, 'Marcos', 'Perlin', '1976-06-09', 'marcos@gmail.com.ar', '1234', '28325652', 'Peralta 243', 'pordefecto.png', '-34.7019099', '-58.3791374'),
(2, 'Pedro1', '', '0000-00-00', 'Pedro4532423425@hotmail.com', '1234', '', '', 'pordefecto.png', '-34.6583448', '-58.373093'),
(3, 'MarianoLean', '', '0000-00-00', 'leanM@hotmail.com', '1234', '', '', 'pordefecto.png', '-34.6044134', '-58.3753192'),
(4, 'Eliana', '', '0000-00-00', 'ElianaDorpe@hotmail.com', '1234', '', '', 'Penguins.jpg', '-34.6153584', '-58.3834173'),
(5, 'Mariano', '', '0000-00-00', 'example@hotmail.com', '1234', '', '', 'pordefecto.png', '-34.7364053', '-58.2965294'),
(6, 'Mercedes', '', '0000-00-00', 'platerodos@hotmail.com', '1234', '', '', 'invitado.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `id_turno` int(8) NOT NULL,
  `cod_doctor` int(8) NOT NULL,
  `id_paciente` int(8) NOT NULL,
  `fecha` date NOT NULL,
  `horario` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`id_turno`, `cod_doctor`, `id_paciente`, `fecha`, `horario`) VALUES
(13, 1, 1, '2017-08-10', '17:00:00'),
(14, 1, 1, '2017-08-18', '17:00:00');

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
-- Indices de la tabla `disp_med`
--
ALTER TABLE `disp_med`
  ADD PRIMARY KEY (`cod_doctor`,`id_horario`),
  ADD KEY `id_horario` (`id_horario`);

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
  MODIFY `id_administrador` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `doctores`
--
ALTER TABLE `doctores`
  MODIFY `cod_doctor` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
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
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_paciente` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `id_turno` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `disp_med`
--
ALTER TABLE `disp_med`
  ADD CONSTRAINT `disp_med_ibfk_1` FOREIGN KEY (`cod_doctor`) REFERENCES `doctores` (`cod_doctor`),
  ADD CONSTRAINT `disp_med_ibfk_2` FOREIGN KEY (`id_horario`) REFERENCES `horarios` (`id_horario`);

--
-- Filtros para la tabla `med_espec`
--
ALTER TABLE `med_espec`
  ADD CONSTRAINT `med_espec_ibfk_1` FOREIGN KEY (`cod_med`) REFERENCES `doctores` (`cod_doctor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `med_espec_ibfk_2` FOREIGN KEY (`cod_espec`) REFERENCES `especialidades` (`cod_espec`);

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
