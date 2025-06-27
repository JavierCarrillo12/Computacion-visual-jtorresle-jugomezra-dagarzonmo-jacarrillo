# 🧪 Taller - Control Visual: Manipulación Dirigida con ControlNet

## 🎯 Objetivo  

Guiar la generación de imágenes mediante entradas condicionales como bordes (Canny), poses humanas o mapas de profundidad usando ControlNet junto con Stable Diffusion. El objetivo es experimentar con control explícito sobre la estructura de las imágenes generadas y comparar la salida con y sin condiciones visuales.

---

## 📋 Contenidos  
1. [¿Qué es ControlNet y para qué sirve?](#qué-es-controlnet-y-para-qué-sirve)  
2. [Preparación del entorno](#preparación-del-entorno)  
3. [Cargar y procesar una imagen base](#cargar-y-procesar-una-imagen-base)  
   - Bordes con Canny  
   - Mapa de profundidad  
   - Pose humana (OpenPose o MediaPipe)  
4. [Cargar el modelo ControlNet correspondiente](#cargar-el-modelo-controlnet-correspondiente)  
5. [Generar imagen condicionada](#generar-imagen-condicionada)  
6. [Limpieza de memoria y cambios de modelo](#limpieza-de-memoria-y-cambios-de-modelo)  
7. [Generación normal sin condicionamiento](#generación-normal-sin-condicionamiento)  
8. [Reflexión y análisis](#reflexión-y-análisis)  
9. [Descripción del modelo usado](#descripción-del-modelo-usado)  
10. [Lista de prompts utilizados](#lista-de-prompts-utilizados)

---

## 🤖 ¿Qué es ControlNet y para qué sirve?

ControlNet es una extensión de Stable Diffusion que permite **guiar la generación de imágenes** mediante una **imagen de condición** como:
- Bordes detectados (Canny)
- Mapas de profundidad
- Pose humana
- Segmentación semántica
- Bocetos

Esto permite controlar la forma, estructura y disposición de los objetos generados, manteniendo libertad artística sobre estilo, color, iluminación, etc.

---

## ⚙️ Preparación del entorno

### Google Colab
```bash
!pip install diffusers transformers accelerate controlnet-aux
````
---

## 🖼️ Cargar y procesar una imagen base

### 1. Bordes con Canny

```python
from controlnet_aux import CannyDetector
from PIL import Image

image = Image.open("input.jpg").convert("RGB")
detector = CannyDetector()
canny_image = detector(image)
```

### 2. Mapa de profundidad (DPT / MiDaS)

```python
from controlnet_aux import MidasDetector
depth_detector = MidasDetector()
depth_image = depth_detector(image)
```

### 3. Pose humana (OpenPose o MediaPipe)

```python
from controlnet_aux import OpenposeDetector
pose_detector = OpenposeDetector()
pose_image = pose_detector(image)
```

---

## 🧠 Cargar el modelo ControlNet correspondiente

```python
from diffusers import ControlNetModel

controlnet = ControlNetModel.from_pretrained(
    "lllyasviel/sd-controlnet-canny",   # o depth, openpose, etc.
    torch_dtype=torch.float16
).to("cuda")
```

---

## 🧪 Generar imagen condicionada

```python
from diffusers import StableDiffusionControlNetPipeline

pipe = StableDiffusionControlNetPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    controlnet=controlnet,
    torch_dtype=torch.float16
).to("cuda")

out = pipe(
    prompt="A futuristic robot walking through a neon city",
    controlnet_conditioning_image=canny_image,
    num_inference_steps=30,
    guidance_scale=7.5
)
out.images[0].save("output_controlnet.png")
```

---

## ♻️ Limpieza de memoria y cambios de modelo

```python
del pipe
del controlnet

import torch, gc
gc.collect()
torch.cuda.empty_cache()
```

---

## 🖌️ Generación normal sin condicionamiento

```python
from diffusers import StableDiffusionPipeline

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")

out = pipe(prompt="A forest temple at sunrise").images[0]
out.save("output_normal.png")
```

---

## 🤔 Reflexión

* **¿Cómo influye cada condición?**

  * **Canny**: preserva contornos precisos; ideal para objetos definidos.
  * **Depth**: mantiene la composición general; ideal para paisajes.
  * **Pose**: excelente para figuras humanas; el resultado mantiene la postura.

* **¿Qué fue más difícil?**
  Manejar la VRAM al cambiar de modelo ControlNet y ajustar bien el `strength` para balancear creatividad y control.

---

## 🗂️ Descripción del modelo usado

* **Modelo base**: `runwayml/stable-diffusion-v1-5`
* **Extensiones ControlNet usadas**:

  * `lllyasviel/sd-controlnet-canny`
  * `lllyasviel/sd-controlnet-depth`
  * `lllyasviel/sd-controlnet-openpose`
* **Tamaño base de generación**: 512×512 px
* **Librerías clave**: `diffusers`, `controlnet-aux`, `torch`, `PIL`, `opencv-python`

---

## Resultado visual

![standing_15](https://github.com/user-attachments/assets/0544ae13-e712-459b-b012-1fff309f1413)
![output_pose](https://github.com/user-attachments/assets/d210c2db-2c8b-41f3-b459-f83a986a6e1d)
![output_normal_New_York](https://github.com/user-attachments/assets/c7459380-78c2-49af-8688-10392c861573)
![IMG-20250313-WA0056](https://github.com/user-attachments/assets/00f3723f-5ce6-4878-a18c-4d8523c8318c)
![output_normal_bailarin](https://github.com/user-attachments/assets/0085aa77-f2f1-4ff2-b088-d31ef7f2dd9e)
![output_normal_cyberpunk](https://github.com/user-attachments/assets/74069c0e-8f74-4732-8043-61a8d926c226)
![resultado_controlnet](https://github.com/user-attachments/assets/55d252eb-37c0-4399-9f2c-ed40e4307815)

---

## ✅ Descripción general de los prompts usados

- `"A futuristic cyberpunk skyline at night, glowing lights, reflective water"`  
- `"A ballet dancer spinning, oil painting, colorful"`  
- `"A stylish person posing in Times Square, photorealistic"`  

### Para la generación del código

- `"Cómo invoco el modelo de progundidad, pose, etc"`  
- `"Ayúdame a redimensionar esta imagen"`  

---

## 💬 Reflexión

- **¿Cuál condición controló mejor la estructura?**  
  El **mapa de pose (OpenPose)** ofreció el mayor control sobre la figura humana, manteniendo la posición corporal casi idéntica a la pose de entrada.  
  En cambio, **el mapa de bordes (Canny)** ayudó a preservar la silueta arquitectónica general de la ciudad, pero con más libertad estilística.

- **¿Hubo algún resultado inesperado?**  
  Sí. En algunos casos, la **condición era tan fuerte** que el modelo limitaba la creatividad (especialmente en poses complejas o mapas de profundidad con errores).  
  También hubo **artefactos leves** cuando la imagen de control no coincidía bien con el prompt (ej. poses poco naturales o bordes rotos).

---


