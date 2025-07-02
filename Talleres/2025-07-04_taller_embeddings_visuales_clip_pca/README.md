# 🧪 Taller – Embeddings Visuales: Proyectando Significados con CLIP y PCA

## 📅 Fecha
`2025-06-27` – Fecha de realización

---

## 🎯 Objetivo del Taller
Visualizar y analizar relaciones semánticas entre imágenes usando embeddings generados por CLIP y técnicas de reducción de dimensionalidad (PCA, t-SNE). El objetivo es explorar cómo las representaciones latentes agrupan imágenes con características similares sin usar etiquetas explícitas (aprendizaje no supervisado).

---

## 🧠 Conceptos Aprendidos

- [x] **CLIP Encodings**: convertir imágenes a vectores de alto nivel  
- [x] **Reducción de Dimensionalidad**: PCA y t-SNE para proyección 2D  
- [x] **Clustering No Supervisado**: KMeans y métrica ARI  
- [x] **Visualización de Datos**: scatter plots, anotaciones  
- [ ] Otro: _______________________

---

## 🔧 Herramientas y Entornos

- **Python**  
  - `torch`, `clip`, `torchvision`, `numpy`, `scikit-learn`, `matplotlib`  
- **Jupyter Notebook / Google Colab**  
- **Dataset**: CIFAR-10 (descarga automática)

---

## 📁 Estructura del Proyecto

```

2025-06-27\_Embeddings\_Visuales/
├── entorno/
│   └── requirements.txt   # dependencias Python
├── datos/
│   └── cifar10/           # descarga de CIFAR-10
├── resultados/
│   ├── pca\_plot.png
│   └── clustering\_plot.png
├── README.md
└── notebook.ipynb         # implementación paso a paso

````

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. **Carga del modelo CLIP** y preprocesamiento de imágenes.  
2. **Descarga y filtrado** de un subconjunto variado de CIFAR-10 (gatos, perros, automóviles, camiones, caballos).  
3. **Extracción de embeddings** de imagen con `model.encode_image`.  
4. **Reducción a 2D** con PCA (alternativa: t-SNE).  
5. **Clustering** con KMeans y evaluación con ARI.  
6. **Visualización** conjunta de embeddings de imagen y de texto (prompts de clase) en 2D.

### 🔹 Código relevante

```python
import torch, clip, numpy as np
from torchvision.datasets import CIFAR10
from torch.utils.data import Subset
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# 1. Cargar CLIP
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# 2. Subconjunto CIFAR-10
wanted = [3,5,1,9,7]  # cat, dog, automobile, truck, horse
dataset = CIFAR10("data/", train=True, download=True)
labels = np.array(dataset.targets)
idxs = []
for cls in wanted:
    cls_idxs = np.where(labels==cls)[0]
    idxs += list(np.random.choice(cls_idxs, 10, False))
subset = Subset(dataset, idxs)

# 3. Extraer embeddings
imgs = [subset[i][0] for i in range(len(idxs))]
batch = torch.cat([preprocess(img).unsqueeze(0) for img in imgs]).to(device)
with torch.no_grad():
    feats = model.encode_image(batch).cpu().numpy()

# 4. PCA
X2 = PCA(n_components=2).fit_transform(feats)

# 5. Plot
plt.figure(figsize=(8,6))
c = [wanted.index(dataset.targets[i]) for i in idxs]
scatter = plt.scatter(X2[:,0], X2[:,1], c=c, cmap="tab10")
plt.legend(handles=scatter.legend_elements()[0], labels=[dataset.classes[w] for w in wanted])
plt.title("Proyección PCA de embeddings CLIP (CIFAR-10 subset)")
plt.xlabel("PC1"); plt.ylabel("PC2"); plt.grid(True)
plt.savefig("resultados/pca_plot.png")
````

---

## 📊 Resultados Visuales

![Captura de pantalla 2025-06-27 155129](https://github.com/user-attachments/assets/12465201-1a98-4a4a-947f-d3802b54ac78)


---

## 🧩 Prompts Usados

No se emplearon prompts textuales en este taller; trabajamos directamente con embeddings de imagen.

---

## 💬 Reflexión Final

Al observar la proyección PCA, notamos una **separación nítida entre vehículos y animales**:

* Los **automóviles** y **camiones** forman dos clusters distintos a la izquierda, señal de que CLIP discrimina bien entre tipos de objetos inanimados.
* A la derecha aparecen los **animales** (gatos, perros, caballos), a su vez subdivididos: los caballos tienden a una zona superior, mientras gatos y perros ocupan regiones vecinas pero ligeramente diferenciadas en PC2.
  No surgieron puntos atípicos, lo que indica que los embeddings de CLIP agrupan de forma estable las categorías seleccionadas.

La parte más interesante fue ver cómo CLIP mantiene la **jerarquía semántica** (animales vs. vehículos, luego especie dentro de animales) sin uso de etiquetas. Para futuros proyectos, exploraría t-SNE para captar relaciones no lineales y probaría embeddings de otros modelos (e.g., ViT-L/14) para comparar su capacidad de agrupamiento.

---

## ✅ Checklist de Entrega

* [x] Carpeta `2025-06-27_Embeddings_Visuales`
* [x] Código limpio y funcional (`notebook.ipynb`)
* [x] Gráficos exportados en `resultados/`
* [x] README completo y claro
* [x] Commits descriptivos en inglés

---

```
```
