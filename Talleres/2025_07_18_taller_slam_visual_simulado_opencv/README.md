# 🧪 SLAM Visual Simulado con OpenCV

## 📅 Fecha

`2025-07-18` – Fecha de entrega

---

## 🎯 Objetivo del Taller

Implementar un **pipeline de SLAM (Simultaneous Localization and Mapping) visual** en un entorno simulado, empleando **características ORB** y coincidencia BFMatcher en OpenCV para:

1. Rastrear keypoints entre fotogramas secuenciales.
2. Construir un mapa 2D aproximado de los puntos observados.
3. Reflexionar sobre los retos de escalar este enfoque a un SLAM completo en 3D.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

* [ ] Transformaciones geométricas (escala, rotación, traslación)
* [ ] Segmentación de imágenes
* [ ] Shaders y efectos visuales
* [ ] Entrenamiento de modelos IA
* [ ] Comunicación por gestos o voz
* [ ] Otro: **Visual SLAM basado en características**

---

## 🔧 Herramientas y Entornos

* **Python** (`opencv-python`, `numpy`, `matplotlib`)
* **Google Colab**


---

## 📁 Estructura del Proyecto

```
2025-07-18_taller_slam_visual_simulado_opencv/
├── datos/                 
├── python/
│       ├──2025_07_18_taller_slam_visual_simulado_opencv.ipynb
├── README.md
```

📎 Sigue la estructura de entregas descrita en la [guía GitLab](./guia_gitlab_computacion_visual.md)

---

## 🧪 Implementación

### 🔹 Etapas realizadas

1. **Carga de fotogramas simulados** desde la carpeta `datos/`.
2. **Detección de características ORB** en cada fotograma.
3. **Coincidencia de descriptores** usando `BFMatcher` con métrica Hamming.
4. **Filtrado de matches** por ratio-test de Lowe y eliminación de outliers.
5. **Estimación de movimiento entre fotogramas** (matriz esencial/homografía) – *opcional*.
6. **Acumulación de keypoints** para visualizar el “mapa” 2D resultante.
7. **Graficación de trayectoria y nubes de puntos** en `matplotlib`.
8. **Exportación** de métricas y capturas a `resultados/`.

### 🔹 Código relevante

```python
import cv2, numpy as np, matplotlib.pyplot as plt

orb = cv2.ORB_create(nfeatures=2000)
bf  = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)

prev = None
all_pts = []

for fname in sorted(image_list):
    frame = cv2.imread(fname, cv2.IMREAD_GRAYSCALE)
    kp, des = orb.detectAndCompute(frame, None)

    if prev is not None:
        matches = bf.match(prev['des'], des)
        matches = sorted(matches, key=lambda m: m.distance)
        # Guarda pares de puntos coincidentes
        pts1 = np.float32([prev['kp'][m.queryIdx].pt for m in matches])
        pts2 = np.float32([kp[m.trainIdx].pt   for m in matches])
        all_pts.extend(pts2)  # acumula para el “mapa”

    prev = {'kp': kp, 'des': des}
```

---

## 📊 Resultados Visuales


---

## 🧩 Prompts Usados

- "¿Cómo puedo integrar varias imágenes y su seguimiento de puntos al taller solicitado?"

---

## 💬 Reflexión Final

Implementar un mini‑SLAM con **OpenCV** permitió comprender de forma práctica:

* La importancia de elegir descriptores robustos a cambios de iluminación y escala.
* Cómo errores de coincidencia se propagan y originan *drift* en la trayectoria.


---

## ✅ Checklist de Entrega

* [x] Carpeta `2025-07-18_taller_slam_visual_simulado_opencv`
* [x] Código limpio y funcional
* [x] GIF incluido con nombre descriptivo (requerido)
* [x] Visualizaciones exportadas (`.png`, `.gif`)
* [x] README completo y claro
* [x] Commits descriptivos en inglés
