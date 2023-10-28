CREATE DATABASE IF NOT EXISTS PET_DOCTOR;

/* Crear base de datos */
ALTER SCHEMA PET_DOCTOR DEFAULT COLLATE utf8mb4_spanish_ci;

/* Cambiar codificación a UTF-8 */
USE PET_DOCTOR;

/* Seleccionar la base de datos creada */
/* TABLA DE USUARIOS */
CREATE TABLE IF NOT EXISTS USUARIOS(
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    clave VARCHAR(50) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    dni VARCHAR(9) NOT NULL UNIQUE,
    telefono INT NOT NULL UNIQUE,
    email VARCHAR(80) NOT NULL UNIQUE,
    localidad VARCHAR(50),
    provincia VARCHAR(50),
    cPostal INT,
    fechaAlta DATE NOT NULL,
    fechaNacimiento DATE,
    /* Nivel 0 serán los clientes y nivel 1 los veterinarios */
    rolUsuario INT NOT NULL CHECK (
        rolUsuario BETWEEN 0
        AND 1
    ),
    imagen LONGTEXT
);

/* TABLA MASCOTAS */
CREATE TABLE IF NOT EXISTS MASCOTAS(
    idMascota INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    nombre VARCHAR(50) NOT NULL,
    especie VARCHAR(30) NOT NULL,
    raza VARCHAR(30),
    sexo ENUM('Macho', 'Hembra'),
    peso FLOAT(6),
    fechaAlta DATE NOT NULL,
    fechaNacimiento DATE,
    altura FLOAT(6),
    comentarios VARCHAR(250),
    imagen LONGTEXT,
    CONSTRAINT USU_id_FK FOREIGN KEY (idUsuario) REFERENCES USUARIOS (idUsuario) ON DELETE CASCADE ON UPDATE CASCADE
);

/* TABLA CONSULTAS */
CREATE TABLE IF NOT EXISTS CONSULTAS(
    idConsulta INT AUTO_INCREMENT PRIMARY KEY,
    idMascota INT,
    idUsuario INT,
    /* Veterinario que atienda la consulta */
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    diagnostico VARCHAR(250) NOT NULL,
    tratamiento VARCHAR(250),
    observaciones VARCHAR(250),
    CONSTRAINT MAS_id_FK FOREIGN KEY (idMascota) REFERENCES MASCOTAS (idMascota) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT USU_id_FK2 FOREIGN KEY (idUsuario) REFERENCES USUARIOS (idUsuario) ON DELETE SET NULL ON UPDATE CASCADE
);

/* TABLA VACUNAS */
CREATE TABLE IF NOT EXISTS VACUNAS(
    idVacuna INT AUTO_INCREMENT PRIMARY KEY,
    vacuna VARCHAR(50) NOT NULL UNIQUE,
    observaciones VARCHAR(250)
);

/* TABLA APLICA (VACUNAS) */
CREATE TABLE IF NOT EXISTS APLICA(
    idMascota INT,
    idVacuna INT,
    fecha DATE NOT NULL,
    CONSTRAINT APL_fec_PK PRIMARY KEY (idMascota, idVacuna, fecha),
    CONSTRAINT MAS_id_FK2 FOREIGN KEY (idMascota) REFERENCES MASCOTAS (idMascota) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT APL_id_FK FOREIGN KEY (idVacuna) REFERENCES VACUNAS (idVacuna) ON DELETE CASCADE ON UPDATE CASCADE
);