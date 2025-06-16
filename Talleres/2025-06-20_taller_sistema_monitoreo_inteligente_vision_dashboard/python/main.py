import cv2
import pandas as pd
from detector import ObjectDetector
from logger import Logger
import os
import time
from visual_panel import VisualPanel

# Crear carpetas para guardar las imágenes y logs si no existen
os.makedirs("capturas", exist_ok=True)
os.makedirs("logs", exist_ok=True)

# Configuración inicial del sistema de detección
detector = ObjectDetector()
logger = Logger()

# Inicializar el panel visual
visual_panel = VisualPanel()
visual_panel.run()

# Inicialización de variables para el contador y estado
frame_count = 0

# Abrir la cámara
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Detección de objetos
    detections = detector.detect_objects(frame)

    # Actualizar el panel visual con el frame actual
    visual_panel.update_frame(frame)

    # Mostrar las estadísticas en el panel visual
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())
    
    # Actualizar el panel visual con las estadísticas
    visual_panel.update(detections)

    # Crear entradas de log para cada detección
    for detection in detections:
        log_entry = {
            "timestamp": timestamp,
            "evento": f"{detection['class']} detectado",
            "clase": detection['class'],
            "confianza": f"{detection['confidence']:.2f}"
        }
        # Actualizar logs en el panel visual
        visual_panel.update_logs(log_entry)

    # Guardar la imagen si se detecta algún objeto
    if detections:
        cv2.imwrite(f"capturas/detection_{timestamp}.jpg", frame)

    # Esperar una tecla para salir
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
