# Script para preparar el despliegue en Render
# Ejecutar este script antes de hacer push al repositorio

Write-Host "🚀 Preparando despliegue en Render..." -ForegroundColor Green

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: No se encontró package.json" -ForegroundColor Red
    Write-Host "Asegúrate de estar en el directorio 'api'" -ForegroundColor Yellow
    exit 1
}

# Verificar que el archivo .env existe
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Advertencia: No se encontró .env" -ForegroundColor Yellow
    Write-Host "Se creará un archivo .env.example para Render" -ForegroundColor Yellow
    
    if (Test-Path "env.example") {
        Copy-Item "env.example" ".env" -ErrorAction SilentlyContinue
    }
}

# Verificar dependencias
Write-Host "📦 Verificando dependencias..." -ForegroundColor Blue
if (Test-Path "node_modules") {
    Write-Host "✅ node_modules encontrado" -ForegroundColor Green
} else {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Blue
    npm install
}

# Verificar archivos necesarios
$requiredFiles = @("server.js", "package.json", "setup-database.sql")
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file encontrado" -ForegroundColor Green
    } else {
        Write-Host "❌ $file no encontrado" -ForegroundColor Red
    }
}

# Mostrar configuración actual
Write-Host "`n📋 Configuración actual:" -ForegroundColor Cyan
Write-Host "   - Puerto: $env:PORT (por defecto 3000)" -ForegroundColor White
Write-Host "   - Entorno: $env:NODE_ENV (por defecto development)" -ForegroundColor White
Write-Host "   - Base de datos: $env:DB_NAME (por defecto tiendaropa)" -ForegroundColor White

# Instrucciones para Render
Write-Host "`n🎯 Próximos pasos para Render:" -ForegroundColor Magenta
Write-Host "1. Ve a https://render.com" -ForegroundColor White
Write-Host "2. Conecta tu repositorio: https://github.com/ElZulas/cumn.git" -ForegroundColor White
Write-Host "3. Configura como Web Service" -ForegroundColor White
Write-Host "4. Root Directory: api" -ForegroundColor White
Write-Host "5. Build Command: npm install" -ForegroundColor White
Write-Host "6. Start Command: npm start" -ForegroundColor White

# Variables de entorno para Render
Write-Host "`n🔧 Variables de entorno para Render:" -ForegroundColor Yellow
Write-Host "DB_HOST=tu-host-railway" -ForegroundColor Gray
Write-Host "DB_USER=tu-usuario-railway" -ForegroundColor Gray
Write-Host "DB_PASSWORD=tu-password-railway" -ForegroundColor Gray
Write-Host "DB_NAME=tu-database-railway" -ForegroundColor Gray
Write-Host "DB_PORT=tu-puerto-railway" -ForegroundColor Gray
Write-Host "PORT=10000" -ForegroundColor Gray
Write-Host "NODE_ENV=production" -ForegroundColor Gray

Write-Host "`n✅ Preparación completada!" -ForegroundColor Green
Write-Host "Ahora puedes hacer push a tu repositorio y configurar Render" -ForegroundColor Cyan 