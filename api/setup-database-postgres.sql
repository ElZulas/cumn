-- Script para configurar la base de datos TiendaRopa en PostgreSQL
-- Ejecutar este script en tu base de datos Supabase

-- Crear tabla Productos
CREATE TABLE IF NOT EXISTS productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    talla VARCHAR(10),
    color VARCHAR(50),
    precio DECIMAL(10,2) NOT NULL,
    marca VARCHAR(50),
    tipo_prenda VARCHAR(50),
    temporada VARCHAR(50),
    stock INTEGER DEFAULT 0,
    id_proveedor INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Proveedores
CREATE TABLE IF NOT EXISTS proveedores (
    id_proveedor SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Ventas
CREATE TABLE IF NOT EXISTS ventas (
    id_venta SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    id_cliente INTEGER REFERENCES clientes(id_cliente) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Ropa_de_temporada
CREATE TABLE IF NOT EXISTS ropa_de_temporada (
    id_temporada SERIAL PRIMARY KEY,
    descripcion VARCHAR(200) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    descuento INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Detalle_venta (opcional)
CREATE TABLE IF NOT EXISTS detalle_venta (
    id_detalle SERIAL PRIMARY KEY,
    id_venta INTEGER REFERENCES ventas(id_venta) ON DELETE CASCADE,
    id_producto INTEGER REFERENCES productos(id_producto) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO clientes (nombre, telefono, correo) VALUES
('Juan Pérez', '555-0101', 'juan@email.com'),
('María García', '555-0102', 'maria@email.com'),
('Carlos López', '555-0103', 'carlos@email.com');

INSERT INTO proveedores (nombre, telefono, correo) VALUES
('Proveedor A', '555-1001', 'proveedorA@email.com'),
('Proveedor B', '555-1002', 'proveedorB@email.com'),
('Proveedor C', '555-1003', 'proveedorC@email.com');

INSERT INTO productos (nombre, descripcion, talla, color, precio, marca, tipo_prenda, temporada, stock) VALUES
('Camisa Azul', 'Camisa de algodón azul', 'M', 'Azul', 29.99, 'Marca A', 'Camisa', 'Verano', 10),
('Pantalón Negro', 'Pantalón de vestir negro', 'L', 'Negro', 49.99, 'Marca B', 'Pantalón', 'Otoño', 15),
('Vestido Rojo', 'Vestido elegante rojo', 'S', 'Rojo', 79.99, 'Marca C', 'Vestido', 'Primavera', 8);

INSERT INTO ventas (fecha, total, id_cliente) VALUES
('2024-01-15', 29.99, 1),
('2024-01-16', 129.98, 2),
('2024-01-17', 79.99, 3);

INSERT INTO ropa_de_temporada (descripcion, fecha_inicio, fecha_fin, descuento) VALUES
('Colección Verano 2024', '2024-06-01', '2024-08-31', 20),
('Colección Otoño 2024', '2024-09-01', '2024-11-30', 15);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_productos_nombre ON productos(nombre);
CREATE INDEX IF NOT EXISTS idx_clientes_nombre ON clientes(nombre);
CREATE INDEX IF NOT EXISTS idx_ventas_fecha ON ventas(fecha);
CREATE INDEX IF NOT EXISTS idx_ventas_cliente ON ventas(id_cliente);

-- Mostrar estadísticas
SELECT 
    'Productos' as tabla, COUNT(*) as total FROM productos
UNION ALL
SELECT 'Clientes', COUNT(*) FROM clientes
UNION ALL
SELECT 'Proveedores', COUNT(*) FROM proveedores
UNION ALL
SELECT 'Ventas', COUNT(*) FROM ventas
UNION ALL
SELECT 'Temporadas', COUNT(*) FROM ropa_de_temporada; 