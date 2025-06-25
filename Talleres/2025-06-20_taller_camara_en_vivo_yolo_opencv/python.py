"""
Taller: Cámara en vivo con filtros clásicos + detección YOLOv8
Requisitos:
  - Python 3.8+
  - opencv-python
  - numpy
  - ultralytics
  - imageio (para exportar GIFs)
"""

import cv2
import numpy as np
from ultralytics import YOLO
import time
import imageio
import os

# Parámetros configurables
CONF_THRESHOLD = 0.5
GIF_FPS = 10
GIF_FRAMES = 50
GIF_OUTPUT_DIR = "media/gifs"

# Existencia carpeta de GIFs
os.makedirs(GIF_OUTPUT_DIR, exist_ok=True)


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


def draw_boxes(frame: np.ndarray, boxes, confidences, class_ids, class_names):
    """Dibuja rectángulos y etiquetas sobre el frame."""
    for box, conf, cid in zip(boxes, confidences, class_ids):
        x1, y1, x2, y2 = map(int, box)
        label = f"{class_names[cid]} {conf:.2f}"
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(frame, label, (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)


def export_gif(frames: list[np.ndarray], filtro: str):
    """Guarda un GIF de los primeros GIF_FRAMES frames."""
    path = os.path.join(GIF_OUTPUT_DIR, f"{filtro}.gif")
    imageio.mimsave(path, frames[:GIF_FRAMES], fps=GIF_FPS)
    print(f"[INFO] GIF guardado en: {path}")


def main():
    # Cargar modelo YOLOv8
    model = YOLO("yolov8n.pt")
    class_names = model.names

    # 3. Iniciar captura
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("[ERROR] No se pudo abrir la cámara.")
        return

    filtro_actual = "none"
    deteccion_activa = True
    grabando_gif = False
    gif_frames = []

    fps_time = time.time()

    print("[INFO] Teclas disponibles:")
    print("  g: gris    | b: binario    | c: Canny")
    print("  n: none    | d: toggle detección YOLO")
    print("  s: screenshot (PNG)")
    print("  m: grabar GIF")
    print("  p: pausar/reanudar  | q: salir")

    pausado = False
    while True:
        if not pausado:
            ret, frame = cap.read()
            if not ret:
                break

            # 4. Aplicar filtro
            filtered = apply_filter(frame, filtro_actual)
            display_frame = frame.copy()

            # Si el filtro devuelve imagen en gris o bordes, convertir a BGR para superponer
            if filtro_actual in ("gray", "binary", "canny"):
                display_frame = cv2.cvtColor(filtered, cv2.COLOR_GRAY2BGR)

            # 5. Detección YOLO
            if deteccion_activa:
                results = model(frame)[0]
                boxes = results.boxes.xyxy.cpu().numpy()
                confs = results.boxes.conf.cpu().numpy()
                ids = results.boxes.cls.cpu().numpy().astype(int)
                keep = confs >= CONF_THRESHOLD
                draw_boxes(display_frame, boxes[keep], confs[keep], ids[keep], class_names)

            # 6. Mostrar FPS
            fps = 1.0 / (time.time() - fps_time)
            fps_time = time.time()
            cv2.putText(display_frame, f"FPS: {fps:.1f}", (10, 20),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 1)

            cv2.imshow("Taller YOLO+Filtros", display_frame)

            # 7. Grabar frames para GIF
            if grabando_gif:
                gif_frames.append(display_frame.copy())
                if len(gif_frames) >= GIF_FRAMES:
                    export_gif(gif_frames, filtro_actual or "full")
                    grabando_gif = False
                    gif_frames.clear()

        # 8. Manejo de teclado
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('p'):
            pausado = not pausado
        elif key == ord('g'):
            filtro_actual = "gray"
        elif key == ord('b'):
            filtro_actual = "binary"
        elif key == ord('c'):
            filtro_actual = "canny"
        elif key == ord('n'):
            filtro_actual = "none"
        elif key == ord('d'):
            deteccion_activa = not deteccion_activa
        elif key == ord('s'):
            nombre = f"screenshot_{int(time.time())}.png"
            cv2.imwrite(os.path.join("media/screenshots", nombre), display_frame)
            print(f"[INFO] Captura guardada: media/screenshots/{nombre}")
        elif key == ord('m'):
            grabando_gif = True
            gif_frames = []
            print(f"[INFO] Iniciando grabación de GIF ({GIF_FRAMES} frames)...")

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()