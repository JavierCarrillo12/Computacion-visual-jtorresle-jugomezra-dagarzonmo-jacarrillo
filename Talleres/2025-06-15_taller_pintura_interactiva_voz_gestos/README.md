# 🧪 Taller - Obras Interactivas: Pintando con Voz y Gestos

## 📅 Fecha
`2025-06-15` – Taller de Pintura Interactiva con Voz y Gestos

---

## 🎯 Objetivo del Taller

Crear una aplicación de pintura digital que permita al usuario dibujar usando únicamente gestos de mano y comandos de voz, eliminando la necesidad de mouse o teclado. El objetivo es explorar la integración de múltiples modalidades de interacción (gestos + voz) para crear una experiencia artística más natural e intuitiva.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] **Detección de gestos con MediaPipe** - Reconocimiento de manos y clasificación de gestos
- [x] **Reconocimiento de voz en tiempo real** - Comandos de voz para control de la aplicación
- [x] **Síntesis de voz (TTS)** - Retroalimentación auditiva al usuario
- [x] **Procesamiento de imágenes con OpenCV** - Captura de cámara y manipulación de canvas
- [x] **Programación multi-threading** - Hilos separados para audio, video y reconocimiento
- [x] **Interfaces visuales interactivas** - HUD informativo y visualización en tiempo real
- [x] **Sistemas de coordenadas normalizadas** - Mapeo de gestos a posiciones en canvas
- [x] **Manejo de estados y modos** - Control de diferentes tipos de pinceles y acciones
- [x] **Persistencia de datos** - Guardado automático de obras generadas
- [x] **Arquitectura orientada a objetos** - Diseño modular y escalable

---

## 🔧 Herramientas y Entornos

**Python** (Entorno principal):

- `mediapipe>=0.10.13` - Detección y seguimiento de manos en tiempo real
- `opencv-python>=4.8.0` - Procesamiento de video y manipulación de imágenes
- `SpeechRecognition>=3.10.0` - Reconocimiento de voz multiplataforma
- `pyaudio>=0.2.11` - Interfaz de audio para captura de micrófono
- `pyttsx3>=2.90` - Síntesis de voz para retroalimentación
- `numpy>=1.24.0` - Operaciones numéricas y manejo de arrays
- `pygame>=2.5.0` - Soporte adicional para audio
- `playsound>=1.3.0` - Reproducción de sonidos

**Sistemas de Reconocimiento**:

- **Google Speech Recognition** - Reconocimiento de voz en español
- **MediaPipe Hands** - Detección de landmarks de manos con 21 puntos

📌 Instalación automática disponible con `pip install -r requirements.txt`

---

## 📁 Estructura del Proyecto

```
2025-06-15_taller_pintura_interactiva_voz_gestos/
├── python/                         # Entorno principal de desarrollo
│   ├── scripts/                    # Scripts principales
│   │   ├── main.py                 # 🎮 Aplicación principal (17KB, 427 líneas)
│   │   ├── main_advanced.py        # Versión avanzada (19KB, 476 líneas)
│   │   ├── simple_painting.py      # Versión simplificada (14KB, 353 líneas)
│   │   └── test_system.py          # Script de pruebas (3.2KB, 111 líneas)
│   ├── app/                        # Módulo de aplicación
│   ├── docs/                       # Documentación adicional
│   ├── requirements.txt            # 📦 Lista de dependencias
│   └── install_dependencies.bat    # Script de instalación automática
├── obras/                          # 🎨 Imágenes generadas por el usuario
│   ├── obra_interactiva_20250615_115622.png
│   ├── obra_interactiva_20250615_110608.png
│   └── README.md                   # Documentación de obras
├── results/                        # 📸 Evidencias visuales del funcionamiento
│   └── interactive_voice_result.gif # 🎬 GIF demostrativo
└── README.md                       # 📚 Documentación completa
```

