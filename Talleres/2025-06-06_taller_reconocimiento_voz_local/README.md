# 🧪 Taller - Voz al Código: Comandos por Reconocimiento de Voz Local

## 📅 Fecha

`2025-06-06`

---

## 🎯 Objetivo del Taller

Implementar una interfaz de voz (Python) que, sin hardware adicional, reciba **comandos hablados**, los procese y dispare **acciones visuales** en Processing por medio de mensajes OSC. El flujo completo es:

1. **Entrada de voz** → Micrófono local.
2. **Procesamiento**

   * `speech_recognition` convierte audio → texto (API Google ES como ejemplo).
   * Se valida el texto contra un diccionario (`VALID_COMMANDS`).
   * Se envía un mensaje OSC (`/cmd <palabra>`) vía `python-osc`.
   * Se genera retroalimentación hablada con `pyttsx3`.
3. **Acción visual** → Processing recibe el mensaje: cambia color de fondo o activa animación rotatoria.

---

## 🧠 Conceptos Aprendidos

* [x] Comunicación por gestos o voz
* [x] Otro: Integración OSC entre Python ↔ Processing

---

## 🔧 Herramientas y Entornos

* **Python 3.11**

  * `speech_recognition` 3.10
  * `python-osc` 1.8
  * `pyttsx3` 2.90
* **Processing 4.3**

  * Biblioteca `oscP5` + `netP5`

---

## 📁 Estructura del Proyecto

```
2025-06-06_taller_reconocimiento_voz_local/
├── python/
│   └── voice_osc.py        # Script principal de reconocimiento y envío OSC
├── processing/
│   └── sketch_250524a.pde        # Escena Processing que responde a /cmd
└── README.md
```

---

## 🧪 Implementación

### 🔹 Etapas realizadas

1. **Calibración de ruido** con `Recognizer.adjust_for_ambient_noise`.
2. **Bucle de escucha**: `listen()` → `recognize_google()`.
3. **Validación y filtrado** de tokens (`green`, `blue`, `switch`, `stop`).
4. **Envío OSC**: `client.send_message("/cmd", word)`.
5. **Render** en Processing: cambio de `background()` o activación de modo *spinning*.
6. **Retroalimentación TTS** (confirmación o error).

### 🔹 Código relevante (Python)

```python
VALID_COMMANDS = {"green", "blue", "switch", "stop"}
client = udp_client.SimpleUDPClient("127.0.0.1", 5005)

def recognize_loop():
    with sr.Microphone() as source:
        r.adjust_for_ambient_noise(source)
    while True:
        with sr.Microphone() as source:
            audio = r.listen(source)
        cmd = r.recognize_google(audio, language="es-ES").lower()
        for word in cmd.split():
            if word in VALID_COMMANDS:
                client.send_message("/cmd", word)
                speak(f"Comando {word} recibido")
                break
```

### 🔹 Código relevante (Processing)

```java
void oscEvent(OscMessage msg) {
  if (msg.checkAddrPattern("/cmd")) {
    currentCmd = msg.get(0).stringValue();
    switch(currentCmd) {
      case "green": bg = color(50,200,50); spinning=false; break;
      case "blue" : bg = color(50,50,200); spinning=false; break;
      case "switch": spinning=true; spinAngle=0; break;
      case "stop": spinning=false; break;
    }
  }
}
```

---

## 📊 Resultados Visuales

![Vídeo sin título ‐ Hecho con Clipchamp](https://github.com/user-attachments/assets/afb2941f-c3bb-4528-b98e-0924a2875274)


---

## 🧩 Prompts Usados

"Por favor dame el código para desarrollar la actividad de la imagen"
"Corrige el código para manejar el problema de hilos"
"Implementa ahora la API de google"
"Comenta el código de manera que pueda entenderlo fácilmente "

---

## 💬 Reflexión Final

Durante este taller comprendimos cómo **encadenar reconocimiento de voz, mensajería OSC y visualización en tiempo real**. Configurar `speech_recognition` con la API de Google entregó una tasa de acierto ≈ 90 % para comandos monosilábicos en un entorno silencioso; sin embargo, frente a ruido ambiental o pronunciación ambigua, la precisión cayó notablemente, lo que activaba mensajes de “Comando inválido”. Integrar un motor TTS offline (`pyttsx3`) mejoró la experiencia de usuario al confirmar la acción reconocida.

La parte más retadora fue mantener la interacción **sin bloqueos de hilo**: resolvimos esto con una cola (`Queue`) y un hilo daemon para el TTS. A futuro nos gustaría reemplazar la API en la nube por un modelo local (Vosk, Whisper.cpp) para cumplir totalmente el requisito offline y añadir *hot-words* que eviten activaciones accidentales.

---

## ✅ Checklist de Entrega

* [x] Carpeta `2025-06-06_taller_reconocimiento_voz_local`
* [x] Código limpio y funcional (`voice_cmd_osc.py`, `voice_visual.pde`)
* [x] GIF incluido con nombre descriptivo
* [x] README completo y claro
* [x] Commits descriptivos en inglés
