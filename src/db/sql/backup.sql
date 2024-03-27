CREATE TABLE `pacientes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `dni` varchar(255) UNIQUE NOT NULL,
  `nombre` varchar(255),
  `direccion` varchar(255),
  `email` varchar(255) UNIQUE NOT NULL,
  `tipoSangreId` int,
  `birthDay` datetime,
  `createdAt` datetime DEFAULT (now()),
  `updatedAt` datetime DEFAULT (now())
);

CREATE TABLE `roles_trabajadores` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `createdAt` datetime DEFAULT (now()),
  `updatedAt` datetime DEFAULT (now())
);

CREATE TABLE `trabajadores` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `dni` varchar(255) UNIQUE NOT NULL,
  `nombre` varchar(255),
  `direccion` varchar(255),
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255),
  `tipoSangreId` int,
  `profesionId` int,
  `roleId` int,
  `createdAt` datetime DEFAULT (now()),
  `updatedAt` datetime DEFAULT (now())
);

CREATE TABLE `profesiones` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `createdAt` datetime DEFAULT (now()),
  `updatedAt` datetime DEFAULT (now())
);

CREATE TABLE `tipoSangre` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `createdAt` datetime DEFAULT (now()),
  `updatedAt` datetime DEFAULT (now())
);

CREATE TABLE `habitacion` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `cantidad_camas` int,
  `precio_por_dia` int,
  `createdAt` datetime DEFAULT (now()),
  `updatedAt` datetime DEFAULT (now())
);

CREATE TABLE `observacion` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `paciente_id` int,
  `frecuencia` varchar(255),
  `trabajador_id` int,
  `createdAt` datetime DEFAULT (now()),
  `updatedAt` datetime DEFAULT (now())
);

CREATE TABLE `signos_vitales` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `paciente_id` int,
  `frecuencia_cardiaca` int,
  `presion_arterial` int,
  `frecuencia_respiratoria` int,
  `temperatura` int,
  `oxigeno` int,
  `observacion_general` varchar(255),
  `createdAt` datetime DEFAULT (now()),
  `updatedAt` datetime DEFAULT (now())
);

CREATE TABLE `factura` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `paciente_id` int,
  `trabajador_id` int,
  `habitacion_id` int,
  `observacion_id` int,
  `consultorio_id` int,
  `estadia` int,
  `subtotal` double,
  `total` double,
  `metodo_de_pago` varchar(255)
);

CREATE TABLE `historial_medico` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_paciente` int,
  `id_profesion` int,
  `diagnostico` varchar(255),
  `tratamiento` varchar(255)
);

CREATE TABLE `departamento` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `especialidad` varchar(255)
);

CREATE TABLE `consultorio` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `precio` double,
  `id_departamento` int
);

CREATE TABLE `reporte` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_factura` int
);

ALTER TABLE `pacientes` ADD FOREIGN KEY (`tipoSangreId`) REFERENCES `tipoSangre` (`id`);

ALTER TABLE `trabajadores` ADD FOREIGN KEY (`tipoSangreId`) REFERENCES `tipoSangre` (`id`);

ALTER TABLE `profesiones` ADD FOREIGN KEY (`id`) REFERENCES `trabajadores` (`profesionId`);

ALTER TABLE `roles_trabajadores` ADD FOREIGN KEY (`id`) REFERENCES `trabajadores` (`roleId`);

ALTER TABLE `pacientes` ADD FOREIGN KEY (`id`) REFERENCES `observacion` (`paciente_id`);

ALTER TABLE `trabajadores` ADD FOREIGN KEY (`id`) REFERENCES `observacion` (`trabajador_id`);

ALTER TABLE `pacientes` ADD FOREIGN KEY (`id`) REFERENCES `signos_vitales` (`paciente_id`);

ALTER TABLE `pacientes` ADD FOREIGN KEY (`id`) REFERENCES `factura` (`paciente_id`);

ALTER TABLE `trabajadores` ADD FOREIGN KEY (`id`) REFERENCES `factura` (`trabajador_id`);

ALTER TABLE `habitacion` ADD FOREIGN KEY (`id`) REFERENCES `factura` (`habitacion_id`);

ALTER TABLE `observacion` ADD FOREIGN KEY (`id`) REFERENCES `factura` (`observacion_id`);

ALTER TABLE `departamento` ADD FOREIGN KEY (`id`) REFERENCES `consultorio` (`id_departamento`);

ALTER TABLE `pacientes` ADD FOREIGN KEY (`id`) REFERENCES `historial_medico` (`id_paciente`);

ALTER TABLE `profesiones` ADD FOREIGN KEY (`id`) REFERENCES `historial_medico` (`id_profesion`);

ALTER TABLE `factura` ADD FOREIGN KEY (`id`) REFERENCES `reporte` (`id_factura`);

ALTER TABLE `consultorio` ADD FOREIGN KEY (`id`) REFERENCES `factura` (`consultorio_id`);

ALTER TABLE `consultorio` ADD FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id`);

