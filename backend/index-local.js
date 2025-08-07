const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const configLocal = require('../config-local.js');

const app = express();
const port = 3001; // Puerto diferente para evitar conflictos

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../')); // Servir archivos estáticos desde el directorio padre

// Crear conexión a la base de datos local
const connection = mysql.createConnection(configLocal);

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos local:', err);
        return;
    }
    console.log('✅ Conectado a la base de datos local MySQL');
});

// Rutas API para productos
app.get('/productos', (req, res) => {
    const query = 'SELECT * FROM Productos';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results);
    });
});

app.post('/productos', (req, res) => {
    const { Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor } = req.body;
    const query = 'INSERT INTO Productos (Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    connection.query(query, [Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor], (err, result) => {
        if (err) {
            console.error('Error al crear producto:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ id: result.insertId, message: 'Producto creado exitosamente' });
    });
});

// Rutas API para clientes
app.get('/clientes', (req, res) => {
    const query = 'SELECT * FROM Clientes';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener clientes:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results);
    });
});

app.post('/clientes', (req, res) => {
    const { Nombre, Telefono, Correo } = req.body;
    const query = 'INSERT INTO Clientes (Nombre, Telefono, Correo) VALUES (?, ?, ?)';
    
    connection.query(query, [Nombre, Telefono, Correo], (err, result) => {
        if (err) {
            console.error('Error al crear cliente:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ id: result.insertId, message: 'Cliente creado exitosamente' });
    });
});

// Rutas API para ventas
app.get('/ventas', (req, res) => {
    const query = `
        SELECT v.*, c.Nombre as ClienteNombre 
        FROM Ventas v 
        LEFT JOIN Clientes c ON v.ID_Cliente = c.ID_Cliente
    `;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener ventas:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results);
    });
});

app.post('/ventas', (req, res) => {
    const { Fecha, Total, ID_Cliente } = req.body;
    const query = 'INSERT INTO Ventas (Fecha, Total, ID_Cliente) VALUES (?, ?, ?)';
    
    connection.query(query, [Fecha, Total, ID_Cliente], (err, result) => {
        if (err) {
            console.error('Error al crear venta:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ id: result.insertId, message: 'Venta creada exitosamente' });
    });
});

// Rutas API para proveedores
app.get('/proveedores', (req, res) => {
    const query = 'SELECT * FROM Proveedores';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener proveedores:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results);
    });
});

app.post('/proveedores', (req, res) => {
    const { Nombre, Telefono, Correo } = req.body;
    const query = 'INSERT INTO Proveedores (Nombre, Telefono, Correo) VALUES (?, ?, ?)';
    
    connection.query(query, [Nombre, Telefono, Correo], (err, result) => {
        if (err) {
            console.error('Error al crear proveedor:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ id: result.insertId, message: 'Proveedor creado exitosamente' });
    });
});

// Ruta para obtener ropa de temporada
app.get('/ropa_temporada', (req, res) => {
    const query = 'SELECT * FROM Ropa_de_temporada';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener ropa de temporada:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results);
    });
});

app.post('/ropa_temporada', (req, res) => {
    const { Descripcion, Fecha_Inicio, Fecha_Fin, Descuento } = req.body;
    const query = 'INSERT INTO Ropa_de_temporada (Descripcion, Fecha_Inicio, Fecha_Fin, Descuento) VALUES (?, ?, ?, ?)';
    
    connection.query(query, [Descripcion, Fecha_Inicio, Fecha_Fin, Descuento], (err, result) => {
        if (err) {
            console.error('Error al crear temporada:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ id: result.insertId, message: 'Temporada creada exitosamente' });
    });
});

// Ruta de prueba
app.get('/test', (req, res) => {
    res.json({ 
        message: 'Servidor local funcionando correctamente',
        timestamp: new Date().toISOString(),
        database: 'TiendaRopa (Local)'
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`🚀 Servidor local iniciado en http://localhost:${port}`);
    console.log(`📊 Base de datos: TiendaRopa (Local)`);
    console.log(`🌐 API disponible en: http://localhost:${port}/test`);
});

// Manejo de errores
process.on('SIGINT', () => {
    console.log('\n🛑 Cerrando servidor local...');
    connection.end();
    process.exit(0);
}); 