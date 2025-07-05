# 🧪 Evaluación de Creatividad Artificial: Métricas y Reflexión

## 📅 Fecha
`2025-07-04` – Taller de evaluación de creatividad en IA generativa

---

## 🎯 Objetivo del Taller

Evaluar la **calidad, coherencia y creatividad** de imágenes generadas por IA aplicando métricas cuantitativas (CLIPScore y simetría visual) para reflexionar sobre la naturaleza de la creatividad artificial y el papel del humano en el proceso creativo.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] **CLIPScore** - Alineación semántica entre prompt e imagen
- [x] **Simetría visual** - Análisis de balance composicional
- [x] **Métricas cuantitativas** para evaluación de creatividad
- [x] **Reflexión crítica** sobre IA generativa
- [x] **Procesamiento de imágenes** con scikit-image
- [x] **Análisis estadístico** de resultados

---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- **Python** (`torch`, `clip-by-openai`, `scikit-image`, `matplotlib`, `pandas`)
- **Jupyter Notebook** / Google Colab
- **CLIP (Contrastive Language-Image Pre-training)** de OpenAI

📌 Usa las herramientas según la [guía de instalación oficial](./guia_instalacion_entornos_visual.md)

---

## 📁 Estructura del Proyecto

```
2025-07-04_taller_evaluacion_creatividad_ia_metricas_reflexion/
├── python/                    # Código principal
│   └── 2025_07_04_evaluacion_creatividad_ia.ipynb
├── imagenes_generadas/        # Imágenes generadas por IA
│   ├── prompt1_imagen1.png
│   ├── prompt2_imagen2.png
│   ├── prompt3_imagen3.png
│   └── prompts.txt
├── resultados_metricas/       # Métricas calculadas
│   ├── metricas_clipscore.json
│   └── metricas_simetria.json
├── reflexion/                 # Reflexiones personales
├── requirements.txt           # Dependencias
└── README.md
```

📎 Sigue la estructura de entregas descrita en la [guía GitLab](./guia_gitlab_computacion_visual.md)

---

## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas
1. **Preparación de datos**: Carga de imágenes generadas por IA y sus prompts asociados
2. **Aplicación de CLIPScore**: Cálculo de similitud semántica entre imagen y texto
3. **Análisis de simetría**: Evaluación de balance visual horizontal
4. **Visualización y análisis**: Generación de gráficos y métricas estadísticas

### 🔹 Código relevante

Incluye un fragmento que resuma el corazón del taller:

```python
# CLIPScore - Alineación texto-imagen
model, preprocess = clip.load("ViT-B/32", device=device)
image = preprocess(img).unsqueeze(0).to(device)
text = clip.tokenize([prompt]).to(device)

with torch.no_grad():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)
    similarity = torch.cosine_similarity(image_features, text_features).item()

# Simetría visual
def calculate_symmetry(image_path):
    image = Image.open(image_path).convert("L")
    image_np = np.array(image)
    w = image_np.shape[1]
    left = image_np[:, :w//2]
    right = np.fliplr(image_np[:, w//2:])
    score, _ = ssim(left, right, full=True)
    return score
```

---

## 📊 Resultados Visuales

### 📌 Este taller **requiere explícitamente un GIF animado**:

> ✅ Si tu taller lo indica, debes incluir **al menos un GIF** mostrando la ejecución o interacción.

- Usa `Peek`, `ScreenToGif`, `OBS`, o desde Python (`imageio`) para generar el GIF.
- **El nombre del GIF debe ser descriptivo del punto que estás presentando.**
- Ejemplo correcto:  
  `deteccion_colores_rojo_verde_torres.gif`  
  `movimiento_robot_esquiva_obstaculos_gomez.gif`  
  `shader_gradiente_temporal_lopez.gif`

🧭 [Ver guía para crear GIFs](./guia_generar_gif.md)

```markdown
![evaluacion_creatividad](./resultados/evaluacion_clipscore_simetria_metricas.gif)
```

> ❌ No se aceptará la entrega si falta el GIF en talleres que lo requieren.

---

## 🧩 Prompts Usados

Enumera los prompts utilizados:

```text
"a robot painting a self-portrait"
"a surreal dreamscape with floating cities and neon lights"
"a cyberpunk city at night with rain and neon reflections"
```

📎 Usa buenas prácticas de prompts según la [guía de IA actualizada](./guia_prompts_inteligencias_artificiales_actualizada.md)

---

## 💬 Reflexión Final

Responde en 2-3 párrafos:

**¿Qué aprendiste o reforzaste con este taller?**

Este taller me permitió comprender profundamente cómo las métricas cuantitativas pueden evaluar aspectos de la creatividad artificial. Aprendí que el CLIPScore proporciona una medida objetiva de la alineación semántica entre el prompt y la imagen generada, mientras que la simetría visual ofrece insights sobre la composición y balance estético. La combinación de ambas métricas revela diferentes dimensiones de la "calidad" en imágenes generadas por IA.

**¿Qué parte fue más compleja o interesante?**

La parte más interesante fue descubrir las limitaciones de las métricas cuantitativas para evaluar la creatividad. Aunque el CLIPScore de 0.348 para la imagen cyberpunk fue el más alto, esto no necesariamente significa que sea la "más creativa". La reflexión crítica sobre qué significa realmente la creatividad artificial y cómo las métricas pueden ser engañosas fue fascinante. También fue complejo entender que la simetría alta (0.566) no siempre es deseable en arte creativo.

**¿Qué mejorarías o qué aplicarías en futuros proyectos?**

Me gustaría explorar métricas adicionales como diversidad de colores, complejidad visual o análisis de composición. También aplicaría este enfoque para evaluar otros tipos de contenido generativo como música, texto o video. El framework de evaluación cuantitativa + reflexión crítica es muy valioso para entender mejor las capacidades y limitaciones de la IA generativa en proyectos futuros.

---

## 👥 Contribuciones Grupales (si aplica)

Describe exactamente lo que hiciste tú:

```markdown
- Implementé el cálculo de CLIPScore usando el modelo CLIP de OpenAI
- Desarrollé la función de análisis de simetría visual con scikit-image
- Generé las visualizaciones y análisis estadístico de los resultados
- Documenté el proceso completo y las reflexiones críticas
```

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-07-04_taller_evaluacion_creatividad_ia_metricas_reflexion`
- [x] Código limpio y funcional en Jupyter Notebook
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas (JSON con resultados)
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---

## 📈 Métricas Obtenidas

| Imagen | Prompt | CLIPScore | Simetría | Interpretación |
|--------|--------|-----------|----------|----------------|
| prompt3_imagen3.png | cyberpunk city at night | **0.348** | 0.518 | Mejor alineación semántica |
| prompt2_imagen2.png | surreal dreamscape | 0.325 | **0.566** | Mayor simetría visual |
| prompt1_imagen1.png | robot painting self-portrait | 0.319 | 0.275 | Menor simetría, prompt complejo |

**Análisis**: Las métricas revelan que la imagen cyberpunk tiene la mejor alineación con su prompt, mientras que la imagen surrealista presenta mayor balance composicional. Esto demuestra cómo diferentes aspectos de la creatividad pueden ser medidos y evaluados objetivamente. 