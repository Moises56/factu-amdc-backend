-- CreateTable
CREATE TABLE `Mercado` (
    `id` VARCHAR(191) NOT NULL,
    `nombre_mercado` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `latitud` DOUBLE NOT NULL,
    `longitud` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Mercado_nombre_mercado_key`(`nombre_mercado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Local` (
    `id` VARCHAR(191) NOT NULL,
    `nombre_local` VARCHAR(191) NOT NULL,
    `numero_local` VARCHAR(191) NOT NULL,
    `permiso_operacion` VARCHAR(191) NOT NULL,
    `tipo_local` VARCHAR(191) NOT NULL,
    `direccion_local` VARCHAR(191) NOT NULL,
    `estado_local` VARCHAR(191) NOT NULL,
    `monto` DECIMAL(10, 2) NOT NULL,
    `propietario` VARCHAR(191) NOT NULL,
    `DNI` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `latitud` DOUBLE NOT NULL,
    `longitud` DOUBLE NOT NULL,
    `mercadoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `gerencia` VARCHAR(191) NULL,
    `numero_empleado` INTEGER NULL,
    `role` ENUM('USER', 'ADMIN', 'MARKET') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Factura` (
    `id` VARCHAR(191) NOT NULL,
    `mercado` VARCHAR(191) NOT NULL,
    `propietario` VARCHAR(191) NOT NULL,
    `nombre_local` VARCHAR(191) NOT NULL,
    `numero_local` INTEGER NOT NULL,
    `concepto` VARCHAR(191) NOT NULL,
    `mes` VARCHAR(191) NOT NULL,
    `monto` DECIMAL(10, 2) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `DNI` VARCHAR(191) NOT NULL,
    `permiso_operacion` VARCHAR(191) NOT NULL,
    `localId` VARCHAR(191) NOT NULL,
    `correlativo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Local` ADD CONSTRAINT `Local_mercadoId_fkey` FOREIGN KEY (`mercadoId`) REFERENCES `Mercado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_localId_fkey` FOREIGN KEY (`localId`) REFERENCES `Local`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
