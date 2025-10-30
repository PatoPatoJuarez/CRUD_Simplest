-- ============================================
-- Script para limpiar datos sensibles y crear datos de prueba
-- Ejecutar ANTES de hacer el backup para compartir
-- ============================================

USE GestionJuicios;
GO

-- Eliminar TODOS los datos existentes
DELETE FROM Historial;
DELETE FROM Juicio;
DELETE FROM Abogado;
GO

-- Resetear los IDs (identity)
DBCC CHECKIDENT ('Historial', RESEED, 0);
DBCC CHECKIDENT ('Juicio', RESEED, 0);
DBCC CHECKIDENT ('Abogado', RESEED, 0);
GO

-- Crear usuario de prueba
-- Contraseña: Test123! (hasheada con bcrypt)
INSERT INTO Abogado (Nombre, Email, Contraseña) VALUES 
('Dr. Juan Pérez', 'abogado@test.com', '$2b$10$UZp4ABj.nudm4b3XLkQA.Ofnd0wotPSBO2.oPNQLqz4xdO3ZsArda');
GO

-- Crear juicios de ejemplo
DECLARE @ID_Abogado INT = (SELECT ID_Abogado FROM Abogado WHERE Email = 'abogado@test.com');

INSERT INTO Juicio (ID_Abogado, Caratula, FechaInicio) VALUES
(@ID_Abogado, 'García c/ López s/ Daños y Perjuicios', '2024-01-15'),
(@ID_Abogado, 'Empresa XYZ c/ Estado Nacional s/ Acción de Amparo', '2024-03-20'),
(@ID_Abogado, 'Rodríguez c/ Municipalidad s/ Contencioso Administrativo', '2024-06-10');
GO

-- Crear entradas de historial de ejemplo
DECLARE @ID_Juicio1 INT = (SELECT TOP 1 ID_Juicio FROM Juicio ORDER BY ID_Juicio);
DECLARE @ID_Juicio2 INT = (SELECT ID_Juicio FROM Juicio ORDER BY ID_Juicio OFFSET 1 ROWS FETCH NEXT 1 ROWS ONLY);

INSERT INTO Historial (ID_Juicio, Fecha, Descripcion) VALUES
(@ID_Juicio1, '2024-01-20', 'Audiencia preliminar. Se fijó fecha para presentación de pruebas.'),
(@ID_Juicio1, '2024-02-10', 'Presentación de testigos. Declararon 3 testigos de la parte actora.'),
(@ID_Juicio1, '2024-03-05', 'Alegatos finales. Ambas partes presentaron sus conclusiones.'),
(@ID_Juicio2, '2024-03-25', 'Se admitió la acción de amparo. Notificación a la parte demandada.'),
(@ID_Juicio2, '2024-04-15', 'Responde el Estado Nacional. Se solicita ampliación de plazo.');
GO

PRINT '✅ Base de datos limpiada y datos de prueba creados exitosamente';
PRINT '';
PRINT '📋 CREDENCIALES DE PRUEBA:';
PRINT '   Email: abogado@test.com';
PRINT '   Contraseña: Test123!';
PRINT '';
PRINT '⚠️  IMPORTANTE: Genera el hash de contraseña correcto ejecutando en Node.js:';
PRINT '   bcrypt.hash("Test123!", 10)';
GO
