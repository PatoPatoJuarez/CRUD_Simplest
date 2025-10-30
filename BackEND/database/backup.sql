-- ============================================
-- BACKUP COMPLETO de la Base de Datos GestionJuicios
-- Para importar: Ejecutar este script en SQL Server Management Studio
-- ============================================

-- Crear base de datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'GestionJuicios')
BEGIN
    CREATE DATABASE GestionJuicios;
END
GO

USE GestionJuicios;
GO

-- ============================================
-- ESTRUCTURA DE TABLAS
-- ============================================

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

-- ============================================
-- DATOS DE EJEMPLO
-- ============================================

-- Usuario de prueba
-- Email: abogado@test.com
-- Contraseña: Test123!
IF NOT EXISTS (SELECT * FROM Abogado WHERE Email = 'abogado@test.com')
BEGIN
    INSERT INTO Abogado (Nombre, Email, Contraseña) VALUES 
    ('Dr. Juan Pérez', 'abogado@test.com', '$2b$10$UZp4ABj.nudm4b3XLkQA.Ofnd0wotPSBO2.oPNQLqz4xdO3ZsArda');
END
GO

-- Juicios de ejemplo
DECLARE @ID_Abogado INT = (SELECT ID_Abogado FROM Abogado WHERE Email = 'abogado@test.com');

IF NOT EXISTS (SELECT * FROM Juicio WHERE ID_Abogado = @ID_Abogado)
BEGIN
    INSERT INTO Juicio (ID_Abogado, Caratula, FechaInicio) VALUES
    (@ID_Abogado, 'García c/ López s/ Daños y Perjuicios', '2024-01-15'),
    (@ID_Abogado, 'Empresa XYZ c/ Estado Nacional s/ Acción de Amparo', '2024-03-20'),
    (@ID_Abogado, 'Rodríguez c/ Municipalidad s/ Contencioso Administrativo', '2024-06-10');
END
GO

-- Historial de ejemplo
DECLARE @ID_Juicio1 INT = (SELECT TOP 1 ID_Juicio FROM Juicio ORDER BY ID_Juicio);
DECLARE @ID_Juicio2 INT = (SELECT ID_Juicio FROM Juicio ORDER BY ID_Juicio OFFSET 1 ROWS FETCH NEXT 1 ROWS ONLY);

IF NOT EXISTS (SELECT * FROM Historial WHERE ID_Juicio = @ID_Juicio1)
BEGIN
    INSERT INTO Historial (ID_Juicio, Fecha, Descripcion) VALUES
    (@ID_Juicio1, '2024-01-20', 'Audiencia preliminar. Se fijó fecha para presentación de pruebas.'),
    (@ID_Juicio1, '2024-02-10', 'Presentación de testigos. Declararon 3 testigos de la parte actora.'),
    (@ID_Juicio1, '2024-03-05', 'Alegatos finales. Ambas partes presentaron sus conclusiones.');
END

IF NOT EXISTS (SELECT * FROM Historial WHERE ID_Juicio = @ID_Juicio2)
BEGIN
    INSERT INTO Historial (ID_Juicio, Fecha, Descripcion) VALUES
    (@ID_Juicio2, '2024-03-25', 'Se admitió la acción de amparo. Notificación a la parte demandada.'),
    (@ID_Juicio2, '2024-04-15', 'Responde el Estado Nacional. Se solicita ampliación de plazo.');
END
GO

PRINT '✅ Base de datos restaurada exitosamente';
PRINT '';
PRINT '📋 CREDENCIALES DE PRUEBA:';
PRINT '   Email: abogado@test.com';
PRINT '   Contraseña: Test123!';
GO
