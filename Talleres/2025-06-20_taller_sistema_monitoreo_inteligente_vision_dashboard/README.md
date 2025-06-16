# 🧪 Taller - Construcción de un Mini-Sistema de Monitoreo Inteligente

## 📅 Fecha
2025-06-06

---

## 🎯 Objetivo del Taller

Diseñar un sistema de monitoreo inteligente que integre visión por computador (detección de personas u objetos) y un panel visual en tiempo real que permita observar lo que ocurre frente a la cámara. Además, se implementará la capacidad de generar logs o capturas automáticas según eventos definidos.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Captura de video en tiempo real con OpenCV
- [x] Detección de objetos con YOLOv5 o cvlib
- [x] Visualización en tiempo real con **matplotlib**, **tkinter**, **dash**
- [x] Registro de eventos y almacenamiento de logs con **pandas**
- [x] Generación de imágenes capturadas al detectar objetos
- [ ] Manejo de eventos asíncronos para notificaciones o alertas
- [ ] Implementación de estadísticas de detección en tiempo real

---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- **Python 3.9+**  
- **Bibliotecas**:
  - `opencv-python`: Para la captura y procesamiento de video.
  - `ultralytics` o `cvlib`: Para la detección de objetos en tiempo real.
  - `matplotlib`, `dash`, o `tkinter`: Para el panel visual dinámico.
  - `pandas`: Para exportar los logs y capturas de eventos.
  - `datetime`, `os`: Para gestionar los registros y carpetas.
  
- **Editor/IDE**: Visual Studio Code / PyCharm  
- **Ejecución**: Local (Windows, Linux o macOS)  

---

## 📁 Estructura del Proyecto

```

Mini-Sistema-Monitoreo-Inteligente/
├── python/
│   ├── main.py
│   ├── detector.py
│   ├── logger.py
│   ├── visual\_panel.py
│   └── capture.py
└── README.md
└── logs/
└── captures/

````

- **`main.py`**: Punto de entrada del proyecto. Captura el video y maneja la ejecución del sistema.  
- **`detector.py`**: Contiene la lógica de detección de personas y objetos usando YOLOv5/v8 o cvlib.  
- **`logger.py`**: Maneja la creación y escritura de logs con **pandas** y guarda los eventos en CSV.  
- **`visual_panel.py`**: Configura el panel visual en tiempo real para mostrar las estadísticas, los contadores y gráficos.  
- **`capture.py`**: Gestiona las capturas de imágenes cuando se detectan personas y las guarda en la carpeta correspondiente.  

---

## 🧪 Implementación

### 🔹 Etapas realizadas

1. **Captura de video**:  
   - Se configura la cámara web con OpenCV y se captura cada frame en tiempo real.
   
2. **Detección de objetos**:  
   - Usamos **YOLOv5**, **YOLOv8** o **cvlib.detect_common_objects()** para detectar personas y otros objetos en el video.
   - Se calculan estadísticas en tiempo real, como el conteo de objetos detectados por tipo.

3. **Visualización en tiempo real**:  
   - Se presenta un panel visual que incluye:
     - Conteo de objetos detectados.
     - Gráficos de barras o líneas en tiempo real para visualizar la cantidad de objetos detectados a lo largo del tiempo.
     - Estado del sistema (inactivo, alerta, grabando).

4. **Generación de logs y capturas**:  
   - Cuando se detecta una persona, se guarda una imagen y se registra el evento con el **timestamp** y la **descripción** en un archivo CSV.
   - Se crean carpetas `logs/` y `captures/` para guardar los logs y las imágenes de las detecciones.

5. **Notificación de eventos** (opcional):  
   - Se pueden implementar notificaciones visuales o emergentes para alertar sobre eventos importantes, como la detección de personas.

### 🔹 Código relevante

```python
# main.py (fragmento central)
import cv2
import pandas as pd
from detector import ObjectDetector
from logger import EventLogger
from visual_panel import VisualPanel
from capture import CaptureImage
import time

# Inicializar los componentes
detector = ObjectDetector()
logger = EventLogger()
visual_panel = VisualPanel()
capture = CaptureImage()

cap = cv2.VideoCapture(0)

# Crear DataFrame para los logs
log_columns = ['timestamp', 'evento', 'clase', 'confianza']
logs_df = pd.DataFrame(columns=log_columns)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    objects_detected = detector.detect_objects(frame)

    # Actualizar el panel visual con los resultados
    visual_panel.update(objects_detected)

    for obj in objects_detected:
        if obj['class'] == 'person':
            # Guardar la imagen capturada si se detecta una persona
            capture.save_image(frame)

            # Escribir el log de evento
            timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
            log_entry = {
                'timestamp': timestamp,
                'evento': 'Persona detectada',
                'clase': obj['class'],
                'confianza': obj['confidence']
            }
            logs_df = logs_df.append(log_entry, ignore_index=True)

    # Mostrar el panel y estadísticas
    cv2.imshow('Monitoreo', frame)

    # Terminar con 'ESC'
    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()

# Guardar el log en un archivo CSV
logs_df.to_csv('logs/eventos.csv', index=False)
````

---

## 🧩 Prompts Usados

```text
"Genera un sistema en Python que use YOLOv5 o cvlib para detectar personas y objetos en video, y registre eventos en un archivo CSV."
"Implementa un panel visual que muestre las estadísticas de detección (conteo de objetos, tipo de objeto) y gráficos en tiempo real."
"Implementa la funcionalidad para guardar imágenes cuando se detecta una persona y guardar un log con el evento."
```

---

## 💬 Reflexión Final

Este taller me permitió reforzar mi conocimiento sobre **visión por computador** y cómo integrar detección en tiempo real con **paneles visuales** para mostrar información dinámica. El uso de YOLOv5/v8 para detección fue interesante, ya que permite identificar objetos en alta calidad y en tiempo real, lo que es crucial para un sistema de monitoreo.

La parte más compleja fue integrar todos los componentes en una sola aplicación fluida: captura de video, procesamiento de imágenes, visualización en tiempo real y manejo de logs. Además, la parte de la creación de los logs y las capturas automáticas me permitió mejorar mis habilidades en la gestión de archivos y el manejo de datos con **pandas**.

En futuros proyectos, consideraría agregar **funcionalidades de alerta en tiempo real**, como notificaciones emergentes o alertas visuales para situaciones más críticas, y podría incorporar modelos más avanzados de detección para identificar más tipos de objetos.

