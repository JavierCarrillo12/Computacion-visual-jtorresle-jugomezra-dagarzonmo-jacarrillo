"""
main.py

Proyecto: Interfaz BCI Simulada
- Detección de gestos con MediaPipe y OpenCV
- Reconocimiento de voz con SpeechRecognition y PyAudio
- Visualización reactiva con pygame
- Lógica condicional para combinar entrada de voz + gesto de mano
- Retroalimentación auditiva con pyttsx3

Dependencias:
  pip install mediapipe opencv-python speechrecognition pyaudio pygame pyttsx3 numpy
"""

import threading
import queue
import time
import math

import cv2
import numpy as np
import mediapipe as mp
import speech_recognition as sr
import pyttsx3
import pygame
from pygame.locals import *

# ----------------------------------------
# CONSTANTES Y CONFIGURACIÓN INICIAL
# ----------------------------------------

# Comandos de voz que vamos a reconocer
VALID_COMMANDS = {"cambiar", "mover", "mostrar", "detener"}

# Parámetros de la ventana pygame
WIN_WIDTH, WIN_HEIGHT = 800, 600
FPS = 30

# Colores (RGB)
COLOR_FONDO = (0, 0, 0)
COLOR_DOS_DEDOS = (50, 200, 50)

# Lista de colores para selección aleatoria
COLORES_PALMA = [
    (50, 50, 200),   # Azul original
    (200, 50, 50),   # Rojo
    (50, 200, 50),   # Verde
    (200, 200, 50),  # Amarillo
    (200, 50, 200),  # Magenta
    (50, 200, 200),  # Cyan
]

# ----------------------------------------
# CLASE: Cube
#   Maneja la lógica y dibujo del cubo 3D
# ----------------------------------------

