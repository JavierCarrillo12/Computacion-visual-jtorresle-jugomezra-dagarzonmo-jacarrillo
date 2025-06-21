# 🚀 Instrucciones Rápidas - IA Visual Colaborativa React

## 📋 Requisitos Previos

1. **Node.js** instalado (versión 16 o superior)
2. **Backend Python** ejecutándose en puerto 5000

## ⚡ Ejecución Rápida

### Opción 1: Script Automático (Windows)
```bash
start.bat
```

### Opción 2: Comandos Manuales
```bash
# Instalar dependencias (solo la primera vez)
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## 🌐 Acceso

- **Frontend React:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🔧 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview

# Linting
npm run lint
```

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 already in use"
```bash
# Cambiar puerto en vite.config.js o matar proceso
npx kill-port 3000
```

### Error de conexión al backend
- Verificar que el servidor Python esté ejecutándose
- Revisar que el puerto 5000 esté libre
- Verificar CORS en el backend

## 📁 Estructura del Proyecto

```
web/
├── src/
│   ├── App.jsx              # Componente principal
│   ├── components/          # Componentes React
│   │   ├── Scene3D.jsx      # Escena 3D
│   │   └── DetectionObjects.jsx
│   └── index.css           # Estilos globales
├── index.html              # HTML principal
├── package.json            # Dependencias
├── vite.config.js          # Configuración Vite
└── start.bat              # Script de inicio
```

## 🎯 Funcionalidades

✅ **Drag & Drop** para subir imágenes  
✅ **Detección de objetos** con YOLO  
✅ **Visualización 3D** con Three.js  
✅ **Controles interactivos**  
✅ **Diseño responsive**  
✅ **Manejo de errores**  

## 🔗 Enlaces Útiles

- [React Documentation](https://react.dev/)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Vite Documentation](https://vitejs.dev/) 