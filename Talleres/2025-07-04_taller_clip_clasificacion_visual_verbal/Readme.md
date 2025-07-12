# 🧪 Taller - Visual y Verbal: Clasificación de Imágenes con CLIP

## 📅 Fecha
`2025-07-04` – Fecha de realización

---
## 🎯 Objetivo del Taller
Explorar el uso del modelo CLIP (Contrastive Language–Image Pre-training) de OpenAI para clasificar imágenes comparando representaciones de texto e imagen. Este taller permite comprender cómo vincular descripciones en lenguaje natural con imágenes, sin necesidad de entrenamiento adicional.

---
## 🧠 Conceptos Aprendidos

- [x] Modelo CLIP (arquitectura Vision-transformer).
  
- [x] Preprocesamiento de imagenes.
      
- [x] Calculo de similitud y probabilidades.

- [x] Carga dinámica de imagenes.

---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- Python (`clip`, `torch`, `matplotlib`,`numpy`)
- Colab/Jupyter

---

## 📁 Estructura del Proyecto

```
2025-06-20_taller_clip_clasificacion_visual_verbal/
├── images
├── resultados
├── Modelo_clasificacion_CLIP.ipynb
├── README.md
```

---

## 🧪 Implementación

### 🎥 Preparación de datos
### 🎥 Aplicación del modelo
### 🎥 Visaualización
### 🎥 Guardado de los resultados

### 🧩 Fragmento de código clave

```python
# Carga y preprocesado dde las imágenes
def load_images(image_dir):
    """
    Carga todas las imágenes .jpg/.png del directorio y devuelve:
      - image_paths: lista de rutas
      - images: tensor concatenado listo para pasar a CLIP
    """
    image_paths = [
        os.path.join(image_dir, fn)
        for fn in os.listdir(image_dir)
        if fn.lower().endswith(('.jpg', '.jpeg', '.png'))
    ]
    if not image_paths:
        raise ValueError(f"No encontré imágenes en: {image_dir}")
    tensors = []
    for path in image_paths:
        img = Image.open(path).convert("RGB")
        tensors.append(preprocess(img).unsqueeze(0).to(device))
    images = torch.cat(tensors, dim=0)
    return image_paths, images

```

```python
def classify_images(image_paths, images, text_descriptions):
    """
    Dado un lote de imágenes y una lista de prompts (descripciones),
    devuelve una matriz de probabilidades (n_imágenes × n_descripciones).
    """
    # Tokenizamos las descripciones
    text_tokens = clip.tokenize(text_descriptions).to(device)

    # Forward pass conjunto: logits por cada imagen vs cada texto
    with torch.no_grad():
        logits_per_image, _ = model(images, text_tokens)
        probs = logits_per_image.softmax(dim=-1).cpu().numpy()

    return probs

```


## 📊 Resultados Visuales
![resultados](https://github.com/user-attachments/assets/5c848a28-9345-42ce-b61c-701049cacf66)

---

## 🧩 Prompts Usados

```text
¿Cómo puedo hacer que el usuario ingrese la ruta de las imagenes en lugar de suponer una ruta establecida?
```

```text
¿Cómo puedo hacer para que el modelo cargue las imagenes locales en lugar de usar Drive?
```

```text
¿Cómo puedo generar un GIF con las imagenes y gráficas de salida?
```
---

## 💬 Reflexión Final

## Me ha sorprendido lo versátil que es CLIP para clasificar objetos muy distintos sin un solo dato de entrenamiento específico. 
## Realicé el test con muchas imagenes de objetos diferentes y me sorprendió la precisión del modelo, sin duda es muy útil.

## ✅ Checklist de entrega

- [X] Crear carpeta  `yyyy-mm-dd_taller_clasificacion_asistida_texto_imagen_clip` 
- [X] Código limpio y funcional
- [X] GIF incluido
- [X] Visualizaciones de los resultados
- [X] README completo y claro
