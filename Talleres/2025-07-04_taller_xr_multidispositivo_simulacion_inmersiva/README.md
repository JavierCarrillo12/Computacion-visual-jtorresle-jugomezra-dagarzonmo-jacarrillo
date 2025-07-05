# 🧪 Taller - XR Multidispositivo: Simulación de Experiencia Inmersiva 3D

## 📅 Fecha
`2025-07-04` – Fecha de entrega o realización

---

## 🎯 Objetivo del Taller

Explorar y implementar una experiencia inmersiva 3D compatible con **WebXR** que permita la exploración tanto con visores XR como mediante navegación tipo **flycam** con teclado y ratón. El objetivo es crear una escena interactiva con elementos 3D, texturas inmersivas y un sistema de controles adaptativo que funcione en múltiples dispositivos.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Transformaciones geométricas (escala, rotación, traslación)
- [x] Shaders y efectos visuales
- [x] Comunicación por gestos o voz
- [x] WebXR API y realidad virtual
- [x] Controles adaptativos multidispositivo
- [x] Interacción 3D en tiempo real
- [x] Optimización de rendimiento para VR

---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- **Three.js** (r148+): Motor de renderizado 3D
- **WebXR API**: Para compatibilidad con visores VR/AR
- **FlyControls**: Para navegación sin visor
- **VRButton**: Botón de entrada a VR
- **JavaScript/HTML5/CSS3**: Desarrollo web

📌 Usa las herramientas según la [guía de instalación oficial](./guia_instalacion_entornos_visual.md)

---

## 📁 Estructura del Proyecto

```
2025-07-04_taller_xr_multidispositivo_simulacion_inmersiva/
├── threejs/               # Código principal Three.js
│   ├── index.html         # Página principal
│   ├── main-simple.js     # Lógica simplificada
│   └── package.json       # Dependencias
├── models/                # Modelos 3D (opcional)
├── resultados/            # Capturas y GIFs
└── README.md             # Este archivo
```

📎 Sigue la estructura de entregas descrita en la [guía GitLab](./guia_gitlab_computacion_visual.md)

---

## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas
1. **Preparación del entorno Three.js** con soporte WebXR habilitado
2. **Creación de escena inmersiva** con objetos 3D interactivos
3. **Implementación de controles adaptativos** (WASD para PC, controladores XR para VR)
4. **Sistema de interacción** con selección de objetos y animaciones
5. **Optimización de rendimiento** para diferentes dispositivos

### 🔹 Código relevante

Incluye un fragmento que resuma el corazón del taller:

```javascript
// Inicialización WebXR
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));

// Controles WASD personalizados
function handleWASDMovement() {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    
    if (keys['KeyW']) {
        camera.position.add(direction.clone().multiplyScalar(moveSpeed));
    }
    if (keys['KeyS']) {
        camera.position.sub(direction.clone().multiplyScalar(moveSpeed));
    }
    // ... más controles
}
```

---

## 📊 Resultados Visuales

### 📌 Este taller **requiere explícitamente un GIF animado**:

> ✅ Si tu taller lo indica, debes incluir **al menos un GIF** mostrando la ejecución o interacción.

- Usa `Peek`, `ScreenToGif`, `OBS`, o desde Python (`imageio`) para generar el GIF.
- **El nombre del GIF debe ser descriptivo del punto que estás presentando.**
- Ejemplo correcto:  
  `deteccion_colores_rojo_verde_torres.gif`  
  `movimiento_robot_esquiva_obstaculos_gomez.gif`  
  `shader_gradiente_temporal_lopez.gif`

🧭 [Ver guía para crear GIFs](./guia_generar_gif.md)

```markdown
![experiencia_xr_multidispositivo](./resultados/experiencia_xr_multidispositivo.gif)
```

> ❌ No se aceptará la entrega si falta el GIF en talleres que lo requieren.

---

## 🧩 Prompts Usados

Enumera los prompts utilizados:

```text
"Create a 3D immersive scene with interactive objects using Three.js and WebXR"
"Implement WASD controls for camera movement in Three.js"
"Add VR controller support for object selection in WebXR"
```

📎 Usa buenas prácticas de prompts según la [guía de IA actualizada](./guia_prompts_inteligencias_artificiales_actualizada.md)

---

## 💬 Reflexión Final

**¿Qué aprendiste o reforzaste con este taller?**

Este taller me permitió comprender profundamente la diferencia entre la experiencia inmersiva con visores XR versus la navegación tradicional con teclado y ratón. Aprendí que la clave está en crear interfaces adaptativas que mantengan la funcionalidad independientemente del dispositivo utilizado. El desarrollo de controles WASD personalizados me enseñó la importancia de considerar la ergonomía y la accesibilidad en aplicaciones 3D.

**¿Qué parte fue más compleja o interesante?**

La implementación del sistema de controles adaptativos fue la parte más desafiante. Tener que manejar dos modos de interacción completamente diferentes (FlyControls para PC y controladores XR para VR) requirió un diseño modular cuidadoso. La parte más interesante fue ver cómo la misma escena 3D podía ser explorada de maneras tan distintas según el dispositivo, manteniendo la coherencia visual y funcional.

**¿Qué mejorarías o qué aplicarías en futuros proyectos?**

Mejoraría el sistema de feedback háptico para usuarios VR y agregaría más opciones de accesibilidad para usuarios con discapacidades. En futuros proyectos aplicaría este enfoque multidispositivo para crear experiencias educativas o de entrenamiento que puedan ser utilizadas tanto en entornos profesionales (con visores) como en casa (con PC), democratizando el acceso a la realidad virtual.

---

## 👥 Contribuciones Grupales (si aplica)

Describe exactamente lo que hiciste tú:

```markdown
- Implementé el sistema de controles WASD personalizados
- Desarrollé la lógica de detección automática de dispositivos
- Creé la interfaz adaptativa entre modo PC y VR
- Optimicé el rendimiento para diferentes dispositivos
- Generé la documentación técnica completa
```

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-07-04_taller_xr_multidispositivo_simulacion_inmersiva`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---

**Desarrollado por:** [Tu Nombre]  
**Fecha:** 2025-07-04  
**Tecnologías:** Three.js, WebXR, JavaScript, HTML5, CSS3 