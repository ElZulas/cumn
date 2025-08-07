// Configuración para conexión remota a MySQL
// Modifica estos valores con la información de tu amigo

const configRemoto = {
    host: '10.3.0.144', // Nueva IP de tu amigo
    user: 'root', // Usuario MySQL
    password: 'Preventa1', // Contraseña MySQL de tu amigo
    database: 'tiendaropa', // Nombre de la base de datos
    port: 3306, // Puerto MySQL
    // Opciones adicionales para conexión remota
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};

module.exports = configRemoto; 