const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de seguridad
app.use(helmet());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://tu-frontend.vercel.app', 'https://tu-frontend.netlify.app']
        : '*'
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por ventana
    message: 'Demasiadas requests desde esta IP, intenta de nuevo más tarde.'
});
app.use('/api/', limiter);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la base de datos
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'tiendaropa',
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Verificar conexión
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err);
        return;
    }
    console.log('✅ Conectado a la base de datos MySQL');
    connection.release();
});

// Rutas de la API
app.get('/', (req, res) => {
    res.json({
        message: '🏪 TiendaRopa API',
        version: '1.0.0',
        status: 'Activo',
        endpoints: {
            productos: '/api/productos',
            clientes: '/api/clientes',
            ventas: '/api/ventas',
            proveedores: '/api/proveedores',
            temporada: '/api/ropa_temporada',
            stats: '/api/stats'
        }
    });
});

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API funcionando correctamente',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API Routes
app.get('/api/productos', (req, res) => {
    const query = 'SELECT * FROM Productos ORDER BY ID_Producto DESC';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results);
    });
});

app.post('/api/productos', (req, res) => {
    const { Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor } = req.body;
    
    if (!Nombre || !Precio) {
        return res.status(400).json({ error: 'Nombre y precio son requeridos' });
    }

    const query = 'INSERT INTO Productos (Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    pool.query(query, [Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor], (err, result) => {
        if (err) {
            console.error('Error al crear producto:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(201).json({ 
            id: result.insertId, 
            message: 'Producto creado exitosamente',
            producto: { ID_Producto: result.insertId, Nombre, Precio }
        });
    });
});

app.get('/api/clientes', (req, res) => {
    const query = 'SELECT * FROM Clientes ORDER BY ID_Cliente DESC';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener clientes:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results);
    });
});

app.post('/api/clientes', (req, res) => {
    const { Nombre, Telefono, Correo } = req.body;
    
    if (!Nombre) {
        return res.status(400).json({ error: 'Nombre es requerido' });
    }

    const query = 'INSERT INTO Clientes (Nombre, Telefono, Correo) VALUES (?, ?, ?)';
    
    pool.query(query, [Nombre, Telefono, Correo], (err, result) => {
        if (err) {
            console.error('Error al crear cliente:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(201).json({ 
            id: result.insertId, 
            message: 'Cliente creado exitosamente',
            cliente: { ID_Cliente: result.insertId, Nombre }
        });
    });
});

app.get('/api/ventas', (req, res) => {
    const query = `
        SELECT v.*, c.Nombre as ClienteNombre 
        FROM Ventas v 
        LEFT JOIN Clientes c ON v.ID_Cliente = c.ID_Cliente
        ORDER BY v.ID_Venta DESC
    `;
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener ventas:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results);
    });
});

app.post('/api/ventas', (req, res) => {
    const { Fecha, Total, ID_Cliente } = req.body;
    
    if (!Fecha || !Total) {
        return res.status(400).json({ error: 'Fecha y total son requeridos' });
    }

    const query = 'INSERT INTO Ventas (Fecha, Total, ID_Cliente) VALUES (?, ?, ?)';
    
    pool.query(query, [Fecha, Total, ID_Cliente], (err, result) => {
        if (err) {
            console.error('Error al crear venta:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(201).json({ 
            id: result.insertId, 
            message: 'Venta creada exitosamente',
            venta: { ID_Venta: result.insertId, Fecha, Total }
        });
    });
});

app.get('/api/proveedores', (req, res) => {
    const query = 'SELECT * FROM Proveedores ORDER BY ID_Proveedor DESC';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener proveedores:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results);
    });
});

app.post('/api/proveedores', (req, res) => {
    const { Nombre, Telefono, Correo } = req.body;
    
    if (!Nombre) {
        return res.status(400).json({ error: 'Nombre es requerido' });
    }

    const query = 'INSERT INTO Proveedores (Nombre, Telefono, Correo) VALUES (?, ?, ?)';
    
    pool.query(query, [Nombre, Telefono, Correo], (err, result) => {
        if (err) {
            console.error('Error al crear proveedor:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(201).json({ 
            id: result.insertId, 
            message: 'Proveedor creado exitosamente',
            proveedor: { ID_Proveedor: result.insertId, Nombre }
        });
    });
});

app.get('/api/ropa_temporada', (req, res) => {
    const query = 'SELECT * FROM Ropa_de_temporada ORDER BY ID_Temporada DESC';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener ropa de temporada:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results);
    });
});

app.post('/api/ropa_temporada', (req, res) => {
    const { Descripcion, Fecha_Inicio, Fecha_Fin, Descuento } = req.body;
    
    if (!Descripcion) {
        return res.status(400).json({ error: 'Descripción es requerida' });
    }

    const query = 'INSERT INTO Ropa_de_temporada (Descripcion, Fecha_Inicio, Fecha_Fin, Descuento) VALUES (?, ?, ?, ?)';
    
    pool.query(query, [Descripcion, Fecha_Inicio, Fecha_Fin, Descuento], (err, result) => {
        if (err) {
            console.error('Error al crear temporada:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(201).json({ 
            id: result.insertId, 
            message: 'Temporada creada exitosamente',
            temporada: { ID_Temporada: result.insertId, Descripcion }
        });
    });
});

// Estadísticas generales
app.get('/api/stats', async (req, res) => {
    try {
        const queries = {
            productos: 'SELECT COUNT(*) as count FROM Productos',
            clientes: 'SELECT COUNT(*) as count FROM Clientes',
            ventas: 'SELECT COUNT(*) as count FROM Ventas',
            proveedores: 'SELECT COUNT(*) as count FROM Proveedores',
            temporada: 'SELECT COUNT(*) as count FROM Ropa_de_temporada'
        };

        const stats = {};
        
        for (const [key, query] of Object.entries(queries)) {
            const [result] = await pool.promise().query(query);
            stats[key] = result[0].count;
        }

        res.json({
            stats,
            timestamp: new Date().toISOString(),
            total: Object.values(stats).reduce((a, b) => a + b, 0)
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Manejo de errores 404
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        message: 'La ruta solicitada no existe en la API'
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: 'Algo salió mal en el servidor'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor API iniciado en puerto ${PORT}`);
    console.log(`📊 Base de datos: ${dbConfig.database}`);
    console.log(`🌐 API disponible en: http://localhost:${PORT}`);
    console.log(`📖 Documentación: http://localhost:${PORT}/`);
});

// Manejo de cierre graceful
process.on('SIGINT', () => {
    console.log('\n🛑 Cerrando servidor API...');
    pool.end();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Cerrando servidor API...');
    pool.end();
    process.exit(0);
}); 