📎 Estructura modular con separación clara entre código, obras generadas y evidencias visuales.

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. **Configuración del entorno** - Instalación de dependencias y configuración de MediaPipe
2. **Implementación de detección de gestos** - Clasificación de gestos usando landmarks de manos
3. **Integración de reconocimiento de voz** - Sistema de comandos de voz en español
4. **Desarrollo de la interfaz visual** - Canvas de dibujo y HUD informativo
5. **Optimización multi-threading** - Separación de hilos para audio, video y procesamiento
6. **Implementación de tipos de pincel** - Diferentes formas de dibujo (circular, cuadrado, estrella)
7. **Sistema de persistencia** - Guardado automático de obras generadas

### 🔹 Código relevante

**Núcleo de detección de gestos**:

```python
def detectar_gestos(self, landmarks, hand_landmarks):
    """Detectar diferentes tipos de gestos basados en posición de dedos"""
    puntos = np.array([[lm.x, lm.y] for lm in hand_landmarks.landmark])

    # Análisis de extensión de dedos
    indice_extendido = puntos[8][1] < puntos[6][1]  # Tip vs PIP
    medio_extendido = puntos[12][1] < puntos[10][1]
    anular_extendido = puntos[16][1] < puntos[14][1]
    meñique_extendido = puntos[20][1] < puntos[18][1]

    # Clasificación de gestos
    if indice_extendido and not medio_extendido and not anular_extendido:
        return "dedo_indice", puntos[8]
    elif all([indice_extendido, medio_extendido, anular_extendido, meñique_extendido]):
        return "palma_abierta", puntos[9]  # Centro de palma
    elif not any([indice_extendido, medio_extendido, anular_extendido, meñique_extendido]):
        return "puño_cerrado", puntos[9]
```

**Sistema de reconocimiento de voz**:

```python
def escuchar_comandos_voz(self):
    """Hilo dedicado para reconocimiento continuo de voz"""
    while self.escuchando_voz:
        try:
            with self.microphone as source:
                audio = self.recognizer.listen(source, timeout=1, phrase_time_limit=3)
                comando = self.recognizer.recognize_google(audio, language="es-ES")
                self.procesar_comando_voz(comando)
        except (sr.UnknownValueError, sr.WaitTimeoutError):
            pass  # Continuar escuchando
```

**Sistema de dibujo adaptativo**:

