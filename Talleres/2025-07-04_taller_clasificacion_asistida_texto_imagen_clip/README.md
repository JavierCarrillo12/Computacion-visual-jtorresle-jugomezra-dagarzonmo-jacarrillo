# 🧪 Taller -  Text + Imagen: Clasificación Asistida para Diagnóstico o Arte

## 📅 Fecha
`2025-07-04` – Fecha de realización

---
## 🎯 Objetivo del Taller
Explorar cómo la combinación de texto descriptivo y visualización puede mejorar la clasificación de imágenes difíciles de interpretar, usando el modelo CLIP y comparándolo con clasificadores tradicionales entrenados desde cero. Este taller es ideal para aplicaciones en medicina (radiografías), arte (estilos pictóricos), moda (categorías de ropa) o diseño.
---
## 🧠 Conceptos Aprendidos

- [x] Modelo CLIP (arquitectura Vision-transformer).
  
- [x] Preprocesamiento de imagenes.
      
- [x] Calculo de similitud y probabilidades.

- [x] Comparación de clasificadores (CLIP vs Tradicional)

---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- Python (`clip`, `torch`, `matplotlib`,`numpy`)
- Colab/Jupyter

---

## 📁 Estructura del Proyecto

```
2025-06-20_taller_clasificacion_asistida_texto_imagen/
├── images
├── resultados
├── CLIP_classfier.ipynb
├── README.md
```

---

## 🧪 Implementación

### 🎥 Preparación de datos
### 🎥 Aplicación del modelo
### 🎥 Visualización
### 🎥 Guardado de los resultados

### 🧩 Fragmento de código clave

```python
# Función de inferencia con CLIP
def run_clip_inference(image_paths, prompts, model_name="ViT-B-32", pretrained="openai", temperature=0.01):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model, _, preprocess = open_clip.create_model_and_transforms(model_name, pretrained=pretrained)
    model.to(device).eval()

    # Preparar textos
    text_tokens = open_clip.tokenize(prompts).to(device)
    with torch.no_grad():
        text_feats = model.encode_text(text_tokens)

    results = {}
    for img_path in image_paths:
        image = preprocess(open(img_path).convert("RGB")).unsqueeze(0).to(device)
        with torch.no_grad():
            img_feats = model.encode_image(image)
            logits = (img_feats @ text_feats.t()) / temperature
            probs  = logits.softmax(dim=-1).cpu().numpy().flatten()
        results[os.path.basename(img_path)] = dict(zip(prompts, probs))
    return results

```

## 📊 Resultados 
![Modelo_CLIP](https://github.com/user-attachments/assets/d52096ac-5099-44a7-891a-a221d1ef887b)
![Modelo Tradicional](https://github.com/user-attachments/assets/76d62d51-042e-473f-9471-b48c7fb760e6)

---

## 🧩 Prompts Usados

```text
Necesito imagenes de arquitectura barroca y gótica ¿Dónde puedo encontrar estas imagenes?
```

```text
Dame un bosquejo de matplotlib para gráfico de barras para mostrar los resultados de cada clase
```

```text
¿Cómo extraigo vectores de características con ResNet18 sin la capa final?
```
---

## 💬 Reflexión Final
Al comparar ambos métodos (CLIP vs tradicional) sobre 4 imágenes barrocas y 4 góticas destacamos que:

- **CLIP (inferencia zero-shot)**  
  - Clasificó correctamente cada imagen, pero con confianza variable: en algunos casos la probabilidad para la clase correcta rondó 0.75–0.85 y en otros alcanzó ~0.95.  
  - Ventaja: no requiere entrenamiento ni datos etiquetados. Desventaja: márgenes de confianza más estrechos.

- **ResNet18 + SVM (clasificador tradicional)**  
  - También consiguió 100 % de accuracy en este conjunto, y con márgenes de confianza más consistentes (≈ 0.90–0.95 en la clase correcta).  
  - Ventaja: predicciones más seguras y estables tras el entrenamiento. Desventaja: requiere extraer features y entrenar el SVM.

**Modelo más robusto**  
Aunque ambos alcanzaron 100 % de accuracy, el SVM sobre features de ResNet mostró mayor robustez en términos de margen de confianza y consistencia. CLIP destaca por su practicidad “out-of-the-box”, pero su certeza promedio es menor. En escenarios reales, combinar CLIP con un paso de calibración o fine-tuning tipo SVM podría ofrecer lo mejor de ambos enfoques.  


## ✅ Checklist de entrega

- [X] Crear carpeta  `yyyy-mm-dd_taller_clasificacion_asistida_texto_imagen_clip` 
- [X] Código limpio y funcional
- [X] GIF incluido
- [X] Visualizaciones de los resultados
- [X] README completo y claro
