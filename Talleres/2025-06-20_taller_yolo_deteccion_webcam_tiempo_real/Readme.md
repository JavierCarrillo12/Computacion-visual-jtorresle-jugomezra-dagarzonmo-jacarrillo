# 🧪 Taller - Cámara en Vivo: Captura y Procesamiento de Video en Tiempo Real con YOLO

## 📅 Fecha
`2025-06-25` – Fecha de realización

---
## 🎯 Objetivo del Taller

Implementar detección de objetos en tiempo real utilizando un modelo YOLOv5 o YOLOv8 preentrenado, capturando la señal de la webcam del computador. Se busca explorar la eficiencia y precisión del modelo, así como medir el desempeño del sistema en vivo (FPS).

---
## 🧠 Conceptos Aprendidos

- [x] Detección de objetos en tiempo real
  
- [x] Procesamiento de video con OpenCV
      
- [x] Uso de modelos preentrenados (YOLOv8)

---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- Python (`ultralytics`, `opencv-python`, `numpy`)

---

## 📁 Estructura del Proyecto

```
2025-06-20_taller_yolo_deteccion_webcam_tiempo_real/
├── python/
├── README.md
```

---

## 🧪 Implementación

### 🎥 Captura y Procesamiento en Tiempo Real con YOLO

El sistema abre la cámara web del PC usando OpenCV y procesa cada frame en vivo. Se integró YOLOv8 a través de la librería `ultralytics` para realizar detección de objetos en tiempo real.

### 🧩 Flujo General

1. **Preparación del entorno y datos**
2. **Aplicación del modelo YOLOv8**
3. **Visualización e interacción**
4. **Guardado**

### 🧩 Fragmento de código clave

```python
# 2. Iniciar captura de webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("[ERROR] No se pudo abrir la cámara.")
        return

    print("[INFO] Presiona 'q' para salir.")
```

## 📊 Resultados Visuales
![camara_en_vivo_objetos](https://github.com/user-attachments/assets/36a74710-a777-47f9-b4f3-f0f16f7eb91b)


---

## 🧩 Prompts Usados

```text
¿Qué ajustes puedo aplicar en OpenCV (resolución, FPS, compresión) para optimizar la captura de video y reducir la latencia al procesar frames en tiempo real?
```

```text
¿Con qué comandos ejecuto el script de detección y cómo paso parámetros como confianza mínima o fuente de video?
```

---

## 💬 Reflexión Final

Probé YOLOv8 en tiempo real, configurando el entorno Python, resolviendo instalación y dependencias con espejos de PyPI y usando OpenCV para capturar fotogramas y dibujar etiquetas. Medir FPS e inferencia me ayudó a evaluar la eficiencia del modelo y optimizar el rendimiento.
