SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `consultorio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `id_departamento` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `consultorio` (`id`, `nombre`, `precio`, `id_departamento`, `createdAt`, `updatedAt`) VALUES
(1, 'SDS', 200, 1, '2024-03-25 22:37:29', '2024-03-25 22:37:29');

CREATE TABLE `departamento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `especialidad` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id`, `nombre`, `especialidad`, `createdAt`, `updatedAt`) VALUES
(1, 'Ortopedia', 'sad', '2024-03-25 22:16:29', '2024-03-25 22:17:17'),
(2, 'Vascular', 'sdasdsa', '2024-03-25 22:20:17', '2024-03-25 22:20:17');



CREATE TABLE `examenes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO `examenes` (`id`, `nombre`, `precio`, `createdAt`, `updatedAt`) VALUES
(1, 'Hemograma', NULL, '2024-03-26 21:23:54', '2024-03-26 21:23:54'),
(2, 'Urianalisis', NULL, '2024-03-26 21:23:54', '2024-03-26 21:23:54'),
(3, 'Glucososa de sangre', NULL, '2024-03-26 21:23:54', '2024-03-26 21:23:54');


CREATE TABLE `examenes_resultados` (
  `id` int(11) NOT NULL,
  `paciente_id` int(11) DEFAULT NULL,
  `examenes_id` int(11) DEFAULT NULL,
  `observacion_general` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `trabajador_id` int(11) DEFAULT NULL,
  `authenticado` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `examenes_resultados` (`id`, `paciente_id`, `examenes_id`, `observacion_general`, `createdAt`, `updatedAt`, `trabajador_id`, `authenticado`) VALUES
(2, 6, 1, 'Nada fuera de lo normal', '2024-03-26 23:13:42', '2024-03-26 23:13:42', 1, 0),
(3, 6, 1, 'Nada del otro mundo', '2024-03-26 23:17:57', '2024-03-26 23:17:57', 1, 0),
(4, 6, 1, 'Edwin reporte', '2024-03-26 23:19:30', '2024-03-26 23:19:30', 1, 0);



CREATE TABLE `factura` (
  `id` int(11) NOT NULL,
  `paciente_id` int(11) DEFAULT NULL,
  `trabajador_id` int(11) DEFAULT NULL,
  `habitacion_id` int(11) DEFAULT NULL,
  `observacion_id` int(11) DEFAULT NULL,
  `consultorio_id` int(11) DEFAULT NULL,
  `estadia` int(11) DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  `total` double DEFAULT NULL,
  `metodo_de_pago` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `facturado` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO `factura` (`id`, `paciente_id`, `trabajador_id`, `habitacion_id`, `observacion_id`, `consultorio_id`, `estadia`, `subtotal`, `total`, `metodo_de_pago`, `createdAt`, `updatedAt`, `facturado`) VALUES
(6, 6, 1, 1, 3, 1, 2, 200, 400, 'Card', '2024-03-25 22:30:07', '2024-03-27 05:02:05', 1),
(7, 27, 1, NULL, NULL, NULL, 1, 1250, 1437.5, 'N/A', '2024-03-26 22:39:25', '2024-03-26 22:39:25', 0),
(8, 27, 1, NULL, NULL, NULL, 1, 1250, 1437.5, 'N/A', '2024-03-26 22:41:51', '2024-03-27 05:02:33', 1);



CREATE TABLE `habitacion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `cantidad_camas` int(11) DEFAULT NULL,
  `precio_por_dia` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO `habitacion` (`id`, `nombre`, `cantidad_camas`, `precio_por_dia`, `createdAt`, `updatedAt`) VALUES
(1, 'Materno', 200, 400, '2024-03-25 22:26:43', '2024-03-25 22:26:43');



CREATE TABLE `historial_medico` (
  `id` int(11) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_profesion` int(11) DEFAULT NULL,
  `diagnostico` varchar(255) DEFAULT NULL,
  `tratamiento` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO `historial_medico` (`id`, `id_paciente`, `id_profesion`, `diagnostico`, `tratamiento`, `createdAt`, `updatedAt`) VALUES
(1, 6, 1, 'SIDA', 'ACETAMINOFEN', '2024-03-25 22:58:47', '2024-03-25 22:58:47'),
(2, 6, NULL, 'Gonorrea', 'Pastilla Azul', '2024-03-27 04:15:37', '2024-03-27 04:15:37');



CREATE TABLE `observacion` (
  `id` int(11) NOT NULL,
  `paciente_id` int(11) DEFAULT NULL,
  `trabajador_id` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `habitacion_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO `observacion` (`id`, `paciente_id`, `trabajador_id`, `createdAt`, `updatedAt`, `habitacion_id`) VALUES
(3, 6, 1, '2024-03-25 22:27:08', '2024-03-25 22:27:08', 1),
(4, 27, 1, '2024-03-26 22:10:02', '2024-03-26 22:10:02', 1),
(5, 27, 1, '2024-03-26 22:17:13', '2024-03-26 22:17:13', 1),
(6, 27, 1, '2024-03-26 22:23:55', '2024-03-26 22:23:55', 1),
(7, 27, 1, '2024-03-26 22:27:10', '2024-03-26 22:27:10', 1),
(8, 27, 1, '2024-03-26 22:37:44', '2024-03-26 22:37:44', 1),
(9, 27, 1, '2024-03-26 22:38:15', '2024-03-26 22:38:15', 1);



CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `tipoSangreId` int(11) DEFAULT NULL,
  `birthDay` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `leido_por_auxiliar_medico` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `pacientes` (`id`, `dni`, `nombre`, `direccion`, `email`, `tipoSangreId`, `birthDay`, `createdAt`, `updatedAt`, `leido_por_auxiliar_medico`) VALUES
(6, '0601', 'Jesus', 'asdssa', 'luis@google.com', 1, NULL, '2024-03-25 06:03:33', '2024-03-25 06:03:33', 0),
(9, '0601200103315', 'Jesus', 'SDASDSADAS', 'luis@google.org', 2, NULL, '2024-03-26 06:27:32', '2024-03-26 06:27:32', 0),
(12, '060120010331', 'Jesus', 'SDASDSADAS', 'luis1@google.org', 3, NULL, '2024-03-26 06:47:24', '2024-03-26 06:47:24', 0),
(13, '0601200103316', 'Jesus', 'SDASDSADAS', 'luis1@google.co', 4, NULL, '2024-03-26 06:47:44', '2024-03-26 06:47:44', 0),
(15, '0601200103318', 'Jesus', 'SDASDSADAS', 'luis1@goog.co', 1, NULL, '2024-03-26 06:48:06', '2024-03-26 06:48:06', 0),
(16, '0601200103312', 'Jesus', 'SDASDSADAS', 'luis1@go.co', 1, NULL, '2024-03-26 06:48:53', '2024-03-26 06:48:53', 1),
(20, '0601200103311', 'Jesus', 'SDASDSADAS', 'luisasd@gg.co', 1, NULL, '2024-03-26 06:50:06', '2024-03-26 06:50:06', 0),
(22, '060120010331233', 'Jesus', 'SDASDSADAS', 'luisasd@sadas.co', 1, NULL, '2024-03-26 06:51:09', '2024-03-26 06:51:09', 0),
(23, '0601200103312323233', 'Jesus', 'SDASDSADAS', 'luisasd@sadasssda.co', 1, NULL, '2024-03-26 06:51:41', '2024-03-26 06:51:41', 0),
(25, '06012001033123232311113', 'Jesus', 'SDASDSADAS', 'jesus@sadassdasssda.co', 4, NULL, '2024-03-26 07:10:17', '2024-03-26 07:10:17', 0),
(27, '060120010331232323111233413', 'Jesus', 'SDASDSADAS', 'jesus@sadassdassadassda.co', 3, NULL, '2024-03-26 07:18:26', '2024-03-26 07:18:26', 1),
(28, '1709199900762', 'Edwin Corrales Bustilo', 'Barrio CP', 'Edwincorrales@gmail.com', 9, NULL, '2024-03-26 19:58:21', '2024-03-26 19:58:21', 0);



CREATE TABLE `profesiones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO `profesiones` (`id`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Doctor', '2024-03-25 22:25:44', '2024-03-25 22:25:44'),
(2, 'Recepcionista', '2024-03-26 05:06:37', '2024-03-26 05:06:37'),
(3, 'Auxiliar Medico', '2024-03-26 05:06:38', '2024-03-26 05:06:38');


CREATE TABLE `reporte` (
  `id` int(11) NOT NULL,
  `id_factura` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO `reporte` (`id`, `id_factura`, `createdAt`, `updatedAt`) VALUES
(1, 6, '2024-03-25 23:37:55', '2024-03-25 23:37:55');



CREATE TABLE `roles_trabajadores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO `roles_trabajadores` (`id`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'user', '2024-03-25 22:25:06', '2024-03-25 22:25:06'),
(2, 'admin', '2024-03-25 22:25:23', '2024-03-25 22:25:23'),
(3, 'super-admin', '2024-03-25 22:25:23', '2024-03-25 22:25:23');



CREATE TABLE `signos_vitales` (
  `id` int(11) NOT NULL,
  `paciente_id` int(11) DEFAULT NULL,
  `frecuencia_cardiaca` int(11) DEFAULT NULL,
  `presion_arterial` int(11) DEFAULT NULL,
  `frecuencia_respiratoria` int(11) DEFAULT NULL,
  `temperatura` int(11) DEFAULT NULL,
  `oxigeno` int(11) DEFAULT NULL,
  `observacion_general` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `leido_por_doctor` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO `signos_vitales` (`id`, `paciente_id`, `frecuencia_cardiaca`, `presion_arterial`, `frecuencia_respiratoria`, `temperatura`, `oxigeno`, `observacion_general`, `createdAt`, `updatedAt`, `leido_por_doctor`) VALUES
(1, 6, 98, 120, 111, 23, 100, 'No mantiene malas anomalias', '2024-03-26 00:02:06', '2024-03-26 00:02:06', 0),
(2, 28, 120, 80, 90, 37, 90, 'NO se reporto anomalias', '2024-03-26 21:54:52', '2024-03-26 21:54:52', 0),
(3, 27, 20, 80, 90, 37, 90, 'NO se reporto anomalias', '2024-03-26 22:09:46', '2024-03-26 22:09:46', 0),
(4, 27, 20, 80, 90, 37, 90, 'NO se reporto anomalias', '2024-03-26 22:10:02', '2024-03-26 22:10:02', 0),
(5, 27, 30, 80, 90, 37, 90, 'NO se reporto anomalias', '2024-03-26 22:17:12', '2024-03-26 22:17:12', 0),
(6, 27, 75, 120, 13, 40, 95, 'Reporte nuevo', '2024-03-26 22:23:54', '2024-03-26 22:23:54', 0),
(7, 27, 70, 120, 13, 36, 95, 'Reporte nuevo!!!', '2024-03-26 22:25:01', '2024-03-26 22:25:01', 0),
(8, 27, 70, 190, 13, 36, 95, 'Reporte nuevo!!!', '2024-03-26 22:27:09', '2024-03-26 22:27:09', 0),
(9, 27, 70, 125, 13, 36, 95, 'Reporte nuevo!!!', '2024-03-26 22:37:43', '2024-03-26 22:37:43', 0),
(10, 27, 70, 125, 13, 37, 95, 'Reporte nuevo!!!', '2024-03-26 22:38:14', '2024-03-26 22:38:14', 0),
(11, 27, 70, 119, 13, 37, 95, 'Reporte nuevo!!!', '2024-03-26 22:39:25', '2024-03-26 22:39:25', 0),
(12, 27, 70, 119, 13, 37, 95, 'Reporte nuevo!!!', '2024-03-26 22:41:51', '2024-03-26 22:41:51', 0);



CREATE TABLE `tipoSangre` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO `tipoSangre` (`id`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'O+', '2024-03-25 05:53:35', '2024-03-25 05:53:35'),
(2, 'O-', '2024-03-25 05:53:44', '2024-03-25 05:53:44'),
(3, 'A+', '2024-03-26 17:57:39', '2024-03-26 17:57:39'),
(4, 'A-', '2024-03-26 17:57:40', '2024-03-26 17:57:40'),
(6, 'B+', '2024-03-26 19:55:18', '2024-03-26 19:55:18'),
(7, 'B-', '2024-03-26 19:56:17', '2024-03-26 19:56:17'),
(8, 'AB-', '2024-03-26 19:56:17', '2024-03-26 19:56:17'),
(9, 'AB+', '2024-03-26 19:56:17', '2024-03-26 19:56:17');



CREATE TABLE `trabajadores` (
  `id` int(11) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `tipoSangreId` int(11) DEFAULT NULL,
  `profesionId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `trabajadores` (`id`, `dni`, `nombre`, `direccion`, `email`, `password`, `tipoSangreId`, `profesionId`, `roleId`, `createdAt`, `updatedAt`) VALUES
(1, '06012201', 'sasdsa', 'asdas', 'asd@google.com', '12345678', 1, 3, 1, '2024-03-25 22:26:06', '2024-03-25 22:26:06');


ALTER TABLE `consultorio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_departamento` (`id_departamento`);


ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `examenes`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `examenes_resultados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paciente_id` (`paciente_id`),
  ADD KEY `trabajador_id` (`trabajador_id`),
  ADD KEY `examenes_id` (`examenes_id`);


ALTER TABLE `factura`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paciente_id` (`paciente_id`),
  ADD KEY `trabajador_id` (`trabajador_id`),
  ADD KEY `habitacion_id` (`habitacion_id`),
  ADD KEY `observacion_id` (`observacion_id`),
  ADD KEY `consultorio_id` (`consultorio_id`);


ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `historial_medico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_profesion` (`id_profesion`);


ALTER TABLE `observacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paciente_id` (`paciente_id`),
  ADD KEY `trabajador_id` (`trabajador_id`),
  ADD KEY `habitacion_id` (`habitacion_id`);


ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `tipoSangreId` (`tipoSangreId`);


ALTER TABLE `profesiones`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `reporte`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_factura` (`id_factura`);


ALTER TABLE `roles_trabajadores`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `signos_vitales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paciente_id` (`paciente_id`);


ALTER TABLE `tipoSangre`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `trabajadores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `tipoSangreId` (`tipoSangreId`),
  ADD KEY `roleId` (`roleId`),
  ADD KEY `profesionId` (`profesionId`);


ALTER TABLE `consultorio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


ALTER TABLE `departamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


ALTER TABLE `examenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `examenes_resultados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


ALTER TABLE `factura`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `observacion`
--
ALTER TABLE `observacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `profesiones`
--
ALTER TABLE `profesiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `roles_trabajadores`
--
ALTER TABLE `roles_trabajadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `signos_vitales`
--
ALTER TABLE `signos_vitales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tipoSangre`
--
ALTER TABLE `tipoSangre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consultorio`
--
ALTER TABLE `consultorio`
  ADD CONSTRAINT `consultorio_ibfk_4` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id`);

--
-- Filtros para la tabla `examenes_resultados`
--
ALTER TABLE `examenes_resultados`
  ADD CONSTRAINT `examenes_resultados_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`),
  ADD CONSTRAINT `examenes_resultados_ibfk_2` FOREIGN KEY (`trabajador_id`) REFERENCES `trabajadores` (`id`),
  ADD CONSTRAINT `examenes_resultados_ibfk_3` FOREIGN KEY (`examenes_id`) REFERENCES `examenes` (`id`);

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`),
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`trabajador_id`) REFERENCES `trabajadores` (`id`),
  ADD CONSTRAINT `factura_ibfk_3` FOREIGN KEY (`habitacion_id`) REFERENCES `habitacion` (`id`),
  ADD CONSTRAINT `factura_ibfk_4` FOREIGN KEY (`observacion_id`) REFERENCES `observacion` (`id`),
  ADD CONSTRAINT `factura_ibfk_5` FOREIGN KEY (`consultorio_id`) REFERENCES `consultorio` (`id`);

--
-- Filtros para la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  ADD CONSTRAINT `historial_medico_ibfk_4` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id`),
  ADD CONSTRAINT `historial_medico_ibfk_5` FOREIGN KEY (`id_profesion`) REFERENCES `profesiones` (`id`);

--
-- Filtros para la tabla `observacion`
--
ALTER TABLE `observacion`
  ADD CONSTRAINT `observacion_ibfk_2` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`),
  ADD CONSTRAINT `observacion_ibfk_3` FOREIGN KEY (`trabajador_id`) REFERENCES `trabajadores` (`id`),
  ADD CONSTRAINT `observacion_ibfk_4` FOREIGN KEY (`habitacion_id`) REFERENCES `habitacion` (`id`);

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_2` FOREIGN KEY (`tipoSangreId`) REFERENCES `tipoSangre` (`id`);

--
-- Filtros para la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `reporte_ibfk_2` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`id`);

--
-- Filtros para la tabla `signos_vitales`
--
ALTER TABLE `signos_vitales`
  ADD CONSTRAINT `signos_vitales_ibfk_2` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`);

--
-- Filtros para la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD CONSTRAINT `trabajadores_ibfk_2` FOREIGN KEY (`tipoSangreId`) REFERENCES `tipoSangre` (`id`),
  ADD CONSTRAINT `trabajadores_ibfk_5` FOREIGN KEY (`roleId`) REFERENCES `roles_trabajadores` (`id`),
  ADD CONSTRAINT `trabajadores_ibfk_6` FOREIGN KEY (`profesionId`) REFERENCES `profesiones` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
