# 🧪 Taller - Realidad Mixta con Unity: Superposición de Elementos sobre Video

## 📅 Fecha
`2025-07-04` – Fecha de entrega o realización

---

## 🎯 Objetivo del Taller

Crear una escena en **Unity** donde se superpongan objetos 3D sobre una fuente de video simulada, recreando una experiencia tipo passthrough similar a la de **HoloLens o Meta Quest**, pero sin necesidad de visor. El objetivo es entender cómo anclar elementos virtuales sobre un fondo real capturado por cámara o video, simulando la experiencia de realidad mixta.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Transformaciones geométricas (escala, rotación, traslación)
- [x] Shaders y efectos visuales
- [x] Integración de video en tiempo real
- [x] Interacción con objetos 3D
- [x] Efectos de transparencia y passthrough
- [x] Gestión de capas y renderizado
- [x] Comunicación por gestos o voz
- [x] Otro: Simulación de realidad mixta sin visor

---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- Unity (versión 2022.3 LTS, Video Player, WebCamTexture)
- C# Scripting (MonoBehaviour, Coroutines, Event Handling)
- UI Canvas y RawImage para video de fondo
- Materiales y shaders para transparencia
- OBS Studio para grabación de video

📌 Usa las herramientas según la [guía de instalación oficial](./guia_instalacion_entornos_visual.md)

---

## 📁 Estructura del Proyecto

```
2025-07-04_taller_realidad_mixta_unity_video_passthrough/
├── unity/                    # Proyecto Unity completo
│   ├── Assets/
│   │   └── Scripts/         # Scripts C# del proyecto
│   ├── Scenes/              # Escenas de Unity
│   └── ProjectSettings.txt  # Configuración del proyecto
├── media/                   # Videos de fondo y documentación
│   └── README_VIDEO.md     # Guía para videos
├── resultados/              # GIFs y capturas de pantalla
├── README.md
```

📎 Sigue la estructura de entregas descrita en la [guía GitLab](./guia_gitlab_computacion_visual.md)

---

## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas
1. **Preparación del proyecto Unity**: Crear proyecto 3D y configurar cámara principal.
2. **Configuración del video de fondo**: Implementar VideoBackgroundController para webcam y archivos de video.
3. **Creación de objetos virtuales**: Agregar cubos, esferas y cilindros con scripts de interacción.
4. **Implementación del efecto passthrough**: Configurar transparencia y materiales para simular realidad mixta.
5. **Sistema de interacción**: Implementar controles de teclado y mouse para manipular objetos.
6. **Grabación de video demostrativo**: Usar OBS Studio para capturar la experiencia completa.

### 🔹 Código relevante

Incluye un fragmento que resuma el corazón del taller:

```csharp
// VideoBackgroundController.cs - Manejo de video de fondo
private void InitializeWebcam()
{
    WebCamDevice[] devices = WebCamTexture.devices;
    if (devices.Length == 0)
    {
        Debug.LogWarning("No se encontraron dispositivos de webcam.");
        return;
    }
    
    webCamTexture = new WebCamTexture(selectedDevice.name, webcamWidth, webcamHeight, 30);
    webCamTexture.Play();
    backgroundImage.texture = webCamTexture;
}

// ObjectInteraction.cs - Interacción con objetos 3D
private void HandleMouseInteraction()
{
    if (Input.GetMouseButtonDown(0))
    {
        Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);
        RaycastHit hit;
        
        if (Physics.Raycast(ray, out hit) && hit.collider.gameObject == gameObject)
        {
            OnObjectClicked();
        }
    }
}
```

---

## 📊 Resultados Visuales

### 📌 Este taller **requiere explícitamente un GIF animado**:

> ✅ Si tu taller lo indica, debes incluir **al menos un GIF** mostrando la ejecución o interacción.

- Usa `Peek`, `ScreenToGif`, `OBS`, o desde Python (`imageio`) para generar el GIF.
- **El nombre del GIF debe ser descriptivo del punto que estás presentando.**
- Ejemplo correcto:  
  `realidad_mixta_objetos_3d_superpuestos_video.gif`  
  `interaccion_objetos_virtuales_mouse_unity.gif`  
  `efecto_passthrough_webcam_objetos_flotantes.gif`

🧭 [Ver guía para crear GIFs](./guia_generar_gif.md)

```markdown
![realidad_mixta](./resultados/realidad_mixta_objetos_3d_superpuestos_video.gif)
```

> ❌ No se aceptará la entrega si falta el GIF en talleres que lo requieren.

---

## 🧩 Prompts Usados

Enumera los prompts utilizados:

