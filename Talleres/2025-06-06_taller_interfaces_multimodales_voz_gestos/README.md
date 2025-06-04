# 🧪 Taller - Interfaces Multimodales: Uniendo Voz y Gestos

## 📅 Fecha
2025-06-06 

---

## 🎯 Objetivo del Taller

Fusionar gestos (detectados con MediaPipe) y comandos de voz para realizar acciones compuestas dentro de una interfaz visual. Este taller introduce los fundamentos de los sistemas de interacción multimodal, combinando dos formas de entrada humana para enriquecer la experiencia de control.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Sincronización de hilos para procesar entrada de voz y video simultáneamente  
- [x] Comunicación por gestos (MediaPipe Hands)  
- [x] Reconocimiento de voz (SpeechRecognition + Google API)  
- [x] Lógica condicional multimodal (combinación de gesto + comando)  
- [x] Retroalimentación auditiva (pyttsx3)  
- [ ] Transformaciones geométricas (escala, rotación, traslación)  
- [ ] Segmentación de imágenes  
- [ ] Shaders y efectos visuales  
- [ ] Entrenamiento de modelos IA  

---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- **Lenguaje**: Python 3.9+  
- **Bibliotecas de Visión**: `mediapipe`, `opencv-python`, `numpy`  
- **Reconocimiento de Voz**: `speech_recognition`, `pyaudio`  
- **OSC (opcional)**: `python-osc`  
- **Interfaz Gráfica**: `pygame`  
- **Síntesis de Voz**: `pyttsx3`  
- **Editor/IDE**: Visual Studio Code  
- **Sistema Operativo**: Windows  

---

## 📁 Estructura del Proyecto

```

2025-06-06\_taller\_interfaces\_multimodales/
├── python/
│   ├── main.py
└── README.md

````

- **`main.py`**: Punto de entrada que arranca hilos de voz, gesto y la interfaz visual.  
- **`gesture_detector.py`**: Detecta gestos de mano con MediaPipe y clasifica “palma_abierta”, “dos_dedos” o “ninguno”.  
- **`voice_listener.py`**: Captura audio del micrófono y reconoce comandos simples en español.  
- **`visual_interface.py`**: Crea una ventana `pygame` que reacciona a la combinación de gesto + comando.  
- **`feedback.py`**: Funciones para retroalimentación auditiva con `pyttsx3`.  

---

## 🧪 Implementación

### 🔹 Etapas realizadas

1. **Preparación de datos o escena**  
   - Configuración de MediaPipe Hands para procesar frames en tiempo real desde la webcam.  
   - Configuración de SpeechRecognition con `Microphone()` para capturar comandos de voz.  
   - Configuración de `pygame` para abrir una ventana de 800×600 píxeles.

2. **Aplicación de modelo o algoritmo**  
   - **`gesture_detector.py`**: Se construye un detector que extrae landmarks de la mano y cuenta dedos levantados.  
   - **`voice_listener.py`**: Se usa la API de Google para reconocer texto en español, filtrando un conjunto de comandos válidos.  
   - Hilos (`threading.Thread`) para lanzar simultáneamente la captura de voz y la de gestos sin bloquear la interfaz.

3. **Visualización o interacción**  
   - **`visual_interface.py`**: Mantiene dos colas (`queue.Queue`) en las que entran eventos de voz y eventos de gesto.  
   - Cada iteración del bucle de `pygame` lee ambas colas, actualiza el estado interno (gesto + comando) y dibuja la pantalla con un color y texto que reflejan la acción solicitada.  
   - Lógica condicional multimodal:  
     - Si `gesto == "palma_abierta"` **y** `comando == "cambiar"` → cambia color de fondo a azul.  
     - Si `gesto == "dos_dedos"` **y** `comando == "mover"` → dibujar un cubo que se mueve.  
     - Si `comando == "mostrar"`, sin dependencias de gesto → muestra texto informativo.  
     - Si `comando == "detener"` → reinicia el estado (vuelve al fondo negro y texto “Detenido”).

4. **Guardado de resultados**  
   - No se guarda archivo per se, pero al capturar un gesto y/o comando se registra en consola para depuración.  
   - La interfaz gráfica refleja visualmente cada estado, y `feedback.py` sintetiza un mensaje de voz informando de la acción realizada.

###  Código relevante

Fragmento central donde se combina gesto y voz en `visual_interface.py`:

```python
def update_state(self):
    """
    Lee las colas de voz y gesto y actualiza el estado de la interfaz:
      - current_gesture: "palma_abierta" | "dos_dedos" | "ninguno"
      - current_cmd:     "cambiar" | "mover" | "detener" | None
      - color y texto cambian según la combinación
    """
