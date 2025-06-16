import cv2
import mediapipe as mp
import numpy as np
import time

# ----------------------------------------
# Inicializar MediaPipe Pose
# ----------------------------------------
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    static_image_mode=False,
    model_complexity=1,
    enable_segmentation=False,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)
mp_drawing = mp.solutions.drawing_utils

# ----------------------------------------
# Ventana de captura
# ----------------------------------------
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    raise IOError("No se pudo abrir la cámara")

# Para detectar alternancia de pasos
prev_step = None
step_count = 0
step_time = time.time()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Voltear para espejo
    frame = cv2.flip(frame, 1)
    h, w, _ = frame.shape

    # Convertir a RGB y procesar
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb)

    action = "Ninguno"
    if results.pose_landmarks:
        lm = results.pose_landmarks.landmark

        # Coordenadas clave
        # Y aumenta hacia abajo
        left_hip_y  = lm[mp_pose.PoseLandmark.LEFT_HIP].y * h
        right_hip_y = lm[mp_pose.PoseLandmark.RIGHT_HIP].y * h
        hip_y = (left_hip_y + right_hip_y) / 2

        left_knee_y  = lm[mp_pose.PoseLandmark.LEFT_KNEE].y * h
        right_knee_y = lm[mp_pose.PoseLandmark.RIGHT_KNEE].y * h
        knee_y = (left_knee_y + right_knee_y) / 2

        left_wrist_y  = lm[mp_pose.PoseLandmark.LEFT_WRIST].y * h
        right_wrist_y = lm[mp_pose.PoseLandmark.RIGHT_WRIST].y * h
        wrist_y = min(left_wrist_y, right_wrist_y)

        nose_y = lm[mp_pose.PoseLandmark.NOSE].y * h

        # Detectar sentado: cadera más abajo que rodillas
        if hip_y > knee_y + 20:  # se añade un pequeño margen
            action = "Sentado"

        # Detectar brazos levantados: muñecas por encima de la cabeza (nariz)
        elif wrist_y < nose_y - 20:
            action = "Brazos levantados"

        else:
            # Detectar "caminar" por alternancia de rodillas levantadas
            # Simple heuristic: si alguna rodilla se levanta por encima de la cadera
            left_step  = left_knee_y < hip_y - 20
            right_step = right_knee_y < hip_y - 20

            current_step = None
            if left_step and not right_step:
                current_step = "izquierda"
            elif right_step and not left_step:
                current_step = "derecha"

            if current_step and current_step != prev_step:
                step_count += 1
                prev_step = current_step
                step_time = time.time()

            # Si hemos detectado al menos 4 alternancias en 2 segundos → caminando
            if step_count >= 4 and time.time() - step_time < 2.0:
                action = "Caminando"
            # Reiniciar contador si pasa mucho tiempo sin pasos
            if time.time() - step_time > 2.0:
                step_count = 0
                prev_step = None

        # Dibujar landmarks
        mp_drawing.draw_landmarks(
            frame,
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS,
            mp_drawing.DrawingSpec(color=(0,255,0), thickness=2, circle_radius=2),
            mp_drawing.DrawingSpec(color=(0,0,255), thickness=2)
        )

    # Mostrar acción detectada en pantalla
    cv2.rectangle(frame, (5, 5), (500, 50), (255, 255, 255), -1)
    cv2.putText(frame, f'Accion: {action}', (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,0), 2)

    cv2.imshow('Deteccion de Acciones con Pose', frame)
    if cv2.waitKey(1) & 0xFF == 27:  # ESC para salir
        break

cap.release()
cv2.destroyAllWindows()
