console.log('🚀 Iniciando servidor backend...');

try {
  require('./index-remoto.js');
  console.log('✅ Servidor iniciado correctamente');
} catch (error) {
  console.error('❌ Error al iniciar el servidor:', error);
} 