ALTER TABLE `historial_medico` ADD FOREIGN KEY (`id`) REFERENCES `departamento` (`id`);

ALTER TABLE `historial_medico` ADD FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id`);

ALTER TABLE `historial_medico` ADD FOREIGN KEY (`id_profesion`) REFERENCES `profesiones` (`id`);

ALTER TABLE `observacion` ADD FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`);

ALTER TABLE `observacion` ADD FOREIGN KEY (`trabajador_id`) REFERENCES `trabajadores` (`id`);

ALTER TABLE `reporte` ADD FOREIGN KEY (`id_factura`) REFERENCES `factura` (`id`);

ALTER TABLE `signos_vitales` ADD FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`);

ALTER TABLE `trabajadores` ADD FOREIGN KEY (`profesionId`) REFERENCES `profesiones` (`id`);

ALTER TABLE `trabajadores` ADD FOREIGN KEY (`roleId`) REFERENCES `roles_trabajadores` (`id`);

ALTER TABLE `u186970938_clinica_db`.`departamento`
ADD COLUMN `updatedAt` DATETIME DEFAULT NOW() COMMENT '';

ALTER TABLE `u186970938_clinica_db`.`departamento`
ADD COLUMN `createdAt` DATETIME DEFAULT NOW() COMMENT '';


ALTER TABLE `u186970938_clinica_db`.`factura`
ADD COLUMN `createdAt` DATETIME DEFAULT NOW() COMMENT '',
ADD COLUMN `updatedAt` DATETIME DEFAULT NOW() COMMENT '';


ALTER TABLE `u186970938_clinica_db`.`consultorio`
ADD COLUMN `createdAt` DATETIME DEFAULT NOW() COMMENT '',
ADD COLUMN `updatedAt` DATETIME DEFAULT NOW() COMMENT '';


ALTER TABLE `u186970938_clinica_db`.`historial_medico`
ADD COLUMN `createdAt` DATETIME DEFAULT NOW() COMMENT '',
ADD COLUMN `updatedAt` DATETIME DEFAULT NOW() COMMENT '';


ALTER TABLE `u186970938_clinica_db`.`reporte`
ADD COLUMN `createdAt` DATETIME DEFAULT NOW() COMMENT '',
ADD COLUMN `updatedAt` DATETIME DEFAULT NOW() COMMENT '';


ALTER TABLE `u186970938_clinica_db`.`observacion` ADD FOREIGN KEY (`habitacion_id`) REFERENCES `u186970938_clinica_db`.`habitacion` (`id`);

ALTER TABLE `u186970938_clinica_db`.`observacion` ADD FOREIGN KEY (`habitacion_id`) REFERENCES `u186970938_clinica_db`.`habitacion` (`id`);ALTER TABLE `u186970938_clinica_db`.`signos_vitales`
ADD COLUMN `leido_por_doctor` TINYINT DEFAULT '0' COMMENT '';

ALTER TABLE `u186970938_clinica_db`.`pacientes`
ADD COLUMN `leido_por_auxiliar_medico` TINYINT DEFAULT '0' COMMENT '';

CREATE TABLE `u186970938_clinica_db`.`examanes_resultados` (`id` serial);

CREATE TABLE `u186970938_clinica_db`.`examenes` (`id` serial);
