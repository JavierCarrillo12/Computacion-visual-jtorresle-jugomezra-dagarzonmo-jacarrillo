# 🧪 Taller - Cámara en Vivo: Captura y Procesamiento de Video en Tiempo Real con YOLO

## 📅 Fecha
`2025-06-25` – Fecha de realización

---
## 🎯 Objetivo del Taller

Conectar la cámara web del PC y procesar el video en tiempo real usando Python, OpenCV y YOLO para aplicar filtros visuales y realizar detección de objetos en vivo. Este taller combina técnicas de visión artificial clásica con modelos de detección basados en aprendizaje profundo.

---
## 🧠 Conceptos Aprendidos

- [x] Captura de video en tiempo real con cv2.VideoCapture.

- [x] Aplicación de filtros clásicos: escala de grises, binarización, bordes.

- [x] Uso de modelos YOLOv8 para detección de objetos.

- [x] Dibujar cajas, etiquetas y confianza sobre el video en vivo.

- [x] Controles con teclado para manipular la visualización.
---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- Python (`ultralytics`, `opencv-python`, `numpy`)

---

## 📁 Estructura del Proyecto

```
2025-06-20_taller_camara_en_vivo_yolo_opencv/
├── python/
├── README.md
```

---

## 🧪 Implementación

### 🎥 Captura y Procesamiento en Tiempo Real con YOLO

El sistema abre la cámara web del PC usando OpenCV y procesa cada frame en vivo. Se integró YOLOv8 a través de la librería `ultralytics` para realizar detección de objetos en tiempo real.

### 🧩 Flujo General

1. Se inicializa el modelo YOLO y se abre la webcam con cv2.VideoCapture(0).

2. Cada frame es procesado por YOLOv8 para detectar objetos.

3. Se aplican filtros visuales clásicos: escala de grises, binarización y detección de bordes.

4. Se permite controlar la aplicación con el teclado.

### 🧩 Fragmento de código clave

```python
def apply_filter(frame: np.ndarray, filtro: str) -> np.ndarray:
    """Aplica el filtro seleccionado al frame."""
    if filtro == "gray":
        return cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    elif filtro == "binary":
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        _, th = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
        return th
    elif filtro == "canny":
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        return cv2.Canny(gray, 100, 200)
    else:
        return frame
```

## 📊 Resultados Visuales
![camara_en_vivo_objetos](https://github.com/user-attachments/assets/36a74710-a777-47f9-b4f3-f0f16f7eb91b)
![Camara-en-vivo_filtros](https://github.com/user-attachments/assets/8feda02f-2822-4c78-b4ae-15caf22b9fb2)


---

## 🧩 Prompts Usados

```text
¿Cómo configuro y ajusto el umbral de confianza en YOLOv8 para filtrar detecciones y mejorar la precisión en entornos con mucho ruido visual?
```

```text
¿De qué manera puedo exportar una secuencia de frames capturados a un GIF animado usando Python (con imageio o ffmpeg) tras aplicar filtros en tiempo real?
```

---

## 💬 Reflexión Final

Este taller fue una buena introducción a visión por computadora en tiempo real con YOLOv8 y OpenCV, capturando y procesando video en cada fotograma. Su arquitectura modular (captura, filtrado, detección, visualización y grabación) permite integración flexible. Además, se incluyó lógica reactiva: al detectar un celular, por ejemplo. YOLOv8 (modelo yolov8n.pt) resultó rápido y preciso para objetos comunes.
