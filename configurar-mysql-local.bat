@echo off
echo ========================================
echo    CONFIGURACIÓN MYSQL LOCAL
echo ========================================
echo.
echo Configurando base de datos local...
echo.

REM Definir la ruta de MySQL
set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"

REM Verificar si MySQL está instalado
if not exist %MYSQL_PATH% (
    echo ERROR: MySQL no está instalado en la ruta esperada.
    echo Buscando MySQL en otras ubicaciones...
    echo.
    REM Buscar en otras ubicaciones comunes
    if exist "C:\xampp\mysql\bin\mysql.exe" (
        set MYSQL_PATH="C:\xampp\mysql\bin\mysql.exe"
        echo MySQL encontrado en XAMPP
    ) else if exist "C:\wamp64\bin\mysql\mysql8.0.31\bin\mysql.exe" (
        set MYSQL_PATH="C:\wamp64\bin\mysql\mysql8.0.31\bin\mysql.exe"
        echo MySQL encontrado en WAMP
    ) else (
        echo ERROR: No se pudo encontrar MySQL.
        echo Por favor, instala MySQL Server desde https://dev.mysql.com/downloads/mysql/
        pause
        exit /b 1
    )
)

echo Conectando a MySQL...
echo.

REM Crear la base de datos
echo Creando base de datos tiendaropa...
%MYSQL_PATH% -u root -p1234 -e "CREATE DATABASE IF NOT EXISTS tiendaropa;"
if %errorlevel% neq 0 (
    echo ERROR: No se pudo crear la base de datos.
    echo Verifica que las credenciales sean correctas.
    pause
    exit /b 1
)

echo Base de datos creada exitosamente.
echo.

REM Importar los datos
echo Importando datos desde boutiqueavilescruz.sql...
%MYSQL_PATH% -u root -p1234 tiendaropa < boutiqueavilescruz.sql
if %errorlevel% neq 0 (
    echo ERROR: No se pudo importar los datos.
    echo Verifica que el archivo boutiqueavilescruz.sql existe.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    CONFIGURACIÓN COMPLETADA
echo ========================================
echo.
echo ✅ Base de datos TiendaRopa creada
echo ✅ Datos importados correctamente
echo.
echo Ahora puedes ejecutar: iniciar-local.bat
echo.

pause 