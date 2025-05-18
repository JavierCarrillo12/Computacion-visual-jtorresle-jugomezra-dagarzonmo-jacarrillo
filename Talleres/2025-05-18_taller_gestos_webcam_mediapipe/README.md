# Python 🐍

Este proyecto demuestra cómo usar una cámara web en tiempo real para detectar **manos humanas**, identificar **gestos** como el número de dedos extendidos y medir **distancias** entre dedos. También asocia estos gestos con **acciones visuales**, como cambiar colores o mover objetos.

Está construido usando Python con las bibliotecas:

* [`MediaPipe`](https://developers.google.com/mediapipe): para la detección de manos y análisis de sus puntos clave.
* [`OpenCV`](https://opencv.org/): para el manejo de video en tiempo real, visualización y manipulación de imágenes.
* `NumPy`: para operaciones matemáticas y de geometría (como distancias entre puntos).

---

## 🧠 ¿Qué hace el código?

### 1. **Captura de video en tiempo real**

Se activa la cámara del computador usando `cv2.VideoCapture(0)`, lo que permite acceder a cada fotograma en vivo. Cada frame se procesa y muestra en tiempo real.

### 2. **Detección de manos con MediaPipe**

Se utiliza `mp.solutions.hands.Hands` para detectar la mano en pantalla. MediaPipe devuelve una serie de **landmarks**: 21 puntos clave en la mano (nudillos, puntas, base del pulgar, etc.), que se utilizan para interpretar gestos.

### 3. **Cálculo de características gestuales**

Se procesan los landmarks para:

* **Contar dedos extendidos** (por comparación de posiciones entre nudillos y puntas).
* **Medir la distancia** entre el dedo índice y el pulgar, útil para detectar gestos como “pellizco” (pinch).
* Obtener la **posición del índice** como referencia para mover objetos.

### 4. **Visualizaciones dinámicas**

En un lienzo (`canvas`) basado en NumPy, se dibujan:

* La mano y conexiones usando `mediapipe.drawing_utils`.
* Textos que muestran el número de dedos o distancia entre dedos.
* Un **objeto gráfico** (círculo) que se mueve siguiendo el índice.
* Cambios de escena o color basados en gestos específicos (ejemplo: palma abierta para cambiar escena, puño para cambiar color).

---

## 🔄 Acciones interactivas

* **0 dedos (puño cerrado):** cambia el color de fondo.
* **5 dedos (palma abierta):** cambia la escena.
* **Seguimiento del dedo índice:** se dibuja un objeto en su ubicación.
* **Distancia entre índice y pulgar:** se calcula y visualiza con una línea verde y un valor numérico.

---

## 🧩 Estructura del código

| Sección        | Descripción                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| Imports        | Carga de OpenCV, MediaPipe, NumPy                                           |
| Setup          | Configuración de MediaPipe Hands y cámara                                   |
| Funciones      | `count_extended_fingers()` y `calc_distance()` para análisis de landmarks   |
| Loop principal | Captura de video, procesamiento de manos, renderizado de gestos             |
| Interacciones  | Acciones visuales según el gesto detectado (cambios de color, escena, etc.) |

---

## 🛠️ ¿Cómo ayudan las bibliotecas?

### ✅ MediaPipe

* Detecta manos y 21 puntos clave con gran precisión.
* No requiere entrenamiento ni calibración previa.
* Altamente optimizado para tiempo real.

### ✅ OpenCV

* Captura video y lo muestra en vivo.
* Permite manipular pixeles directamente para dibujar sobre los fotogramas.
* Gestiona la interfaz de visualización.

### ✅ NumPy

* Facilita el manejo de arrays de imagen.
* Se usa para cálculos como la distancia euclidiana entre dos landmarks.



