import cv2
import json
from ultralytics import YOLO
import time

# Cargar modelo preentrenado
modelo = YOLO("yolov8n.pt")

# Ruta al video
video_path = "video.mp4"
cap = cv2.VideoCapture(video_path)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Detección
    resultados = modelo(frame, verbose=False)[0]

    # Contar personas (clase 0 en COCO)
    n_personas = sum(1 for r in resultados.boxes.cls if int(r) == 0)

    # Guardar datos en JSON
    with open("datos.json", "w") as f:
        json.dump({"n_personas": n_personas}, f)

    # Pausa breve para simular tiempo real
    time.sleep(0.03)

cap.release()