class Cube:
    def __init__(self):
        # Definir los vértices del cubo (x, y, z)
        self.vertices = np.array([
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ])
        
        # Definir las aristas del cubo (conexiones entre vértices)
        self.edges = [
            (0, 1), (1, 2), (2, 3), (3, 0),  # Cara inferior
            (4, 5), (5, 6), (6, 7), (7, 4),  # Cara superior
            (0, 4), (1, 5), (2, 6), (3, 7)   # Aristas verticales
        ]
        
        self.angle = 0
        self.scale = 100
        self.center = (WIN_WIDTH // 2, WIN_HEIGHT // 2)
        
    def rotate(self):
        """Actualiza el ángulo de rotación"""
        self.angle += 0.02
        
    def get_projected_points(self):
        """Proyecta los puntos 3D a 2D usando una proyección simple"""
        # Matriz de rotación en Y
        cos_y = math.cos(self.angle)
        sin_y = math.sin(self.angle)
        
        # Matriz de rotación en X
        cos_x = math.cos(self.angle * 0.5)
        sin_x = math.sin(self.angle * 0.5)
        
        projected_points = []
        for vertex in self.vertices:
            # Rotar en Y
            x = vertex[0] * cos_y - vertex[2] * sin_y
            y = vertex[1]
            z = vertex[0] * sin_y + vertex[2] * cos_y
            
            # Rotar en X
            y = y * cos_x - z * sin_x
            z = y * sin_x + z * cos_x
            
            # Proyección simple
            if z != 0:
                scale = self.scale / (z + 3)
            else:
                scale = self.scale
                
            x = x * scale + self.center[0]
            y = y * scale + self.center[1]
            
            projected_points.append((int(x), int(y)))
            
        return projected_points
        
    def draw(self, screen):
        """Dibuja el cubo en la pantalla"""
        points = self.get_projected_points()
        
        # Dibujar las aristas
        for edge in self.edges:
            pygame.draw.line(screen, (255, 255, 255),
                           points[edge[0]], points[edge[1]], 2)

# ----------------------------------------
# MODULO: voice_listener.py
#   Escucha en bucle la voz y pone comandos 
#   válidos en una cola
# ----------------------------------------

def voice_listener(cmd_queue: queue.Queue):
    """
    Hilo de voz: captura audio del micrófono, reconoce
    comandos simples en español y los envía a la cola cmd_queue.
    """
    recognizer = sr.Recognizer()
    mic = sr.Microphone()

    # Ajustar nivel de ruido ambiente
    with mic as source:
        recognizer.adjust_for_ambient_noise(source, duration=1)
    print("[Voz] Ajuste de ruido completado. Empieza a escuchar comandos...")

    while True:
        with mic as source:
            audio = recognizer.listen(source)

        try:
            # Usa Google Speech Recognition en español
            text = recognizer.recognize_google(audio, language="es-ES").lower()
            print(f"[Voz] Reconocido: {text}")
        except sr.UnknownValueError:
            # No se entendió
            continue
        except sr.RequestError as e:
            print(f"[Voz] Error del servicio de reconocimiento: {e}")
            continue

        # Filtrar solo comandos válidos
        for palabra in text.split():
            if palabra in VALID_COMMANDS:
                cmd_queue.put(palabra)
                print(f"[Voz] Comando válido en cola: {palabra}")
                break  # Tomamos solo la primera palabra válida

# ----------------------------------------
# MODULO: gesture_detector.py
#   Detecta gestos de mano usando MediaPipe
#   y devuelve:
#     - "palma_abierta" si la mano está abierta
#     - "dos_dedos" si solo índice y medio levantados
#     - "palma_cerrada" si la mano está cerrada
#     - "ninguno" en otros casos
# ----------------------------------------

class HandGesture:
    def __init__(self):
        # Inicializa MediaPipe Hands
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=1,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.mp_draw = mp.solutions.drawing_utils

    def detect(self, frame_bgr):
        """
        Recibe frame en BGR, procesa con MediaPipe y decide:
          - "palma_abierta" si hay 4 o más dedos arriba
          - "dos_dedos" si hay exactamente 2 dedos arriba
          - "palma_cerrada" si hay 0 o 1 dedo arriba
          - "ninguno" en otros casos
        """
        frame_rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
        results = self.hands.process(frame_rgb)
        if not results.multi_hand_landmarks:
            return "ninguno"

        hand_landmarks = results.multi_hand_landmarks[0]
        # Landmarks de las puntas de dedos de MediaPipe
        tips_ids = [4, 8, 12, 16, 20]
        dedos_arriba = []

        h, w, _ = frame_bgr.shape

        # Convertir coordenadas normalizadas a píxeles
        coords = []
        for lm in hand_landmarks.landmark:
            coords.append((int(lm.x * w), int(lm.y * h)))

        # Para cada dedo, comparamos la punta con el PIP (nudo central):
        #  - si la punta y supera verticalmente al punto anterior → dedo levantado
        dedos_arriba = []
        for tip_id in tips_ids:
            # landmark de la punta y punto PIP (tip_id - 2)
            x_tip, y_tip = coords[tip_id]
            x_pip, y_pip = coords[tip_id - 2]
            if y_tip < y_pip:
                dedos_arriba.append(1)
            else:
                dedos_arriba.append(0)

        # Contar cuántos dedos arriba
        conteo = sum(dedos_arriba)

        # "palma_abierta" = si >= 4 dedos arriba
        if conteo >= 4:
            return "palma_abierta"
        # "dos_dedos" = si exactamente 2 dedos arriba
        elif conteo == 2:
            return "dos_dedos"
        # "palma_cerrada" = si 0 o 1 dedo arriba
        elif conteo <= 1:
            return "palma_cerrada"

        return "ninguno"

# ----------------------------------------
# MODULO: feedback.py
#   Funciones para retroalimentación visual y auditiva
# ----------------------------------------

class Feedback:
    def __init__(self):
        # Inicializa TTS (pyttsx3)
        self.engine = pyttsx3.init()
        self.engine.setProperty("rate", 150)

    def speak(self, text):
        """Habla el texto sin bloquear."""
        threading.Thread(target=lambda: self._say(text), daemon=True).start()

    def _say(self, text):
        self.engine.say(text)
        self.engine.runAndWait()

# ----------------------------------------
# MODULO: visual_interface.py
#   Crea la escena en pygame que reacciona a estado
# ----------------------------------------

class VisualInterface:
    def __init__(self, cmd_queue: queue.Queue, gesture_queue: queue.Queue):
        pygame.init()
        self.screen = pygame.display.set_mode((WIN_WIDTH, WIN_HEIGHT))
        pygame.display.set_caption("BCI Simulado - Control Visual")
        self.clock = pygame.time.Clock()

        self.cmd_queue = cmd_queue
        self.gesture_queue = gesture_queue

        # Estado actual
        self.current_gesture = "ninguno"
        self.current_cmd = None
        self.color = COLOR_FONDO
        self.estado_texto = "Esperando..."
        self.cube = Cube()
        self.showing_cube = False

        # Feedback auditivo
        self.feedback = Feedback()

    def update_state(self):
        """
        Lee de las colas de voz y gesto para actualizar
        current_gesture y current_cmd.
        """
        # Leer comandos de voz (si hay)
        try:
            cmd = self.cmd_queue.get_nowait()
            self.current_cmd = cmd
            print(f"[Visual] Comando de voz recibido: {cmd}")
            self.cmd_queue.task_done()
        except queue.Empty:
            pass

        # Leer gesto (si hay)
        try:
            gesto = self.gesture_queue.get_nowait()
            self.current_gesture = gesto
            self.gesture_queue.task_done()
        except queue.Empty:
            pass

        # Lógica condicional:
        # Si la mano está abierta y dicen "cambiar" → cambia color aleatoriamente
        if self.current_gesture == "palma_abierta" and self.current_cmd == "cambiar":
            color_index = np.random.randint(0, len(COLORES_PALMA))
            self.color = COLORES_PALMA[color_index]
            self.estado_texto = "Color cambiado"
            self.feedback.speak("Color cambiado")
            self.current_cmd = None
            self.showing_cube = False

        # Si dos dedos arriba y dicen "mover" → muestra y gira el cubo
        elif self.current_gesture == "dos_dedos" and self.current_cmd == "mover":
            self.showing_cube = True
            self.estado_texto = "Girando cubo"
            self.feedback.speak("Girando cubo")
            self.current_cmd = None

        # Si dicen "detener" y la palma está cerrada, resetear todo
        elif self.current_cmd == "detener" and self.current_gesture == "palma_cerrada":
            self.color = COLOR_FONDO
            self.estado_texto = "Detenido"
            self.feedback.speak("Detenido")
            self.current_cmd = None
            self.current_gesture = "ninguno"
            self.showing_cube = False

        # Actualizar rotación del cubo si está visible
        if self.showing_cube:
            self.cube.rotate()

    def render(self):
        """Dibuja en pantalla el fondo y texto con el estado."""
        self.screen.fill(self.color)
        
        # Dibujar el cubo si está activo
        if self.showing_cube:
            self.cube.draw(self.screen)
            
        font = pygame.font.SysFont("Arial", 36)
        text_surface = font.render(self.estado_texto, True, (255, 255, 255))
        self.screen.blit(text_surface, (50, 50))
        pygame.display.flip()

    def run(self):
        """
        Bucle principal: maneja eventos y llama a update_state + render
        """
        running = True
        while running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False

            self.update_state()
            self.render()
            self.clock.tick(FPS)

        pygame.quit()

# ----------------------------------------
# MODULO: main.py
#   Orquesta todo: lanza hilos de voz, gesto y luego la UI
# ----------------------------------------

def main():
    # Colas para comunicar hilos
    cmd_queue = queue.Queue()
    gesture_queue = queue.Queue()

    # 1) Arrancar hilo de voz
    voice_thread = threading.Thread(target=voice_listener, args=(cmd_queue,), daemon=True)
    voice_thread.start()

    # 2) Arrancar hilo de detección de gestos
    def gesto_loop():
        cap = cv2.VideoCapture(0)
        detector = HandGesture()
        while True:
            ret, frame = cap.read()
            if not ret:
                continue
            frame = cv2.flip(frame, 1)  # espejar para más naturalidad
            gesto = detector.detect(frame)
            # Enviar gesto a la cola (solo si cambió)
            gesture_queue.put(gesto)
            # Mostrar video en pequeña ventana (opcional)
            cv2.putText(frame, gesto, (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                        1, (0, 255, 0), 2)
            cv2.imshow("Webcam - Gestos", frame)
            if cv2.waitKey(1) & 0xFF == 27:  # presionar ESC para salir
                break
        cap.release()
        cv2.destroyAllWindows()

    gesture_thread = threading.Thread(target=gesto_loop, daemon=True)
    gesture_thread.start()

    # 3) Arrancar interfaz visual en el hilo principal
    ui = VisualInterface(cmd_queue, gesture_queue)
    ui.run()

if __name__ == "__main__":
    main()
