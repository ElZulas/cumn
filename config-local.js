// Configuración para conexión local a MySQL
// Configuración para usar base de datos local

const configLocal = {
    host: 'localhost',
    user: 'root',
    password: '1234', // Contraseña correcta
    database: 'tiendaropa', // Nombre de la base de datos local
    port: 3306,
    // Opciones adicionales para conexión local
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};

module.exports = configLocal; 