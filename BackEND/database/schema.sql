-- ============================================
-- Script de Base de Datos - Sistema de Gestión de Juicios
-- ============================================

-- Crear base de datos
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'GestionJuicios')
BEGIN
    CREATE DATABASE GestionJuicios;
END
GO

USE GestionJuicios;
GO

-- Tabla Abogado (Usuario)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Abogado')
BEGIN
    CREATE TABLE Abogado (
        ID_Abogado INT PRIMARY KEY IDENTITY(1,1),
        Nombre NVARCHAR(100) NOT NULL,
        Email NVARCHAR(100) NOT NULL UNIQUE,
        Contraseña NVARCHAR(255) NOT NULL,
        FechaCreacion DATETIME DEFAULT GETDATE()
    );
END
GO

-- Tabla Juicio
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Juicio')
BEGIN
    CREATE TABLE Juicio (
        ID_Juicio INT PRIMARY KEY IDENTITY(1,1),
        ID_Abogado INT NOT NULL,
        Caratula NVARCHAR(255) NOT NULL,
        FechaInicio DATE NOT NULL,
        FechaCreacion DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (ID_Abogado) REFERENCES Abogado(ID_Abogado) ON DELETE CASCADE
    );
END
GO

-- Tabla Historial
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Historial')
BEGIN
    CREATE TABLE Historial (
        ID_Historial INT PRIMARY KEY IDENTITY(1,1),
        ID_Juicio INT NOT NULL,
        Fecha DATE NOT NULL,
        Descripcion NVARCHAR(MAX) NOT NULL,
        FechaCreacion DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (ID_Juicio) REFERENCES Juicio(ID_Juicio) ON DELETE CASCADE
    );
END
GO

-- Índices para mejorar performance
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Juicio_Abogado')
    CREATE INDEX IX_Juicio_Abogado ON Juicio(ID_Abogado);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Historial_Juicio')
    CREATE INDEX IX_Historial_Juicio ON Historial(ID_Juicio);
GO

PRINT 'Base de datos y tablas creadas exitosamente';
