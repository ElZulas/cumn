-- Script para configurar la base de datos TiendaRopa
-- Ejecutar este script en tu base de datos MySQL (Railway, PlanetScale, etc.)

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS tiendaropa;
USE tiendaropa;

-- Crear tabla Productos
CREATE TABLE IF NOT EXISTS Productos (
    ID_Producto INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion TEXT,
    Talla VARCHAR(10),
    Color VARCHAR(50),
    Precio DECIMAL(10,2) NOT NULL,
    Marca VARCHAR(50),
    Tipo_Prenda VARCHAR(50),
    Temporada VARCHAR(50),
    Stock INT DEFAULT 0,
    ID_Proveedor INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla Clientes
CREATE TABLE IF NOT EXISTS Clientes (
    ID_Cliente INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Telefono VARCHAR(20),
    Correo VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla Proveedores
CREATE TABLE IF NOT EXISTS Proveedores (
    ID_Proveedor INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Telefono VARCHAR(20),
    Correo VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla Ventas
CREATE TABLE IF NOT EXISTS Ventas (
    ID_Venta INT AUTO_INCREMENT PRIMARY KEY,
    Fecha DATE NOT NULL,
    Total DECIMAL(10,2) NOT NULL,
    ID_Cliente INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID_Cliente) ON DELETE SET NULL
);

-- Crear tabla Ropa_de_temporada
CREATE TABLE IF NOT EXISTS Ropa_de_temporada (
    ID_Temporada INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(200) NOT NULL,
    Fecha_Inicio DATE,
    Fecha_Fin DATE,
    Descuento INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla Detalle_venta (opcional)
CREATE TABLE IF NOT EXISTS Detalle_venta (
    ID_Detalle INT AUTO_INCREMENT PRIMARY KEY,
    ID_Venta INT,
    ID_Producto INT,
    Cantidad INT NOT NULL,
    Precio_Unitario DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Venta) REFERENCES Ventas(ID_Venta) ON DELETE CASCADE,
    FOREIGN KEY (ID_Producto) REFERENCES Productos(ID_Producto) ON DELETE CASCADE
);

-- Insertar datos de ejemplo
INSERT INTO Clientes (Nombre, Telefono, Correo) VALUES
('Juan Pérez', '555-0101', 'juan@email.com'),
('María García', '555-0102', 'maria@email.com'),
('Carlos López', '555-0103', 'carlos@email.com');

INSERT INTO Proveedores (Nombre, Telefono, Correo) VALUES
('Proveedor A', '555-1001', 'proveedorA@email.com'),
('Proveedor B', '555-1002', 'proveedorB@email.com'),
('Proveedor C', '555-1003', 'proveedorC@email.com');

INSERT INTO Productos (Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock) VALUES
('Camisa Azul', 'Camisa de algodón azul', 'M', 'Azul', 29.99, 'Marca A', 'Camisa', 'Verano', 10),
('Pantalón Negro', 'Pantalón de vestir negro', 'L', 'Negro', 49.99, 'Marca B', 'Pantalón', 'Otoño', 15),
('Vestido Rojo', 'Vestido elegante rojo', 'S', 'Rojo', 79.99, 'Marca C', 'Vestido', 'Primavera', 8);

INSERT INTO Ventas (Fecha, Total, ID_Cliente) VALUES
('2024-01-15', 29.99, 1),
('2024-01-16', 129.98, 2),
('2024-01-17', 79.99, 3);

INSERT INTO Ropa_de_temporada (Descripcion, Fecha_Inicio, Fecha_Fin, Descuento) VALUES
('Colección Verano 2024', '2024-06-01', '2024-08-31', 20),
('Colección Otoño 2024', '2024-09-01', '2024-11-30', 15);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_productos_nombre ON Productos(Nombre);
CREATE INDEX idx_clientes_nombre ON Clientes(Nombre);
CREATE INDEX idx_ventas_fecha ON Ventas(Fecha);
CREATE INDEX idx_ventas_cliente ON Ventas(ID_Cliente);

-- Mostrar estadísticas
SELECT 
    'Productos' as tabla, COUNT(*) as total FROM Productos
UNION ALL
SELECT 'Clientes', COUNT(*) FROM Clientes
UNION ALL
SELECT 'Proveedores', COUNT(*) FROM Proveedores
UNION ALL
SELECT 'Ventas', COUNT(*) FROM Ventas
UNION ALL
SELECT 'Temporadas', COUNT(*) FROM Ropa_de_temporada; 