# 🧪 Exploración de Dispositivos de Realidad Extendida (XR)

## 📅 Fecha
`2025-07-12` – Taller Práctico 3 de Computación Visual

---

## 🎯 Objetivo del Taller

Explorar y comparar cinco dispositivos de Realidad Extendida (XR): **HoloLens 1**, **HoloLens 2**, **Magic Leap 1**, **Apple Vision Pro** y **Meta Quest Pro**. El objetivo es comprender sus capacidades, limitaciones y aplicaciones prácticas en industria, educación y entretenimiento, desarrollando un prototipo interactivo en Unity que demuestre las diferentes formas de interacción disponibles en cada plataforma.

## 🧠 Conceptos Aprendidos

- [x] Interacción multimodal (gestos, voz, controladores)
- [x] Arquitecturas de dispositivos XR
- [x] Desarrollo de experiencias inmersivas
- [x] Optimización para diferentes plataformas
- [x] Sistemas de tracking y seguimiento
- [x] Interfaces de usuario para realidad extendida
- [x] Comparación de especificaciones técnicas
- [x] Evaluación de experiencia de usuario en XR

## 🔧 Herramientas y Entornos

- **Unity 2022.3 LTS** con XR Interaction Toolkit
- **Microsoft Mixed Reality Toolkit (MRTK)** para HoloLens
- **Magic Leap SDK** para Magic Leap 1
- **visionOS SDK** para Apple Vision Pro
- **Oculus Integration** para Meta Quest Pro
- **C#** para desarrollo de scripts
- **Git** para control de versiones

📌 Usa las herramientas según la [guía de instalación oficial](./guia_instalacion_entornos_visual.md)

## 📁 Estructura del Proyecto

```
TallerPractico3_VR/
├── assets/                 # Proyecto Unity completo
│   ├── Scripts/           # Scripts C# para interacciones XR
│   ├── Prefabs/          # Objetos interactivos
│   ├── Materials/         # Materiales para objetos
│   └── Scenes/           # Escenas de Unity
├── docs/                  # Documentación técnica
├── reports/               # Plantillas de informes
├── demos/                 # Demostraciones y videos
├── unity/                 # Proyectos Unity adicionales
└── README.md
```

📎 Sigue la estructura de entregas descrita en la [guía GitLab](./guia_gitlab_computacion_visual.md)

## 🧪 Implementación

### 🔹 Etapas realizadas

1. **Preparación del entorno Unity**: Configuración del proyecto con scripts para diferentes dispositivos XR
2. **Desarrollo de scripts de interacción**: Creación de manejadores para gestos, voz y controladores
3. **Implementación de objetos interactivos**: Sistema de objetos que responden a diferentes tipos de interacción
4. **Configuración de UI para XR**: Sistema de feedback visual adaptado a dispositivos de realidad extendida
5. **Testing y optimización**: Pruebas con simulación de teclas para diferentes plataformas

### 🔹 Código relevante

**InteractionManager.cs** - Gestor principal de interacciones:

```csharp
public void InitializeInteractionSystem()
{
    currentDevice = targetDevice;
    SetupDeviceSpecificComponents();
    InitializeHandlers();
    SetupEventListeners();
    isInitialized = true;
}

private void ProcessDeviceInput()
{
    switch (currentDevice)
    {
        case XRDeviceType.HoloLens2:
            ProcessHoloLensInput();
            break;
        case XRDeviceType.AppleVisionPro:
            ProcessAppleVisionProInput();
            break;
        // ... otros dispositivos
    }
}
```

**InteractiveObject.cs** - Objetos que responden a interacciones:

```csharp
public void OnGestureDetected(string gestureType)
{
    switch (gestureType.ToLower())
    {
        case "tap":
            ToggleActive();
            break;
        case "grab":
            Select();
            break;
    }
}
```

## 📊 Resultados Visuales

### 📌 Este taller **requiere explícitamente un GIF animado**:

> ✅ Si tu taller lo indica, debes incluir **al menos un GIF** mostrando la ejecución o interacción.

- Usa `Peek`, `ScreenToGif`, `OBS`, o desde Python (`imageio`) para generar el GIF.
- **El nombre del GIF debe ser descriptivo del punto que estás presentando.**
- Ejemplo correcto:  
  `interaccion_gestos_hololens_carrillo.gif`  
  `prototipo_voz_visionpro_garzon.gif`  
  `controlador_magicleap_torres.gif`

🧭 [Ver guía para crear GIFs](./guia_generar_gif.md)

```markdown
![interaccion_gestos](./demos/interaccion_gestos_hololens_carrillo.gif)
```

> ❌ No se aceptará la entrega si falta el GIF en talleres que lo requieren.

## 🧩 Prompts Usados

Enumera los prompts utilizados:

```text
"Create a Unity script for gesture recognition in HoloLens 2"
"Implement voice command system for Apple Vision Pro"
"Design interactive object system for XR devices"
"Create UI feedback system for mixed reality applications"
```

📎 Usa buenas prácticas de prompts según la [guía de IA actualizada](./guia_prompts_inteligencias_artificiales_actualizada.md)

## 💬 Reflexión Final

Este taller me permitió comprender profundamente las diferencias entre los dispositivos de realidad extendida disponibles en el mercado. La experiencia de desarrollo en Unity con diferentes SDKs me mostró la complejidad de crear experiencias que funcionen bien en múltiples plataformas.

La parte más interesante fue implementar el sistema de interacciones multimodales, donde cada dispositivo tiene sus propias fortalezas: HoloLens con sus gestos precisos, Apple Vision Pro con el seguimiento ocular, y Meta Quest Pro con sus controladores. La simulación con teclas fue fundamental para testing sin acceso físico a todos los dispositivos.

Para futuros proyectos, aplicaría este conocimiento para diseñar experiencias XR más inclusivas que aprovechen las capacidades específicas de cada plataforma, y desarrollaría herramientas de abstracción que faciliten el desarrollo multiplataforma.

## 👥 Contribuciones Grupales

Describe exactamente lo que hiciste tú:

```markdown
- Desarrollé el sistema de gestión de interacciones (InteractionManager.cs)
- Implementé los manejadores de gestos, voz y controladores
- Creé el sistema de objetos interactivos con estados visuales
- Diseñé la estructura del proyecto Unity con prefabs y materiales
- Documenté el proceso de desarrollo y las especificaciones técnicas
```

## ✅ Checklist de Entrega

- [x] Carpeta `TallerPractico3_VR`
- [x] Código limpio y funcional en Unity
- [x] GIF incluido con nombre descriptivo (requerido para este taller)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---

## 🔗 Recursos y Lecturas

- [Microsoft HoloLens Documentation](https://docs.microsoft.com/hololens/)
- [Magic Leap Developer Portal](https://developer.magicleap.com/)
- [Apple Vision Pro Overview](https://developer.apple.com/vision-pro/)
- [Meta Quest Pro Developer Hub](https://developer.oculus.com/quest/)

## Autores
- Javier Andrés Carrillo
- Daniel Felipe Garzón
- Jorge Andrés Torres
- Juan Pablo Gómez

**Profesora:** Aura Maria Forero Pachon

**Universidad Nacional de Colombia**  
**Facultad de Ingeniería**

---
*Este taller forma parte del curso de Computación Visual* 