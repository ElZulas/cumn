# 🚀 Guía de Despliegue en Render

## 📋 **Prerrequisitos**

1. **Cuenta en Render** - [render.com](https://render.com)
2. **Cuenta en Railway** - [railway.app](https://railway.app) (para la base de datos)
3. **Repositorio en GitHub** - [github.com/ElZulas/cumn.git](https://github.com/ElZulas/cumn.git)

## 🗄️ **Paso 1: Configurar Base de Datos en Railway**

### **1. Crear Base de Datos MySQL**

1. Ve a [railway.app](https://railway.app)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en **"New Project"**
4. Selecciona **"Provision MySQL"**
5. Espera a que se cree la base de datos

### **2. Obtener Credenciales**

1. En tu proyecto de Railway, ve a la pestaña **"Variables"**
2. Copia las siguientes variables:
   - `MYSQLHOST` → `DB_HOST`
   - `MYSQLUSER` → `DB_USER`
   - `MYSQLPASSWORD` → `DB_PASSWORD`
   - `MYSQLDATABASE` → `DB_NAME`
   - `MYSQLPORT` → `DB_PORT`

### **3. Configurar Base de Datos**

1. Ve a la pestaña **"Connect"**
2. Copia el comando de conexión
3. Ejecuta el script `setup-database.sql` en tu base de datos

## 🌐 **Paso 2: Configurar API en Render**

### **1. Conectar Repositorio**

1. Ve a [render.com](https://render.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en **"New +"**
4. Selecciona **"Web Service"**
5. Conecta tu repositorio: `https://github.com/ElZulas/cumn.git`

### **2. Configurar Servicio**

**Configuración Básica:**
- **Name**: `tiendaropa-api`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `api`

### **3. Configurar Variables de Entorno**

En la sección **"Environment Variables"**, agrega:

```env
# Base de datos (Railway)
DB_HOST=tu-host-railway
DB_USER=tu-usuario-railway
DB_PASSWORD=tu-password-railway
DB_NAME=tu-database-railway
DB_PORT=tu-puerto-railway

# Servidor
PORT=10000
NODE_ENV=production

# Seguridad
CORS_ORIGIN=https://tu-frontend.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### **4. Configurar Auto-Deploy**

- ✅ **Auto-Deploy**: Habilitado
- **Branch**: `main` o `master`

## 🔧 **Paso 3: Configurar Base de Datos**

### **1. Ejecutar Script SQL**

1. Ve a Railway y copia las credenciales
2. Usa un cliente MySQL (MySQL Workbench, phpMyAdmin, etc.)
3. Ejecuta el contenido de `setup-database.sql`

### **2. Verificar Tablas**

Las siguientes tablas deben crearse:
- `Productos`
- `Clientes`
- `Ventas`
- `Proveedores`
- `Ropa_de_temporada`
- `Detalle_venta`

## 🧪 **Paso 4: Probar la API**

### **1. Verificar Despliegue**

1. Ve a tu servicio en Render
2. Copia la URL (ej: `https://tiendaropa-api.onrender.com`)
3. Prueba: `https://tu-api.onrender.com/api/test`

### **2. Configurar Postman**

1. Abre Postman
2. Importa la colección: `TiendaRopa-API.postman_collection.json`
3. Importa el environment: `TiendaRopa-API.postman_environment.json`
4. Cambia `base_url` a tu URL de Render

## 📊 **Paso 5: Pruebas en Postman**

### **1. Pruebas Básicas**

1. **Test API**: `GET https://tu-api.onrender.com/api/test`
2. **Estadísticas**: `GET https://tu-api.onrender.com/api/stats`
3. **Productos**: `GET https://tu-api.onrender.com/api/productos`

### **2. Pruebas de Creación**

1. **Crear Cliente**: `POST https://tu-api.onrender.com/api/clientes`
2. **Crear Producto**: `POST https://tu-api.onrender.com/api/productos`
3. **Crear Venta**: `POST https://tu-api.onrender.com/api/ventas`

## 🛠️ **Solución de Problemas**

### **Error de Conexión a Base de Datos**

1. Verifica las variables de entorno en Render
2. Asegúrate de que Railway esté activo
3. Revisa los logs en Render

### **Error 404**

1. Verifica que el repositorio esté conectado correctamente
2. Asegúrate de que el directorio raíz sea `api`
3. Verifica que `package.json` esté en la carpeta `api`

### **Error 500**

1. Revisa los logs en Render
2. Verifica la conexión a la base de datos
3. Asegúrate de que las tablas existan

## 📈 **Monitoreo**

### **1. Logs en Render**

1. Ve a tu servicio en Render
2. Pestaña **"Logs"**
3. Monitorea errores y requests

### **2. Métricas**

1. Pestaña **"Metrics"**
2. Monitorea CPU, memoria y requests

## 🔄 **Actualizaciones**

### **1. Auto-Deploy**

- Cada push a `main` activará un nuevo deploy
- Los logs mostrarán el progreso

### **2. Manual Deploy**

1. Ve a tu servicio en Render
2. Haz clic en **"Manual Deploy"**
3. Selecciona la rama

## 🎯 **URLs Finales**

- **API**: `https://tu-api.onrender.com`
- **Test**: `https://tu-api.onrender.com/api/test`
- **Docs**: `https://tu-api.onrender.com/`

## 📝 **Checklist Final**

- [ ] Base de datos creada en Railway
- [ ] Script SQL ejecutado
- [ ] Repositorio conectado en Render
- [ ] Variables de entorno configuradas
- [ ] API desplegada correctamente
- [ ] Postman configurado
- [ ] Pruebas exitosas

---

**¡Tu API estará lista para usar con Postman!** 🎉 