# 🎥 Visualización Inmersiva 360° con Unity y Three.js

## 📅 Información del Taller
- **Fecha**: 22 de Mayo, 2025
- **Tipo**: Taller Práctico de Computación Visual
- **Duración**: 3 horas

## 🎯 Objetivos

### Objetivo Principal
Desarrollar visualizadores inmersivos para contenido 360° utilizando Unity y Three.js, implementando técnicas avanzadas de renderizado 3D y mapeo de texturas.

### Objetivos Específicos
1. Implementar visualización de imágenes panorámicas equirectangulares en Unity y Three.js
2. Integrar reproducción de video 360° con controles interactivos en ambas plataformas
3. Desarrollar sistema de navegación inmersiva
4. Crear interfaz de usuario adaptativa y no intrusiva

## 🧠 Fundamentos Técnicos

### Conceptos Clave
1. **Geometría 3D**
   - Transformaciones espaciales
   - Proyección equirectangular
   - Mapeo UV en esferas

2. **Renderizado**
   - Texturas dinámicas
   - Shaders básicos
   - Optimización de rendimiento
   - Materiales y texturas en Unity

3. **Interacción 3D**
   - Controles orbitales
   - Gestión de eventos
   - Navegación inmersiva
   - Input system de Unity

## 🛠️ Stack Tecnológico

### Implementación Web (Three.js)
- **React 19**: Framework UI
- **Three.js v0.170**: Motor 3D
- **React Three Fiber v9**: Integración React-Three.js
- **React Three Drei v10**: Utilidades 3D

### Implementación Unity
- **Unity 2022.3 LTS**: Motor de juegos
- **Universal Render Pipeline**: Pipeline de renderizado
- **Input System**: Sistema de entrada
- **Video Player**: Componente para video 360°

### Herramientas
- **Vite**: Bundler y servidor de desarrollo
- **Bun**: Gestor de paquetes
- **WebGL**: API de renderizado
- **Visual Studio**: IDE para Unity

## 📁 Arquitectura del Proyecto

```
2025-05-22_taller_imagenes_video_360_unity_threejs/
├── threejs/                          # Implementación web
│   ├── public/                       # Assets estáticos
│   │   ├── img_equirectangulares*.jpeg  # Imágenes 360°
│   │   └── video360.mp4              # Video 360°
│   ├── src/
│   │   ├── components/              # Componentes React
│   │   │   ├── Scene360.jsx        # Visualizador de imágenes
│   │   │   └── VideoScene360.jsx   # Visualizador de video
│   │   ├── App.jsx                 # Componente raíz
│   │   └── App.css                 # Estilos
│   └── package.json                # Dependencias
├── unity/                           # Implementación Unity
│   ├── Assets/
│   │   ├── Scenes/                 # Escenas Unity
│   │   ├── Scripts/                # Scripts C#
│   │   ├── Materials/              # Materiales
│   │   └── Resources/              # Recursos
│   └── ProjectSettings/            # Configuración Unity
└── resultados/                      # Evidencias visuales
```

## 💻 Implementación Técnica

### 1. Visualización de Imágenes 360° (Three.js)
```jsx
function PanoramaSphere({ imageSrc }) {
  const texture = useTexture(imageSrc)
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[10, 60, 40]} />
      <meshBasicMaterial 
        map={texture} 
        side={THREE.BackSide}
      />
    </mesh>
  )
}
```

### 2. Visualización de Imágenes 360° (Unity)
```csharp
public class PanoramaViewer : MonoBehaviour
{
    public Material skyboxMaterial;
    public Texture2D panoramaTexture;

    void Start()
    {
        skyboxMaterial.mainTexture = panoramaTexture;
        RenderSettings.skybox = skyboxMaterial;
    }
}
```

### 3. Sistema de Video 360° (Three.js)
```jsx
function VideoScene360() {
  const [videoTexture, setVideoTexture] = useState(null)
  
  useEffect(() => {
    const video = document.createElement('video')
    video.src = '/video360.mp4'
    video.crossOrigin = 'anonymous'
    video.loop = true
    video.muted = true
    
    const texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    
    setVideoTexture(texture)
  }, [])
  
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[10, 60, 40]} />
      <meshBasicMaterial map={videoTexture} side={THREE.BackSide} />
    </mesh>
  )
}
```

