const express = require('express');
const { Pool } = require('pg');
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

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Verificar conexión
pool.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err);
        return;
    }
    console.log('✅ Conectado a la base de datos PostgreSQL');
});

// Rutas de la API
app.get('/', (req, res) => {
    res.json({
        message: '🏪 TiendaRopa API (PostgreSQL)',
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
        environment: process.env.NODE_ENV || 'development',
        database: 'PostgreSQL'
    });
});

// API Routes
app.get('/api/productos', (req, res) => {
    const query = 'SELECT * FROM productos ORDER BY id_producto DESC';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results.rows);
    });
});

app.post('/api/productos', (req, res) => {
    const { nombre, descripcion, talla, color, precio, marca, tipo_prenda, temporada, stock, id_proveedor } = req.body;
    
    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Nombre y precio son requeridos' });
    }

    const query = `
        INSERT INTO productos (nombre, descripcion, talla, color, precio, marca, tipo_prenda, temporada, stock, id_proveedor)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
    `;
    
    pool.query(query, [nombre, descripcion, talla, color, precio, marca, tipo_prenda, temporada, stock, id_proveedor], (err, result) => {
        if (err) {
            console.error('Error al crear producto:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(result.rows[0]);
    });
});

app.get('/api/clientes', (req, res) => {
    const query = 'SELECT * FROM clientes ORDER BY id_cliente DESC';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener clientes:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results.rows);
    });
});

app.post('/api/clientes', (req, res) => {
    const { nombre, telefono, correo } = req.body;
    
    if (!nombre) {
        return res.status(400).json({ error: 'Nombre es requerido' });
    }

    const query = 'INSERT INTO clientes (nombre, telefono, correo) VALUES ($1, $2, $3) RETURNING *';
    
    pool.query(query, [nombre, telefono, correo], (err, result) => {
        if (err) {
            console.error('Error al crear cliente:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(result.rows[0]);
    });
});

app.get('/api/ventas', (req, res) => {
    const query = `
        SELECT v.*, c.nombre as cliente_nombre 
        FROM ventas v 
        LEFT JOIN clientes c ON v.id_cliente = c.id_cliente 
        ORDER BY v.id_venta DESC
    `;
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener ventas:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results.rows);
    });
});

app.post('/api/ventas', (req, res) => {
    const { fecha, total, id_cliente } = req.body;
    
    if (!fecha || !total) {
        return res.status(400).json({ error: 'Fecha y total son requeridos' });
    }

    const query = 'INSERT INTO ventas (fecha, total, id_cliente) VALUES ($1, $2, $3) RETURNING *';
    
    pool.query(query, [fecha, total, id_cliente], (err, result) => {
        if (err) {
            console.error('Error al crear venta:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(result.rows[0]);
    });
});

app.get('/api/proveedores', (req, res) => {
    const query = 'SELECT * FROM proveedores ORDER BY id_proveedor DESC';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener proveedores:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results.rows);
    });
});

app.post('/api/proveedores', (req, res) => {
    const { nombre, telefono, correo } = req.body;
    
    if (!nombre) {
        return res.status(400).json({ error: 'Nombre es requerido' });
    }

    const query = 'INSERT INTO proveedores (nombre, telefono, correo) VALUES ($1, $2, $3) RETURNING *';
    
    pool.query(query, [nombre, telefono, correo], (err, result) => {
        if (err) {
            console.error('Error al crear proveedor:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(result.rows[0]);
    });
});

app.get('/api/ropa_temporada', (req, res) => {
    const query = 'SELECT * FROM ropa_de_temporada ORDER BY id_temporada DESC';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener temporadas:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results.rows);
    });
});

app.post('/api/ropa_temporada', (req, res) => {
    const { descripcion, fecha_inicio, fecha_fin, descuento } = req.body;
    
    if (!descripcion) {
        return res.status(400).json({ error: 'Descripción es requerida' });
    }

    const query = 'INSERT INTO ropa_de_temporada (descripcion, fecha_inicio, fecha_fin, descuento) VALUES ($1, $2, $3, $4) RETURNING *';
    
    pool.query(query, [descripcion, fecha_inicio, fecha_fin, descuento], (err, result) => {
        if (err) {
            console.error('Error al crear temporada:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(result.rows[0]);
    });
});

app.get('/api/stats', async (req, res) => {
    try {
        const stats = {};
        
        // Contar productos
        const productosResult = await pool.query('SELECT COUNT(*) FROM productos');
        stats.productos = parseInt(productosResult.rows[0].count);
        
        // Contar clientes
        const clientesResult = await pool.query('SELECT COUNT(*) FROM clientes');
        stats.clientes = parseInt(clientesResult.rows[0].count);
        
        // Contar ventas
        const ventasResult = await pool.query('SELECT COUNT(*) FROM ventas');
        stats.ventas = parseInt(ventasResult.rows[0].count);
        
        // Contar proveedores
        const proveedoresResult = await pool.query('SELECT COUNT(*) FROM proveedores');
        stats.proveedores = parseInt(proveedoresResult.rows[0].count);
        
        // Contar temporadas
        const temporadasResult = await pool.query('SELECT COUNT(*) FROM ropa_de_temporada');
        stats.temporadas = parseInt(temporadasResult.rows[0].count);
        
        res.json({
            message: 'Estadísticas de la base de datos',
            timestamp: new Date().toISOString(),
            stats
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor API iniciado en puerto ${PORT}`);
    console.log(`📊 Base de datos: PostgreSQL`);
    console.log(`🌐 API disponible en: http://localhost:${PORT}`);
    console.log(`📖 Documentación: http://localhost:${PORT}/`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM recibido, cerrando servidor...');
    pool.end();
    process.exit(0);
}); 