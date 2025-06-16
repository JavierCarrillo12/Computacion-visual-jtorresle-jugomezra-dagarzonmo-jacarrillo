from ultralytics import YOLO
import cv2

class ObjectDetector:
    def __init__(self):
        # Cargar el modelo YOLOv5 (puedes cambiar la versión si lo necesitas)
        self.model = YOLO('yolov5su.pt')

    def detect_objects(self, frame):
        # Convertir la imagen de BGR a RGB
        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Obtener las predicciones
        results = self.model(img_rgb)
        
        # Extraer las clases detectadas y sus confianzas
        detections = []
        for result in results:
            boxes = result.boxes
            for box in boxes:
                class_id = int(box.cls[0])
                confidence = float(box.conf[0])
                class_name = result.names[class_id]
                detections.append({
                    'class': class_name,
                    'confidence': confidence
                })
        
        return detections

