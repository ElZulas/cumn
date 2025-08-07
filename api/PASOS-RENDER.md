# 🚀 Pasos Rápidos para Render

## 📋 **Checklist de Configuración**

### **1. Base de Datos (Railway)**
- [ ] Crear cuenta en [railway.app](https://railway.app)
- [ ] Crear proyecto MySQL
- [ ] Copiar credenciales de la base de datos
- [ ] Ejecutar `setup-database.sql`

### **2. API (Render)**
- [ ] Crear cuenta en [render.com](https://render.com)
- [ ] Conectar repositorio: `https://github.com/ElZulas/cumn.git`
- [ ] Configurar como Web Service
- [ ] Root Directory: `api`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`

### **3. Variables de Entorno en Render**
```env
DB_HOST=tu-host-railway
DB_USER=tu-usuario-railway
DB_PASSWORD=tu-password-railway
DB_NAME=tu-database-railway
DB_PORT=tu-puerto-railway
PORT=10000
NODE_ENV=production
```

### **4. Postman**
- [ ] Importar colección: `TiendaRopa-API.postman_collection.json`
- [ ] Importar environment: `TiendaRopa-API.postman_environment.json`
- [ ] Cambiar `base_url` a tu URL de Render

## 🎯 **URLs de Prueba**

Una vez desplegado, prueba estas URLs:

1. **Test API**: `https://tu-api.onrender.com/api/test`
2. **Estadísticas**: `https://tu-api.onrender.com/api/stats`
3. **Productos**: `https://tu-api.onrender.com/api/productos`

## 📁 **Archivos Importantes**

- `api/server.js` - Servidor principal
- `api/package.json` - Dependencias
- `api/setup-database.sql` - Script de base de datos
- `api/TiendaRopa-API.postman_collection.json` - Colección Postman
- `api/TiendaRopa-API.postman_environment.json` - Environment Postman

## 🆘 **Solución de Problemas**

### **Error de Conexión**
- Verifica credenciales de Railway
- Revisa logs en Render

### **Error 404**
- Verifica Root Directory = `api`
- Asegúrate de que `package.json` esté en `api/`

### **Error 500**
- Revisa logs en Render
- Verifica que las tablas existan en Railway

---

**¡Listo para desplegar!** 🎉 