```python
def dibujar_en_canvas(self, x, y, gesto):
    """Dibujar según gesto detectado con diferentes tipos de pincel"""
    px, py = int(x * self.canvas_width), int(y * self.canvas_height)

    if gesto == "dedo_indice" and self.posicion_anterior:
        if self.tipo_pincel == "circular":
            cv2.line(self.canvas, self.posicion_anterior, (px, py),
                    self.color_actual, self.grosor_pincel)
        elif self.tipo_pincel == "estrella":
            puntos_estrella = self._generar_estrella(px, py, self.grosor_pincel)
            cv2.fillPoly(self.canvas, [puntos_estrella], self.color_actual)
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

![Pintura Interactiva con Voz y Gestos](./results/interactive_voice_result.gif)

**El GIF demuestra:**

- 🎥 **Captura en tiempo real** de gestos de mano con landmarks visibles
- ✋ **Detección de gestos** - dedo índice para dibujar, palma para cambiar pincel
- 🎤 **Comandos de voz** - cambios de color y acciones mediante voz
- 🎨 **Dibujo simultáneo** en canvas independiente con diferentes tipos de pincel
- 📊 **Interfaz HUD** mostrando estado actual, color, tipo de pincel y último comando
- 🔊 **Retroalimentación TTS** confirmando acciones ejecutadas

> ❌ No se aceptará la entrega si falta el GIF en talleres que lo requieren.

---

## 🧩 Prompts Usados

Enumera los prompts utilizados:

```text
"Necesito crear una aplicación de pintura interactiva que combine MediaPipe para detección de gestos de mano con speech_recognition para comandos de voz. La aplicación debe permitir dibujar en un canvas usando el dedo índice como pincel, cambiar colores por voz, y tener diferentes tipos de pinceles controlados por gestos. Usa OpenCV para la interfaz visual."
```

```text
"Implementa un sistema de clasificación de gestos usando los 21 landmarks de MediaPipe Hands. Necesito detectar: dedo índice extendido (para dibujar), palma abierta (cambiar pincel), y puño cerrado (borrador). La detección debe ser robusta y basada en la posición relativa de los puntos clave."
```

```text
"Crea un sistema de reconocimiento de voz en español que procese comandos para cambiar colores (rojo, verde, azul, etc.), acciones (limpiar, guardar, pincel, borrador) y control (activar, desactivar). Debe funcionar en un hilo separado para no bloquear la interfaz visual."
```

```text
"Implementa diferentes tipos de pinceles que se puedan cambiar por gestos: circular (líneas normales), cuadrado (rectángulos), y estrella (forma personalizada). El cambio debe ocurrir cuando se detecte palma abierta y debe haber retroalimentación TTS."
```

```text
"Diseña una interfaz HUD que muestre en tiempo real: color actual, tipo de pincel, modo (dibujo/borrador), estado de detección, último comando de voz, y controles disponibles. Debe ser informativa pero no intrusiva."
```

```text
"Optimiza el sistema para que funcione fluidamente con múltiples hilos: uno para video, uno para audio, y el principal para la interfaz. Asegúrate de que no haya bloqueos y que la detección sea responsiva."
```

📎 Usa buenas prácticas de prompts según la [guía de IA actualizada](./guia_prompts_inteligencias_artificiales_actualizada.md)

---

## 💬 Reflexión Final

**¿Qué aprendiste o reforzaste con este taller?**

Este taller me permitió explorar la integración de múltiples modalidades de interacción en una sola aplicación. Aprendí a combinar detección de gestos con MediaPipe, reconocimiento de voz en tiempo real, y síntesis de voz para crear una experiencia de usuario más natural e intuitiva. Reforcé conceptos importantes de programación multi-threading, procesamiento de imágenes en tiempo real, y diseño de interfaces interactivas.

**¿Qué parte fue más compleja o interesante?**

La parte más compleja fue sincronizar correctamente los múltiples hilos de ejecución sin crear bloqueos o conflictos de recursos. La detección de gestos requirió un análisis cuidadoso de la geometría de los landmarks para crear clasificadores robustos que funcionaran con diferentes posiciones de mano. Lo más interesante fue descubrir cómo pequeños cambios en los umbrales de detección podían mejorar dramáticamente la precisión del reconocimiento de gestos, y cómo la retroalimentación TTS creaba una experiencia más inmersiva.

**¿Qué mejorarías o qué aplicarías en futuros proyectos?**

Para futuros proyectos implementaría un sistema de calibración personalizada para adaptar la detección a diferentes usuarios y condiciones de iluminación. También agregaría soporte para gestos con dos manos simultáneamente, permitiendo acciones más complejas como zoom, rotación o selección de áreas. La arquitectura modular desarrollada es perfectamente aplicable para proyectos de realidad aumentada, interfaces de accesibilidad, control de presentaciones, o instalaciones artísticas interactivas. El patrón de integración multimodal (voz + gestos + visual) será especialmente valioso para crear experiencias de usuario más naturales e inclusivas.

---

## 👥 Contribuciones Grupales (si aplica)

Describe exactamente lo que hiciste tú:

```markdown
- Implementé el sistema completo de detección de gestos con MediaPipe
- Desarrollé el módulo de reconocimiento de voz en español
- Creé la interfaz visual con OpenCV y el sistema de canvas
- Integré la síntesis de voz para retroalimentación auditiva
- Implementé el sistema multi-threading para optimizar el rendimiento
- Diseñé los diferentes tipos de pinceles y sus animaciones
- Documenté todo el proceso y creé la estructura del proyecto
```

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-06-15_taller_pintura_interactiva_voz_gestos`
- [x] Código limpio y funcional (Python con MediaPipe y OpenCV)
- [x] GIF incluido con nombre descriptivo (interactive_voice_result.gif)
- [x] Visualizaciones o métricas exportadas (obras generadas automáticamente)
- [x] README completo y claro
- [x] Commits descriptivos en inglés
- [x] Sistema de reconocimiento de voz funcional
- [x] Detección de gestos robusta con múltiples tipos
- [x] Interfaz visual interactiva con HUD informativo
- [x] Sistema de persistencia de obras generadas

---
