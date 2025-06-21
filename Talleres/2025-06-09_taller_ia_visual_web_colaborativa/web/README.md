# IA Visual Colaborativa - React + Three.js

Aplicación React moderna para visualización 3D de detecciones de objetos usando IA.

## 🚀 Características

- **React 18** con hooks modernos
- **Three.js** integrado con React Three Fiber
- **Drag & Drop** para subir imágenes
- **Visualización 3D** de bounding boxes
- **Controles interactivos** para personalizar la vista
- **API REST** para detección de objetos
- **Diseño responsive** y moderno

## 📦 Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

3. **Construir para producción:**
```bash
npm run build
```

4. **Previsualizar build:**
```bash
npm run preview
```

## 🔧 Configuración

### Backend (Python Flask)
Asegúrate de que el servidor backend esté ejecutándose en `http://localhost:5000`:

```bash
cd ../python
python api_server.py
```

### Frontend (React)
El frontend se ejecuta en `http://localhost:3000`:

```bash
npm run dev
```

## 🎯 Uso

1. **Subir imagen:** Haz clic en el área de upload o arrastra una imagen
2. **Detectar objetos:** Presiona el botón "Detectar Objetos"
3. **Visualizar 3D:** Los objetos se mostrarán en la escena 3D
4. **Controles:** Usa los checkboxes para mostrar/ocultar elementos

## 🏗️ Estructura del Proyecto

```
web/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos del componente
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── index.html           # HTML principal
├── package.json         # Dependencias y scripts
├── vite.config.js       # Configuración de Vite
└── README.md           # Este archivo
```

## 🛠️ Tecnologías

- **React 18** - Framework de UI
- **Vite** - Build tool y dev server
- **Three.js** - Gráficos 3D
- **React Three Fiber** - Integración React + Three.js
- **React Three Drei** - Utilidades para Three.js

## 📱 Responsive

La aplicación es completamente responsive y funciona en:
- Desktop (≥1024px)
- Tablet (768px - 1023px)
- Mobile (<768px)

## 🔌 API Endpoints

- `GET /health` - Verificar estado del servidor
- `POST /detect` - Detectar objetos en imagen

## 🎨 Personalización

Puedes personalizar:
- Colores de objetos por clase
- Controles 3D (mostrar/ocultar elementos)
- Estilos CSS en `src/index.css`
- Configuración de Three.js en `App.jsx`

## 🐛 Solución de Problemas

### Error de conexión al servidor
- Verifica que el backend esté ejecutándose en puerto 5000
- Revisa la consola del navegador para errores CORS

### Problemas con Three.js
- Asegúrate de que las dependencias estén instaladas
- Verifica que el navegador soporte WebGL

### Errores de build
- Limpia node_modules y reinstala: `rm -rf node_modules && npm install`

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles. 