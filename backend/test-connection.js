const mysql = require('mysql2');
const configRemoto = require('../config-remoto');

console.log('🔍 Probando conexión a la base de datos remota...');
console.log(`📍 Host: ${configRemoto.host}`);
console.log(`👤 Usuario: ${configRemoto.user}`);
console.log(`📊 Base de datos: ${configRemoto.database}`);
console.log(`🔌 Puerto: ${configRemoto.port}`);
console.log('');

const connection = mysql.createConnection(configRemoto);

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar:', err.message);
    console.error('💡 Posibles soluciones:');
    console.error('   - Verifica que la IP sea correcta');
    console.error('   - Confirma que MySQL esté ejecutándose en el servidor remoto');
    console.error('   - Verifica que el firewall permita conexiones al puerto 3306');
    console.error('   - Confirma que las credenciales sean correctas');
    process.exit(1);
  }
  
  console.log('✅ Conexión exitosa a la base de datos remota!');
  
  // Probar una consulta simple
  connection.query('SELECT 1 as test', (err, results) => {
    if (err) {
      console.error('❌ Error en consulta de prueba:', err.message);
    } else {
      console.log('✅ Consulta de prueba exitosa');
    }
    
    connection.end();
    process.exit(0);
  });
}); 