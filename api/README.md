# 🏪 TiendaRopa API

API REST completa para el sistema de gestión de tienda de ropa.

## 🚀 Características

- ✅ **RESTful API** con Express.js
- ✅ **Base de datos MySQL** con pool de conexiones
- ✅ **Seguridad** con Helmet y rate limiting
- ✅ **CORS** configurado para desarrollo y producción
- ✅ **Validación** de datos de entrada
- ✅ **Manejo de errores** completo
- ✅ **Estadísticas** en tiempo real
- ✅ **Documentación** automática

## 📋 Endpoints

### 🔗 Información General
- `GET /` - Información de la API
- `GET /api/test` - Prueba de conectividad
- `GET /api/stats` - Estadísticas generales

### 👕 Productos
- `GET /api/productos` - Obtener todos los productos
- `POST /api/productos` - Crear nuevo producto

### 👥 Clientes
- `GET /api/clientes` - Obtener todos los clientes
- `POST /api/clientes` - Crear nuevo cliente

### 💰 Ventas
- `GET /api/ventas` - Obtener todas las ventas
- `POST /api/ventas` - Crear nueva venta

### 🏪 Proveedores
- `GET /api/proveedores` - Obtener todos los proveedores
- `POST /api/proveedores` - Crear nuevo proveedor

### 🎨 Ropa de Temporada
- `GET /api/ropa_temporada` - Obtener todas las temporadas
- `POST /api/ropa_temporada` - Crear nueva temporada

## 🛠️ Instalación Local

### 1. Clonar y instalar dependencias
```bash
cd api
npm install
```

### 2. Configurar variables de entorno
```bash
cp env.example .env
# Editar .env con tus credenciales de MySQL
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

### 4. Ejecutar en producción
```bash
npm start
```

## 🌐 Despliegue en Render

### 1. Preparar el repositorio
```bash
# Asegúrate de que tu repositorio tenga esta estructura:
api/
├── server.js
├── package.json
├── env.example
└── README.md
```

### 2. Crear cuenta en Render
1. Ve a [render.com](https://render.com)
2. Crea una cuenta gratuita
3. Conecta tu repositorio de GitHub

### 3. Configurar el servicio
1. **Tipo de servicio**: Web Service
2. **Nombre**: `tiendaropa-api`
3. **Repositorio**: Tu repositorio de GitHub
4. **Rama**: `main`
5. **Runtime**: `Node`
6. **Build Command**: `npm install`
7. **Start Command**: `npm start`

### 4. Configurar variables de entorno
En Render, ve a **Environment** y agrega:

```env
DB_HOST=tu-host-mysql
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=tiendaropa
DB_PORT=3306
NODE_ENV=production
```

### 5. Base de datos MySQL
Para la base de datos, puedes usar:
- **PlanetScale** (gratuito)
- **Railway** (gratuito)
- **Clever Cloud** (gratuito)
- **Render MySQL** (de pago)

## 📊 Ejemplos de Uso

### Obtener productos
```bash
curl https://tu-api.onrender.com/api/productos
```

### Crear producto
```bash
curl -X POST https://tu-api.onrender.com/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "Nombre": "Camisa Azul",
    "Precio": 29.99,
    "Talla": "M",
    "Color": "Azul",
    "Stock": 10
  }'
```

### Obtener estadísticas
```bash
curl https://tu-api.onrender.com/api/stats
```

## 🔧 Configuración de Base de Datos

### 1. Crear base de datos
```sql
CREATE DATABASE tiendaropa;
USE tiendaropa;
```

### 2. Importar estructura y datos
```bash
mysql -u root -p tiendaropa < ../boutiqueavilescruz.sql
```

## 🛡️ Seguridad

- **Helmet**: Headers de seguridad
- **Rate Limiting**: 100 requests por 15 minutos
- **CORS**: Configurado para desarrollo y producción
- **Validación**: Datos de entrada validados
- **Manejo de errores**: Respuestas seguras

## 📈 Monitoreo

La API incluye:
- Logs detallados
- Manejo de errores
- Estadísticas de uso
- Health checks

## 🔄 Actualizaciones

Para actualizar la API en Render:
1. Haz push a tu repositorio
2. Render automáticamente redeployará
3. Las variables de entorno se mantienen

## 📞 Soporte

Si tienes problemas:
1. Verifica las variables de entorno
2. Revisa los logs en Render
3. Prueba la conexión a la base de datos
4. Verifica que la base de datos tenga las tablas correctas

---

**¡Tu API estará lista para usar en Render!** 🚀 