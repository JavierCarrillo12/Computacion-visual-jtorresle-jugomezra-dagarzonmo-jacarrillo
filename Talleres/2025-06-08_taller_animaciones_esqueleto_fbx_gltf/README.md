# 🧪 Animaciones por Esqueleto: Importando y Reproduciendo Animaciones

## 📅 Fecha
`2025-06-08` – Fecha de realización

---

## 🎯 Objetivo del Taller

Este taller se enfoca en el trabajo con animaciones basadas en huesos (esqueleto) y su reproducción desde archivos externos como .FBX o .GLTF. El objetivo es comprender el funcionamiento de las animaciones esqueléticas, su importación correcta y su integración en escenas interactivas.

---

## 🧠 Conceptos Aprendidos

- [x] Transformaciones geométricas (escala, rotación, traslación)
- [x] Shaders y efectos visuales
- [ ] Segmentación de imágenes
- [ ] Entrenamiento de modelos IA
- [ ] Comunicación por gestos o voz
- [x] Otro: Animaciones por esqueleto y sistema de eventos

---

## 🔧 Herramientas y Entornos

- Unity (versión LTS)
- Three.js
- React Three Fiber
- @react-three/drei

📌 Usa las herramientas según la [guía de instalación oficial](./guia_instalacion_entornos_visual.md)

---

## 📁 Estructura del Proyecto

```
2025-06-08_taller_animaciones_esqueleto_fbx_gltf/
├── unity/          # Implementación en Unity
├── threejs/        # Implementación en Three.js con React Three Fiber
└── README.md       # Documentación del proyecto
```

📎 Sigue la estructura de entregas descrita en la [guía GitLab](./guia_gitlab_computacion_visual.md)

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Importación de modelos animados desde Mixamo
2. Implementación de sistemas de animación en Unity y Three.js
3. Desarrollo de transiciones entre animaciones
4. Creación de interfaces interactivas

### 🔹 Código relevante

```javascript
// Control de animaciones con useAnimations en React Three Fiber
const { actions, names } = useAnimations(animations, group)
const [currentAnimation, setCurrentAnimation] = useState(names[0])

useEffect(() => {
  actions[currentAnimation].reset().fadeIn(0.5).play()
  return () => actions[currentAnimation].fadeOut(0.5)
}, [currentAnimation])
```

---

## 📊 Resultados Visuales

### 📌 Este taller **requiere explícitamente un GIF animado**:

> ✅ Se incluirán GIFs mostrando las animaciones y transiciones

- [Pendiente: Agregar GIFs con nombres descriptivos]

---

## 🧩 Prompts Usados

```text
"Create a 3D character with idle, walk and run animations"
"Implement smooth transitions between animations in Unity"
```

📎 Usa buenas prácticas de prompts según la [guía de IA actualizada](./guia_prompts_inteligencias_artificiales_actualizada.md)

---

## 💬 Reflexión Final

[Pendiente: Agregar reflexión sobre lo aprendido en el taller]

---

## 👥 Contribuciones Grupales

```markdown
- Implementación del sistema de animación en Unity
- Desarrollo del control de animaciones en Three.js
- Documentación y GIFs del proyecto
```

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-06-08_taller_animaciones_esqueleto_fbx_gltf`
- [x] Código limpio y funcional
- [ ] GIF incluido con nombre descriptivo
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

--- 