### 4. Sistema de Video 360° (Unity)
```csharp
public class Video360Player : MonoBehaviour
{
    public VideoPlayer videoPlayer;
    public Material skyboxMaterial;

    void Start()
    {
        videoPlayer.renderMode = VideoRenderMode.MaterialOverride;
        videoPlayer.targetMaterial = skyboxMaterial;
        videoPlayer.Play();
    }
}
```

## 🎮 Sistema de Control

### Interacción Básica
- **Rotación**: Click + arrastrar / Controles Unity
- **Zoom**: Rueda del mouse
- **Navegación**: Controles orbitales / Input System Unity

### Atajos de Teclado
- `1`: Modo imagen
- `2`: Modo video
- `N`: Siguiente imagen
- `ESC/H`: Toggle UI

## 📊 Resultados

### Características Implementadas
- ✅ Visualización de imágenes 360° en ambas plataformas
- ✅ Reproducción de video 360° en ambas plataformas
- ✅ Navegación inmersiva
- ✅ Interfaz adaptativa
- ✅ Controles intuitivos
- ✅ Modo inmersivo

### Demostración
![Visualizador 360°](./resultados/resultados.gif)

## 📚 Aprendizajes Clave

### Técnicos
1. **Renderizado 3D**
   - Mapeo de texturas esféricas
   - Optimización de geometría
   - Gestión de recursos
   - Materiales y shaders en Unity

2. **Interacción**
   - Controles 3D
   - Eventos de usuario
   - Feedback visual
   - Input System de Unity

3. **Performance**
   - Carga asíncrona
   - Gestión de memoria
   - Optimización WebGL
   - Optimización Unity

### Prácticos
1. **Desarrollo**
   - Integración React-Three.js
   - Desarrollo Unity
   - Gestión de estado
   - Componentes reutilizables

2. **UX/UI**
   - Diseño inmersivo
   - Controles contextuales
   - Feedback visual
   - Adaptación multiplataforma

## 🔄 Próximos Pasos

### Mejoras Técnicas
- [ ] Implementación de WebXR
- [ ] Optimización de texturas
- [ ] Sistema de caché
- [ ] Integración con VR en Unity

### Nuevas Features
- [ ] Hotspots interactivos
- [ ] Transiciones entre escenas
- [ ] Modo presentación
- [ ] Exportación multiplataforma

## 📖 Referencias

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [Unity Documentation](https://docs.unity3d.com/)
- [Unity Video Player](https://docs.unity3d.com/Manual/VideoPlayer.html)

## 💭 Reflexión Final

Este taller ha sido una experiencia enriquecedora que nos ha permitido explorar las posibilidades de la visualización inmersiva tanto en web como en Unity. La implementación de visualizadores 360° en ambas plataformas nos ha brindado una comprensión profunda de varios conceptos fundamentales:

### Aspectos Destacados
1. **Integración de Tecnologías**
   - La combinación de React con Three.js demostró ser potente para crear interfaces interactivas
   - Unity proporcionó una plataforma robusta para visualización 360°
   - La arquitectura modular permitió una clara separación de responsabilidades

2. **Desafíos Técnicos**
   - La gestión de texturas de video en tiempo real requirió optimización cuidadosa
   - La implementación de controles inmersivos necesitó balancear usabilidad y rendimiento
   - La adaptación a diferentes plataformas presentó retos interesantes

3. **Aprendizajes Valiosos**
   - Comprensión profunda de la proyección equirectangular y mapeo UV
   - Manejo eficiente de recursos multimedia en WebGL y Unity
   - Diseño de interfaces no intrusivas para experiencias inmersivas

### Impacto y Aplicaciones
Este proyecto sienta las bases para futuras implementaciones en:
- Recorridos virtuales interactivos
- Visualización de datos en entornos 3D
- Experiencias educativas inmersivas
- Aplicaciones de realidad virtual/aumentada
- Desarrollo multiplataforma

### Conclusión
La visualización 360° representa un puente entre diferentes plataformas y las experiencias inmersivas del futuro. Este taller no solo nos ha permitido implementar soluciones técnicas en web y Unity, sino también comprender las implicaciones y posibilidades de la visualización inmersiva en diferentes contextos.
