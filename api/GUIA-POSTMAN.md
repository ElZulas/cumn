# 🏪 TiendaRopa API - Guía de Postman

## 📋 **Configuración Inicial**

### **1. Importar la Colección**

1. Abre **Postman**
2. Haz clic en **"Import"**
3. Selecciona el archivo: `TiendaRopa-API.postman_collection.json`
4. Haz clic en **"Import"**

### **2. Importar el Environment**

1. Haz clic en **"Import"** nuevamente
2. Selecciona el archivo: `TiendaRopa-API.postman_environment.json`
3. Haz clic en **"Import"**

### **3. Configurar Variables**

1. En la esquina superior derecha, selecciona **"🏪 TiendaRopa API - Environment"**
2. Haz clic en el ícono del ojo 👁️ para ver las variables
3. Modifica `base_url` según tu entorno:
   - **Local**: `http://localhost:3000`
   - **Render**: `https://tu-api.onrender.com`

## 🚀 **Pruebas Rápidas**

### **Paso 1: Probar la API**
1. Ve a la carpeta **"🔗 Información General"**
2. Ejecuta **"🧪 Test API"**
3. Deberías recibir una respuesta como:
```json
{
    "message": "API funcionando correctamente",
    "timestamp": "2024-01-20T10:00:00.000Z",
    "environment": "development"
}
```

### **Paso 2: Ver Estadísticas**
1. Ejecuta **"📊 Estadísticas"**
2. Verás el conteo de registros en cada tabla

### **Paso 3: Probar Productos**
1. Ve a la carpeta **"👕 Productos"**
2. Ejecuta **"📋 Obtener Todos los Productos"**
3. Luego ejecuta **"➕ Crear Nuevo Producto"**

## 📊 **Endpoints Disponibles**

### **🔗 Información General**
- `GET /` - Información de la API
- `GET /api/test` - Prueba de conectividad
- `GET /api/stats` - Estadísticas generales

### **👕 Productos**
- `GET /api/productos` - Obtener todos los productos
- `POST /api/productos` - Crear nuevo producto

### **👥 Clientes**
- `GET /api/clientes` - Obtener todos los clientes
- `POST /api/clientes` - Crear nuevo cliente

### **💰 Ventas**
- `GET /api/ventas` - Obtener todas las ventas
- `POST /api/ventas` - Crear nueva venta

### **🏪 Proveedores**
- `GET /api/proveedores` - Obtener todos los proveedores
- `POST /api/proveedores` - Crear nuevo proveedor

### **🎨 Ropa de Temporada**
- `GET /api/ropa_temporada` - Obtener todas las temporadas
- `POST /api/ropa_temporada` - Crear nueva temporada

## 📝 **Ejemplos de Datos**

### **Crear Producto**
```json
{
    "Nombre": "Camisa Azul",
    "Descripcion": "Camisa de algodón azul",
    "Talla": "M",
    "Color": "Azul",
    "Precio": 29.99,
    "Marca": "Marca A",
    "Tipo_Prenda": "Camisa",
    "Temporada": "Verano",
    "Stock": 10
}
```

### **Crear Cliente**
```json
{
    "Nombre": "Juan Pérez",
    "Telefono": "555-0101",
    "Correo": "juan@email.com"
}
```

### **Crear Venta**
```json
{
    "Fecha": "2024-01-20",
    "Total": 99.99,
    "ID_Cliente": 1
}
```

### **Crear Proveedor**
```json
{
    "Nombre": "Proveedor Nuevo",
    "Telefono": "555-9999",
    "Correo": "nuevo@proveedor.com"
}
```

### **Crear Temporada**
```json
{
    "Descripcion": "Colección Invierno 2024",
    "Fecha_Inicio": "2024-12-01",
    "Fecha_Fin": "2025-02-28",
    "Descuento": 25
}
```

## 🔧 **Configuración para Render**

### **1. Cambiar URL de Producción**

1. En el environment, cambia `base_url` a tu URL de Render:
   ```
   https://tu-api.onrender.com
   ```

### **2. Probar en Producción**

1. Ejecuta **"🧪 Test API"** para verificar conectividad
2. Ejecuta **"📊 Estadísticas"** para ver datos
3. Prueba crear algunos registros

## 🛠️ **Solución de Problemas**

### **Error 404**
- Verifica que la URL sea correcta
- Asegúrate de que el servidor esté ejecutándose

### **Error 500**
- Revisa los logs del servidor
- Verifica la conexión a la base de datos

### **Error de CORS**
- La API ya tiene CORS configurado
- Si persiste, verifica las variables de entorno

### **Error de Base de Datos**
- Verifica las credenciales de MySQL
- Asegúrate de que las tablas existan

## 📈 **Flujo de Pruebas Recomendado**

### **1. Pruebas Básicas**
1. **Test API** - Verificar conectividad
2. **Estadísticas** - Ver datos iniciales
3. **Obtener Productos** - Ver productos existentes

### **2. Pruebas de Creación**
1. **Crear Cliente** - Agregar un cliente
2. **Crear Producto** - Agregar un producto
3. **Crear Venta** - Crear una venta
4. **Crear Proveedor** - Agregar un proveedor
5. **Crear Temporada** - Agregar una temporada

### **3. Pruebas de Verificación**
1. **Obtener Clientes** - Verificar cliente creado
2. **Obtener Productos** - Verificar producto creado
3. **Obtener Ventas** - Verificar venta creada
4. **Estadísticas** - Verificar conteos actualizados

## 🎯 **Tips para Postman**

### **1. Organizar Requests**
- Usa las carpetas para organizar por categoría
- Nombra los requests de forma descriptiva

### **2. Variables Dinámicas**
- Usa `{{base_url}}` en todas las URLs
- Cambia fácilmente entre local y producción

### **3. Headers Automáticos**
- Los requests POST ya incluyen `Content-Type: application/json`
- No necesitas configurar headers adicionales

### **4. Body Predefinido**
- Cada request POST tiene datos de ejemplo
- Modifica los datos según tus necesidades

## 🚀 **Próximos Pasos**

1. **Configura Render** con tu API
2. **Importa la colección** en Postman
3. **Prueba todos los endpoints**
4. **Personaliza los datos** según tus necesidades
5. **Comparte la colección** con tu equipo

---

**¡Tu API está lista para probar con Postman!** 🎉 