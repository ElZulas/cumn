@echo off
echo ========================================
echo    CONFIGURACIÓN CREDENCIALES MYSQL
echo ========================================
echo.
echo MySQL está ejecutándose, pero necesitamos configurar las credenciales.
echo.

set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"

echo Probando diferentes credenciales...
echo.

REM Probar sin contraseña
echo 1. Probando sin contraseña...
%MYSQL_PATH% -u root -e "SELECT 'Conexión exitosa sin contraseña' as Status;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ Conexión exitosa sin contraseña
    echo.
    echo Configurando base de datos...
    %MYSQL_PATH% -u root -e "CREATE DATABASE IF NOT EXISTS TiendaRopa;"
    %MYSQL_PATH% -u root TiendaRopa < boutiqueavilescruz.sql
    echo.
    echo ✅ Base de datos configurada correctamente
    goto :success
)

REM Probar con contraseña vacía
echo 2. Probando con contraseña vacía...
%MYSQL_PATH% -u root -p -e "SELECT 'Conexión exitosa con contraseña vacía' as Status;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ Conexión exitosa con contraseña vacía
    echo.
    echo Configurando base de datos...
    %MYSQL_PATH% -u root -p -e "CREATE DATABASE IF NOT EXISTS TiendaRopa;"
    %MYSQL_PATH% -u root -p TiendaRopa < boutiqueavilescruz.sql
    echo.
    echo ✅ Base de datos configurada correctamente
    goto :success
)

REM Probar con contraseña Preventa1
echo 3. Probando con contraseña Preventa1...
%MYSQL_PATH% -u root -pPreventa1 -e "SELECT 'Conexión exitosa con Preventa1' as Status;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ Conexión exitosa con contraseña Preventa1
    echo.
    echo Configurando base de datos...
    %MYSQL_PATH% -u root -pPreventa1 -e "CREATE DATABASE IF NOT EXISTS TiendaRopa;"
    %MYSQL_PATH% -u root -pPreventa1 TiendaRopa < boutiqueavilescruz.sql
    echo.
    echo ✅ Base de datos configurada correctamente
    goto :success
)

REM Probar con contraseña root
echo 4. Probando con contraseña root...
%MYSQL_PATH% -u root -proot -e "SELECT 'Conexión exitosa con root' as Status;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ Conexión exitosa con contraseña root
    echo.
    echo Configurando base de datos...
    %MYSQL_PATH% -u root -proot -e "CREATE DATABASE IF NOT EXISTS TiendaRopa;"
    %MYSQL_PATH% -u root -proot TiendaRopa < boutiqueavilescruz.sql
    echo.
    echo ✅ Base de datos configurada correctamente
    goto :success
)

echo.
echo ❌ No se pudo conectar con ninguna credencial probada.
echo.
echo Para configurar MySQL manualmente:
echo 1. Abre MySQL Command Line Client
echo 2. Ejecuta: ALTER USER 'root'@'localhost' IDENTIFIED BY 'Preventa1';
echo 3. Ejecuta: FLUSH PRIVILEGES;
echo 4. Ejecuta: CREATE DATABASE TiendaRopa;
echo 5. Ejecuta: USE TiendaRopa;
echo 6. Importa los datos: source boutiqueavilescruz.sql;
echo.
pause
exit /b 1

:success
echo.
echo ========================================
echo    CONFIGURACIÓN COMPLETADA
echo ========================================
echo.
echo ✅ MySQL configurado correctamente
echo ✅ Base de datos TiendaRopa creada
echo ✅ Datos importados
echo.
echo Ahora puedes ejecutar: iniciar-local.bat
echo.
pause 