```text
"Create a Unity script for video background controller that handles both webcam and video files"
"Implement object interaction script for 3D objects with mouse and keyboard controls"
"Design passthrough effect script to simulate mixed reality experience without headset"
"Create mixed reality scene manager to coordinate all components in Unity"
```

📎 Usa buenas prácticas de prompts según la [guía de IA actualizada](./guia_prompts_inteligencias_artificiales_actualizada.md)

---

## 💬 Reflexión Final

Responde en 2-3 párrafos:

**Aprendizaje y Conceptos Reforzados:**
Este taller me permitió comprender profundamente cómo funciona la realidad mixta simulada, especialmente la diferencia entre un visor AR real y una simulación en Unity. Aprendí a manejar WebCamTexture, VideoPlayer, y cómo coordinar múltiples scripts para crear una experiencia cohesiva. El concepto más interesante fue entender cómo los objetos 3D pueden "flotar" sobre un video de fondo, creando la ilusión de realidad mixta.

**Parte Más Compleja e Interesante:**
La parte más desafiante fue sincronizar correctamente el video de fondo con los objetos 3D, especialmente manejar las diferentes resoluciones y aspect ratios. También fue complejo implementar el efecto de transparencia adecuado para que los objetos se vean naturales sobre el video. Lo más interesante fue ver cómo pequeños ajustes en la configuración de materiales y capas pueden cambiar completamente la percepción de la experiencia.

**Mejoras y Aplicaciones Futuras:**
Para futuros proyectos, me gustaría implementar tracking de movimiento más avanzado, posiblemente usando MediaPipe para detectar manos y gestos. También exploraría la integración con sensores de profundidad para crear un efecto de oclusión más realista. Este tipo de simulación es perfecta para prototipar aplicaciones AR antes de invertir en hardware costoso, y podría aplicarse en educación, entretenimiento y desarrollo de interfaces inmersivas.

---

## 👥 Contribuciones Grupales (si aplica)

Describe exactamente lo que hiciste tú:

```markdown
- Desarrollé todos los scripts C# para Unity (VideoBackgroundController, ObjectInteraction, PassthroughEffect, MixedRealitySceneManager)
- Configuré la estructura completa del proyecto Unity
- Implementé el sistema de interacción con mouse y teclado
- Creé la documentación técnica y guías de instalación
- Diseñé el sistema de efectos de transparencia para simular passthrough
```

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-07-04_taller_realidad_mixta_unity_video_passthrough`
- [x] Código limpio y funcional (4 scripts C# completos)
- [x] GIF incluido con nombre descriptivo (realidad_mixta_objetos_3d_superpuestos_video.gif)
- [x] Visualizaciones o métricas exportadas (proyecto Unity funcional)
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---

## 🛠️ Criterios de Evaluación

✅ Integración funcional de video o cámara como fondo.  
✅ Superposición clara de objetos 3D en la escena.  
✅ Animaciones o interacción básica con los elementos.  
✅ Código ordenado, comentado y reutilizable.  
✅ README con explicación técnica, capturas y reflexión.  
✅ Commits descriptivos en inglés.

---

## 📁 Archivos del Proyecto

### Scripts de Unity
- **`VideoBackgroundController.cs`**: Controlador principal para manejar el video de fondo y la webcam.
- **`ObjectInteraction.cs`**: Script para manejar la interacción con objetos 3D superpuestos.
- **`PassthroughEffect.cs`**: Implementación del efecto passthrough básico.
- **`MixedRealitySceneManager.cs`**: Gestor principal de la escena de realidad mixta.

### Configuración
- **`ProjectSettings.txt`**: Configuración del proyecto Unity
- **`README_VIDEO.md`**: Guía para videos de fondo

---

## 🎯 Resultados Esperados

1. **Video de fondo funcional**: Ya sea desde webcam o archivo de video
2. **Objetos 3D superpuestos**: Cubos, esferas o modelos personalizados
3. **Interacción básica**: Los objetos reaccionan al mouse o input
4. **Animaciones**: Rotación, escala o movimiento de los objetos
5. **Efecto passthrough simulado**: Los objetos aparecen "flotando" sobre el video

---

## 🔧 Configuración Técnica

### Requisitos del Sistema
- Unity 2022.3 LTS o superior
- Cámara web (opcional, para webcam)
- Archivo de video MP4 (opcional, para video de fondo)
- OBS Studio (para grabación de video)

### Controles Implementados
- **W**: Cambiar a webcam
- **V**: Cambiar a video file
- **P**: Alternar efecto passthrough
- **H**: Ocultar/mostrar controles de UI
- **R**: Reiniciar escena
- **Clic izquierdo**: Interactuar con objetos virtuales 