#!/usr/bin/env python3
"""
Taller: Detección de Objetos en Tiempo Real con YOLO y Webcam
Requisitos:
  - Python 3.8+
  - opencv-python
  - ultralytics
  - torch
"""

import cv2
import time
from ultralytics import YOLO

def main():
    # 1. Cargar modelo YOLOv8
    model = YOLO("yolov8n.pt") 

    # 2. Iniciar captura de webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("[ERROR] No se pudo abrir la cámara.")
        return

    print("[INFO] Presiona 'q' para salir.")

    # 3. Bucle principal de detección
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 3.1 Medir tiempo de inicio de inferencia
        t0 = time.time()

        # 3.2 Ejecutar detección (stream=True para procesar frame a frame)
        results = model.predict(source=frame, stream=True)
        det = next(results)

        # 3.3 Extraer cajas, clases y confiancias
        for box in det.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            conf = float(box.conf[0])
            cls = int(box.cls[0])
            label = f"{model.names[cls]} {conf:.2f}"
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0,255,0), 2)
            cv2.putText(frame, label, (x1, y1-10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,255,0), 1)

        # 3.4 Calcular tiempos
        infer_time = (time.time() - t0) * 1000 # ms
        fps = 1.0 / (time.time() - t0)
        info = f"Infer: {infer_time:.1f} ms  FPS: {fps:.1f}"
        cv2.putText(frame, info, (10,30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,255,255), 2)

        # 3.5 Mostrar resultado
        cv2.imshow("YOLOv8 - Detección en Vivo", frame)

        # 4. Control con tecla 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
