# 🚨 Errores Comunes en Render

## ❌ **Error: "There's an error above. Please fix it to continue."**

### **Posibles Causas:**

#### **1. Root Directory Incorrecto**
- ✅ **Correcto**: `api`
- ❌ **Incorrecto**: `/api` o `api/` o vacío

#### **2. Build Command Incorrecto**
- ✅ **Correcto**: `npm install`
- ❌ **Incorrecto**: `npm install --production` o `yarn install`

#### **3. Start Command Incorrecto**
- ✅ **Correcto**: `npm start`
- ❌ **Incorrecto**: `node server.js` o `npm run start`

#### **4. Branch Incorrecto**
- ✅ **Correcto**: `main`
- ❌ **Incorrecto**: `master` o `develop`

#### **5. Environment Incorrecto**
- ✅ **Correcto**: `Node`
- ❌ **Incorrecto**: `Static Site` o `Background Worker`

## 🔧 **Configuración Correcta:**

### **Configuración Básica:**
- **Name**: `tiendaropa-api`
- **Environment**: `Node`
- **Region**: `Oregon (US West)` (o la más cercana)
- **Branch**: `main`

### **Configuración Avanzada:**
- **Root Directory**: `api` ⭐ **IMPORTANTE**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### **Variables de Entorno:**
```env
NODE_ENV=production
PORT=10000
```

## 🆘 **Solución Paso a Paso:**

### **1. Verificar Repositorio**
- Asegúrate de que el repositorio sea: `ElZulas/cumn`
- Verifica que la rama sea `main`

### **2. Verificar Root Directory**
- Debe ser exactamente: `api` (sin barras)

### **3. Verificar Comandos**
- Build Command: `npm install`
- Start Command: `npm start`

### **4. Verificar Archivos**
- `api/package.json` debe existir
- `api/server.js` debe existir

## 📋 **Checklist de Verificación:**

- [ ] Repositorio: `ElZulas/cumn`
- [ ] Branch: `main`
- [ ] Environment: `Node`
- [ ] Root Directory: `api`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Variables de entorno configuradas

## 🎯 **Si el Error Persiste:**

1. **Haz clic en "Advanced"**
2. **Verifica que no haya espacios extra**
3. **Intenta con un nombre diferente**
4. **Revisa los logs de build**

---

**¡Muéstrame tu configuración y te ayudo a resolverlo!** 🚀 