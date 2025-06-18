# 🧪 YOLO + SAM Pipeline – Taller de Detección y Segmentación

## 📅 Fecha

`2025-06-18` – Fecha de entrega

---

## 🎯 Objetivo del Taller

Explorar la **sinergia entre detección de objetos con YOLOv8** y **segmentación con Segment‑Anything (SAM)** dentro de un mismo flujo de trabajo.
El propósito es combinar bounding‑boxes de YOLO como *prompts* para SAM, obtener máscaras de alta calidad y aplicar análisis/efectos sobre las regiones segmentadas.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

* [ ] Transformaciones geométricas (escala, rotación, traslación)
* [x] Segmentación de imágenes
* [ ] Shaders y efectos visuales
* [ ] Entrenamiento de modelos IA
* [ ] Comunicación por gestos o voz
* [ ] Otro: **Detección de objetos con YOLOv8**

---

## 🔧 Herramientas y Entornos

* **Python** (`ultralytics`, `segment-anything`, `opencv-python`, `torch`, `numpy`, `matplotlib`, `pandas`)
* **Jupyter / Google Colab**

---

## 📁 Estructura del Proyecto

```
2025-06-18_yolo_sam_taller/
├── images/             
├── outputs/                
|   ├── resultados.png           
|   ├── segmentaciones/
|   ├── transformaciones/
├── yolo_sam_pipeline.ipynb
├── README.md
```

📎 Sigue la estructura de entregas descrita en la [guía GitLab](./guia_gitlab_computacion_visual.md)

---

## 🧪 Implementación

### 🔹 Etapas realizadas

1. **Preparación de datos**
   Se copió la imagen ‑ejemplo `MONSERRATE.png` en la carpeta `datos/`.
2. **Detección con YOLOv8**
   Se cargó el modelo `yolov8n.pt` y se filtraron las clases “person” y “dog”.
3. **Segmentación con SAM**
   Las cajas de YOLO se pasaron como *box‑prompts* al predictor SAM (`vit_h`).
4. **Visualización & post‑procesado**
   Se graficaron cajas y máscaras; luego se aplicó un *blur* selectivo al fondo.
5. **Análisis de regiones**
   Se calculó área relativa, perímetro y bounding‑box de cada máscara y se exportó a `results/analysis.csv`.
6. **Guardado de resultados**

   * Imagen con detección + segmentación (`deteccion_segmentacion.png`)
   * Imagen con efecto creativo (`foco_sujeto_blur.png`)

### 🔹 Código relevante

```python
from ultralytics import YOLO
from segment_anything import SamPredictor, sam_model_registry

# Cargar modelos
yolo = YOLO("yolov8n.pt")
sam  = sam_model_registry["vit_h"](checkpoint=CHECKPOINT_PATH)
predictor = SamPredictor(sam)

# Detección
results = yolo(image_path)
boxes   = [b.xyxy[0].tolist() for b in results[0].boxes if b.cls in wanted_ids]

# Segmentación con SAM usando las cajas de YOLO como prompts
predictor.set_image(image_rgb)
masks, _, _ = predictor.predict(box=np.array(boxes), multimask_output=False)
```

---

## 📊 Resultados Visuales

### 📌 Este taller **requiere explícitamente un GIF animado**

![Captura de pantalla 2025-06-18 164139](https://github.com/user-attachments/assets/dc0e72d4-8f37-4c5a-a707-3ed329a7e0c0)

![Captura de pantalla 2025-06-18 164300](https://github.com/user-attachments/assets/a6b40da2-5e74-4c5d-a77d-8004e004bed4)

![resultados](https://github.com/user-attachments/assets/e40e18a0-6ee5-4c2d-9377-b215bab61e89)

---

## 🧩 Prompts Usados

```text
# SAM
Box‑prompt → [[x1, y1, x2, y2]] obtenido de YOLO
```

---

## 💬 Reflexión Final

La integración YOLO + SAM demostró ser una **técnica poderosa** para acelerar la segmentación precisa sin necesidad de *fine‑tuning* de un modelo complejo.
Las principales dificultades fueron:

* **Gestión de dependencias** – la instalación de `segment-anything` y la descarga de pesos `vit_h` (2.5 GB) demanda GPU y buena conectividad.
* **Alineación de coordenadas** – YOLO devuelve cajas en formato tensor y SAM espera `np.array` con coordenadas absolutas; fue necesario normalizar y castrear tipos.

Aun así, el potencial de esta combinación es amplio: permite desde *green‑screen* dinámico hasta análisis estadístico de subconjuntos de la escena, habilitando casos de uso en **retail analytics, efectos cinematográficos** o **robótica cognitiva**.

---

## ✅ Checklist de Entrega

* [x] Carpeta `2025-06-18_yolo_sam_taller`
* [x] Código limpio y funcional
* [x] GIF incluido con nombre descriptivo
* [x] Visualizaciones exportadas (`.png`, `.csv`)
* [x] README completo y claro
* [x] Commits descriptivos en inglés
