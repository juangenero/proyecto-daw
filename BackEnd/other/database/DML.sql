/* AÑADIR CLIENTES */
INSERT INTO
    USUARIOS
VALUES
    (
        0,
        md5('Pedro123'),
        'Pedro',
        'Marín Rivas',
        '38472958B',
        '693650105',
        'pedro.rivas@gmail.com',
        'Alcalá de Guadaira',
        'Sevilla',
        40403,
        '2022-1-15',
        '1992-6-25',
        0,
        null
    ),
    (
        0,
        md5('Angel123'),
        'Ángel',
        'Sanchez Pedrosa',
        '92746526B',
        '739274615',
        'angel.sanchez@gmail.com',
        'Lebrija',
        'Sevilla',
        40209,
        '2022-2-16',
        '1982-7-20',
        0,
        null
    ),
    (
        0,
        md5('Ana123'),
        'Ana',
        'Espinosa de los Monteros',
        '13579782C',
        '603819574',
        'ana.espinosa@gmail.com',
        'Castillejo',
        'Sevilla',
        40403,
        '2022-3-17',
        '1972-8-30',
        0,
        null
    ),
    (
        0,
        md5('David123'),
        'David',
        'Gonzalez Bilbao',
        '92749264D',
        '955837163',
        'david.gonzalez@gmail.com',
        'Coria del rio',
        'Sevilla',
        40403,
        '2022-4-18',
        '1965-2-20',
        0,
        null
    ),
    (
        0,
        md5('Sofia123'),
        'Sofía',
        'Platero Pérez',
        '13243585H',
        '692745194',
        'sofia.platero@gmail.com',
        'Sevilla',
        'Sevilla',
        40403,
        '2022-5-19',
        '1983-7-20',
        0,
        null
    ),
    (
        0,
        md5('Francisco123'),
        'Francisco',
        'Fernandez Tirado',
        '57249264S',
        '692745100',
        'fran.fernandez@gmail.com',
        'Mairena',
        'Sevilla',
        40403,
        '2022-6-21',
        '1973-2-20',
        0,
        null
    ),
    (
        0,
        md5('Noelia123'),
        'Noelia',
        'Gonzalez Chico',
        '24729462Q',
        '683016492',
        'noelia.gonzalez@gmail.com',
        'Sevilla',
        'Sevilla',
        40403,
        '2022-7-22',
        '1988-1-1',
        0,
        null
    ),
    (
        0,
        md5('Antonio123'),
        'Antonio',
        'Reina Páez',
        '24836284T',
        '746284936',
        'antonio.reina@gmail.com',
        'Alcalá de Guadaira',
        'Sevilla',
        40209,
        '2022-8-23',
        '1978-4-3',
        0,
        null
    ),
    (
        0,
        md5('Laura123'),
        'Laura',
        'Romero Nuñez',
        '52837467L',
        '68361844',
        'laura.romero@gmail.com',
        'Alcalá de Guadaira',
        'Sevilla',
        40209,
        '2022-9-25',
        '1997-12-25',
        0,
        null
    ),
    (
        0,
        md5('Eva123'),
        'Eva',
        'Solís Sánchez',
        '82649182N',
        '955738564',
        'eva.solis@gmail.com',
        'Tomares',
        'Sevilla',
        40209,
        '2022-10-26',
        '1970-12-21',
        0,
        null
    );

/* AÑADIR VETERINARIOS */
INSERT INTO
    USUARIOS
VALUES
    (
        0,
        md5('Soraya123'),
        'Soraya',
        'Moreno Pérez',
        '24687531P',
        '687463257',
        'soraya.moreno@gmail.com',
        'Bormujo',
        'Sevilla',
        40209,
        '2022-11-1',
        '1981-4-25',
        1,
        null
    ),
    (
        0,
        md5('Alvaro123'),
        'Álvaro',
        'García Núñez',
        '12367845O',
        '623864264',
        'alvaro.garcia@gmail.com',
        'Sevilla',
        'Sevilla',
        40209,
        '2022-12-15',
        '1969-3-30',
        1,
        null
    ),
    (
        0,
        md5('Carmen123'),
        'Carmen',
        'Salvador Tirado',
        '24689636Y',
        '622123567',
        'carmen.salvador@gmail.com',
        'Alcalá de Guadaira',
        'Sevilla',
        40209,
        '2022-2-26',
        '1993-7-20',
        1,
        null
    );

