# 🏪 TiendaRopa - Sistema Local

## 📋 Descripción
Sistema de gestión para tienda de ropa con base de datos local MySQL.

## 🚀 Instalación y Configuración

### 1. Requisitos Previos
- **Node.js** (versión 14 o superior)
- **MySQL Server** (versión 8.0 o superior)

### 2. Configurar MySQL Local

#### Opción A: Usar el script automático
```bash
configurar-mysql-local.bat
```

#### Opción B: Configuración manual
1. Instalar MySQL Server
2. Abrir MySQL Command Line Client
3. Ejecutar:
```sql
CREATE DATABASE TiendaRopa;
USE TiendaRopa;
```
4. Importar datos:
```bash
mysql -u root -p TiendaRopa < boutiqueavilescruz.sql
```

### 3. Configurar Credenciales
Editar `config-local.js` si tus credenciales son diferentes:
```javascript
const configLocal = {
    host: 'localhost',
    user: 'root',
    password: 'TU_CONTRASEÑA', // Cambiar aquí
    database: 'TiendaRopa',
    port: 3306
};
```

## 🎯 Iniciar el Sistema

### Método 1: Script automático
```bash
iniciar-local.bat
```

### Método 2: Manual
```bash
cd backend
npm install
node index-local.js
```

## 🌐 Acceso al Sistema

- **Dashboard Local**: `vista-local.html`
- **API Local**: `http://localhost:3001`
- **Puerto**: 3001 (diferente al remoto)

## 📊 Características

### ✅ Funcionalidades
- 📈 Dashboard con estadísticas en tiempo real
- 👕 Gestión de productos
- 👥 Gestión de clientes
- 💰 Gestión de ventas
- 🏪 Gestión de proveedores
- 🎨 Interfaz moderna y responsive

### 🔧 API Endpoints
- `GET /productos` - Listar productos
- `POST /productos` - Crear producto
- `GET /clientes` - Listar clientes
- `POST /clientes` - Crear cliente
- `GET /ventas` - Listar ventas
- `POST /ventas` - Crear venta
- `GET /proveedores` - Listar proveedores
- `GET /ropa_temporada` - Listar ropa de temporada
- `GET /test` - Verificar estado del servidor

## 🔄 Diferencias con Sistema Remoto

| Característica | Local | Remoto |
|----------------|-------|--------|
| Puerto | 3001 | 3000 |
| Base de Datos | Local MySQL | Remota |
| Archivo HTML | `vista-local.html` | `vista-solo-lectura.html` |
| Configuración | `config-local.js` | `config-remoto.js` |
| Servidor | `index-local.js` | `index-remoto.js` |

## 🛠️ Solución de Problemas

### Error de conexión a MySQL
1. Verificar que MySQL esté ejecutándose
2. Verificar credenciales en `config-local.js`
3. Ejecutar `configurar-mysql-local.bat`

### Error de puerto en uso
- El sistema local usa el puerto 3001
- El sistema remoto usa el puerto 3000
- Ambos pueden ejecutarse simultáneamente

### Error de dependencias
```bash
cd backend
npm install
```

## 📁 Estructura de Archivos

```
base-de-cum/
├── config-local.js          # Configuración local
├── vista-local.html         # Interfaz local
├── iniciar-local.bat        # Script de inicio local
├── configurar-mysql-local.bat # Configuración MySQL
├── backend/
│   └── index-local.js       # Servidor local
└── boutiqueavilescruz.sql   # Datos de la base
```

## 🎨 Características de la Interfaz

- 🎨 Diseño moderno con gradientes
- 📱 Responsive para móviles
- 🔄 Actualización automática cada 30 segundos
- 📊 Estadísticas en tiempo real
- 🟢 Indicadores de estado del sistema

## 📞 Soporte

Si tienes problemas:
1. Verificar que MySQL esté ejecutándose
2. Verificar credenciales en `config-local.js`
3. Ejecutar `configurar-mysql-local.bat`
4. Revisar logs del servidor

---

**¡Listo! Tu sistema local está configurado y funcionando.** 🎉 