def update_state(self):
        """
        Lee de las colas de voz y gesto para actualizar
        current_gesture y current_cmd.
        """
        # Leer comandos de voz (si hay)
        try:
            cmd = self.cmd_queue.get_nowait()
            self.current_cmd = cmd
            print(f"[Visual] Comando de voz recibido: {cmd}")
            self.cmd_queue.task_done()
        except queue.Empty:
            pass

        # Leer gesto (si hay)
        try:
            gesto = self.gesture_queue.get_nowait()
            self.current_gesture = gesto
            self.gesture_queue.task_done()
        except queue.Empty:
            pass

        # Lógica condicional:
        # Si la mano está abierta y dicen "cambiar" → cambia color aleatoriamente
        if self.current_gesture == "palma_abierta" and self.current_cmd == "cambiar":
            color_index = np.random.randint(0, len(COLORES_PALMA))
            self.color = COLORES_PALMA[color_index]
            self.estado_texto = "Color cambiado"
            self.feedback.speak("Color cambiado")
            self.current_cmd = None
            self.showing_cube = False

        # Si dos dedos arriba y dicen "mover" → muestra y gira el cubo
        elif self.current_gesture == "dos_dedos" and self.current_cmd == "mover":
            self.showing_cube = True
            self.estado_texto = "Girando cubo"
            self.feedback.speak("Girando cubo")
            self.current_cmd = None

        # Si dicen "detener" y la palma está cerrada, resetear todo
        elif self.current_cmd == "detener" and self.current_gesture == "palma_cerrada":
            self.color = COLOR_FONDO
            self.estado_texto = "Detenido"
            self.feedback.speak("Detenido")
            self.current_cmd = None
            self.current_gesture = "ninguno"
            self.showing_cube = False

        # Actualizar rotación del cubo si está visible
        if self.showing_cube:
            self.cube.rotate()
````

---

## 📊 Resultados Visuales

![Muestra de funcionamiento de comandos](https://github.com/user-attachments/assets/b3d7e0f6-58be-4e95-b252-3f445fbb5f44)

---

## 🧩 Prompts Usados

```text
"Escribe un script en Python que capture gestos de mano en tiempo real usando MediaPipe y OpenCV, y clasifique 'palma abierta' y 'dos dedos'."  
"Escribe un módulo en Python para reconocimiento de voz en español con SpeechRecognition y Google API, filtrando comandos 'cambiar', 'mover', 'mostrar', 'detener'."  
"Combina ambos módulos en una interfaz Pygame que cambie el color de fondo según la combinación de gesto y comando de voz."  
"Agrega retroalimentación por voz con pyttsx3 para anunciar la acción ejecutada al usuario."  
```

---

## 💬 Reflexión Final

Al completar este taller reforcé la experiencia en **procesamiento en tiempo real** y la importancia de gestionar colas y hilos para no bloquear la interfaz. Aprendí cómo MediaPipe facilita la detección precisa de gestos de mano y cómo la API de Google puede integrarse fácilmente con SpeechRecognition para obtener comandos de voz en español.

La parte más compleja fue sincronizar ambas fuentes de entrada (voz y video) y definir una lógica condicional clara que evitara falsos positivos (por ejemplo, ignorar un “cambiar” cuando la mano no está abierta). Fue muy interesante ver cómo la combinación de dos modalidades de entrada enriquece las posibilidades de interacción, abriendo puertas a interfaces más naturales.

En futuros proyectos, exploraría añadir **modelos de reconocimiento de gestos más complejos** (por ejemplo, detección de pulgar, anular, gestos de pinza) y **umbralizar la confianza del reconocimiento de voz** para que se ejecute solo cuando el comando supere cierta certeza. También consideraría usar **OSC** para enviar eventos a aplicaciones externas (Unity, Processing) y hacer una **interfaz distribuida** entre Python y otro motor gráfico.