/* AÑADIR MASCOTAS */
INSERT INTO
    MASCOTAS
VALUES
    (
        0,
        2,
        'Rita',
        'felino',
        'siamés',
        'hembra',
        2.3,
        '2022-5-3',
        '2019-8-26',
        14.2,
        null,
        null
    ),
    (
        0,
        2,
        'Rols',
        'canino',
        'Fox Terrier',
        'macho',
        4.5,
        '2022-6-21',
        '2018-2-10',
        18,
        'Se encuentra castrado',
        null
    ),
    (
        0,
        3,
        'Púa',
        'reptil',
        'camaleón',
        null,
        4.5,
        '2022-7-14',
        '2017-3-3',
        15.3,
        null,
        null
    ),
    (
        0,
        3,
        'Cara',
        'pez',
        null,
        null,
        0.12,
        '2022-8-2',
        '2018-2-22',
        12.3,
        'Se encuentra castrado',
        null
    ),
    (
        0,
        7,
        'Cartago',
        'canino',
        'Grandanés',
        'hembra',
        13.4,
        '2022-9-24',
        '2019-4-24',
        17.4,
        null,
        null
    ),
    (
        0,
        8,
        'Perta',
        'canino',
        null,
        'macho',
        2.3,
        '2022-2-15',
        '2015-10-15',
        19.2,
        'Tiene una lesión en la pata izquierrda',
        null
    ),
    (
        0,
        5,
        'Chico',
        'felino',
        'persa',
        'hembra',
        1.9,
        '2022-3-26',
        '2019-5-14',
        11.9,
        null,
        null
    ),
    (
        0,
        5,
        'capi',
        'ave',
        'canario',
        'macho',
        0.19,
        '2022-4-13',
        '2016-2-20',
        6.2,
        'Se encuentra castrado',
        null
    ),
    (
        0,
        10,
        'lázaro',
        'araña',
        null,
        null,
        0.04,
        '2022-7-16',
        '2021-3-13',
        0.9,
        'Es muy asustadiza',
        null
    );

/* AÑADIR CONSULTAS */
INSERT INTO
    CONSULTAS
VALUES
    (
        0,
        2,
        11,
        '2022-7-24',
        '17:30:00',
        'Tiene la pata izquierda dañada',
        'Untar pomada durante 3 días',
        null
    ),
    (
		0,
        2,
        12,
        '2022-8-20',
        '20:00:00',
        'Revisión de la para izquierda',
        null,
        'Pata izquierda totalmente curada'
    ),
    (
        0,
        4,
        11,
        '2022-8-15',
        '17:50:00',
        'Tiene una escama muy sobresaliente',
        null,
        'Tenía un pequeño cristal incrutado'
    ),
    (
        0,
        6,
        11,
        '2022-9-6',
        '18:45:00',
        'Corte de pelo',
        null,
        'Corte de pelo'
    ),
    (
        0,
        8,
        11,
        '2022-8-27',
        '20:30:00',
        'Tiene una pluma quemada',
        'Untar pomada durante 7 días',
        'El cliente indica que pasó cerca de un calentador'
    ),
    (
        0,
        9,
        11,
        '2022-7-18',
        '19:30:00',
        'Tiene la pata derecha dañada',
        'Vitaminas en polvo',
        null
    );

/* AÑADIR VACUNAS */
INSERT INTO
    VACUNAS
VALUES
    (0, 'Moquillo', 'Aplicable a todos los perros'),
    (0, 'Rabia', null),
    (
        0,
        'Leptospirosis',
        'Para los que hacen mucha vida en exterior'
    ),
    (
        0,
        'Parvovirus',
        'Aplicable sólo a algunos gatos'
    );

/* AÑADIR APLICACIONES DE VACUNAS */
INSERT INTO
    APLICA
VALUES
    (1, 4, '2022-8-30'),
    (2, 1, '2022-11-5'),
    (2, 3, '2023-01-15');