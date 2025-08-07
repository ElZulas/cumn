@echo off
echo ========================================
echo    SISTEMA TIENDAROPA - LOCAL
echo ========================================
echo.
echo Iniciando el sistema local...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no está instalado.
    echo Por favor, instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si MySQL está ejecutándose
echo Verificando conexión a MySQL local...
mysql -u root -pPreventa1 -e "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ADVERTENCIA: No se puede conectar a MySQL local.
    echo Asegúrate de que MySQL esté ejecutándose y las credenciales sean correctas.
    echo.
    echo Para configurar MySQL local:
    echo 1. Instala MySQL Server
    echo 2. Ejecuta: mysql -u root -p
    echo 3. Crea la base de datos: CREATE DATABASE TiendaRopa;
    echo 4. Importa los datos: mysql -u root -p TiendaRopa < boutiqueavilescruz.sql
    echo.
)

REM Navegar al directorio backend
cd backend

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
    echo.
)

REM Iniciar el servidor local
echo Iniciando servidor local...
echo El servidor estará disponible en: http://localhost:3001
echo.
echo Para acceder a las páginas:
echo - Sistema Local: vista-local.html
echo - API Local: http://localhost:3001
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
node index-local.js

pause 