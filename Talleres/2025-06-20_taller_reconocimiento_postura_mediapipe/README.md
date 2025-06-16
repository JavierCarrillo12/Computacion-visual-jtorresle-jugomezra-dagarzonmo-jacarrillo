# 🧪 Taller - Reconocimiento de Acciones Simples con Detección de Postura

## 📅 Fecha

2025-06-20

---

## 🎯 Objetivo del Taller

Implementar el reconocimiento de acciones simples (como sentarse, levantar brazos o caminar frente a cámara) usando MediaPipe Pose para detectar la postura corporal. El objetivo es utilizar puntos clave del cuerpo (landmarks) para interpretar la acción y responder visual o sonoramente.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

* Detección de postura
* Creación de landmarks
* Visión artificial

---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

* **Python 3.10+**
* **Bibliotecas**:

  * `mediapipe`, `opencv-python`, `numpy`
  * `pygame` (opcional, para sonidos)
* **IDE / Editor**: VSCode
* **Ejecución**: local (Windows)

---

## 📁 Estructura del Proyecto

```
Taller-Postura-2025-06-07/
├── python/                 
│   ├── Deteccion_de_postura.py        
└── README.md
```

---

## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas

1. **Preparación de la escena**: Configuración de captura de video con OpenCV y de MediaPipe Pose para extraer landmarks.
2. **Detección de landmarks**: Procesar cada frame para obtener coordenadas (x,y) de cadera, rodillas, muñecas y nariz.
3. **Lógica de reconocimiento**:

   * *Sentado*: cadera más baja que las rodillas.
   * *Brazos levantados*: muñecas por encima de la nariz.
   * *Caminando*: alternancia de elevación de rodillas detectada en un intervalo de tiempo.
4. **Retroalimentación visual**: Dibujar landmarks y mostrar texto de la acción detectada; opcionalmente emitir un sonido con `pygame`.

### 🔹 Código relevante

```python
# main.py (fragmento central)
import cv2
from pose_detector import PoseDetector
from action_logic import recognize_action

cap = cv2.VideoCapture(0)
detector = PoseDetector()

while True:
    ret, frame = cap.read()
    frame = cv2.flip(frame, 1)
    landmarks = detector.get_landmarks(frame)
    action = recognize_action(landmarks)
    cv2.putText(frame, f'Acción: {action}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                1, (255, 255, 255), 2)
    cv2.imshow('Acciones Postura', frame)
    if cv2.waitKey(1) & 0xFF == 27:
        break
cap.release()
cv2.destroyAllWindows()
```
---

## Resultado visual

![Vídeo sin título ‐ Hecho con Clipchamp (3)](https://github.com/user-attachments/assets/b89c23f4-2588-4f40-8c0b-e8aad773451d)


---

## 🧩 Prompts Usados

```text
"Genera un script en Python que capture la cámara y use MediaPipe Pose para detectar landmarks corporales."
"Implementa funciones que reconozcan si una persona está sentada, levantando los brazos o caminando según posiciones de cadera, rodillas y muñecas."
"Añade visualización en pantalla usando OpenCV y texto con la acción detectada."
```

---

## 💬 Reflexión Final

Este taller reforzó mi comprensión de **detección de pose** en tiempo real y la aplicación de **lógica condicional** para interpretar posturas humanas. Aprendí a extraer y procesar landmarks corporales con MediaPipe, así como a plantear heurísticas para diferenciar acciones sencillas.

La parte más desafiante fue calibrar los umbrales espaciales (por ejemplo, cuánto margen dejar entre cadera y rodilla) para reducir falsos positivos y adaptarlos a distintas distancias de cámara. Fue muy interesante observar cómo una regla simple puede distinguir acciones como sentarse o levantar los brazos.

En próximos proyectos exploraría integrar **modelos de aprendizaje automático** para mejorar la robustez del reconocimiento, y combinarlo con **retroalimentación auditiva** o **OSC** para controlar aplicaciones externas en tiempo real.
