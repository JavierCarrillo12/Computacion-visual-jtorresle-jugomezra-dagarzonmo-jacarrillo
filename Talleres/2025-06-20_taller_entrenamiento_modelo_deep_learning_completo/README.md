# 🧪 Taller - Entrenamiento de un Modelo de Deep Learning de Inicio a Fin

## 📅 Fecha

`2025-06-20` – Fecha de entrega

---

## 🎯 Objetivo del Taller

Este taller tiene como objetivo guiar a los estudiantes en el proceso completo de entrenamiento de un modelo de Deep Learning, desde la preparación de datos hasta la evaluación, validación cruzada, fine-tuning y exportación del modelo. El enfoque es proporcionar una comprensión profunda del flujo completo del entrenamiento de modelos de aprendizaje profundo para que los estudiantes puedan aplicar estos principios en sus propios proyectos.

---

## 🧠 Conceptos Aprendidos

* [x] Preparación y visualización de datos.
* [x] Entrenamiento y validación de modelos de Deep Learning.
* [x] Técnicas de validación como K-Fold Cross Validation.
* [x] Fine-tuning de modelos preentrenados.
* [x] Evaluación del rendimiento del modelo con métricas como precisión, matriz de confusión y otras métricas de clasificación.
* [x] Exportación y reutilización de modelos entrenados.

---

## 🔧 Herramientas y Entornos

* Python (`torch`, `torchvision`, `numpy`, `matplotlib`, `scikit-learn`, `seaborn`, `pandas`, `tqdm`)
* Entorno local de Python


---

## 📁 Estructura del Proyecto

```
2025-06-20_taller_entrenamiento_modelo_deep_learning_completo/
├── python/
│   └── entrenamiento_modelo.ipynb
├── modelos/
│   └── modelo_final.pth
├── resultados/
│   ├── curva_loss.png
│   ├── confusion_matrix.png
│   ├── comparacion_metrics.csv
├── README.md
```


---

## 🧪 Implementación

### 🔹 Etapas realizadas

1. **Preparación de los datos**: Se cargó y visualizó el dataset MNIST o CIFAR-10.
2. **División de los datos**: Se dividió el conjunto de datos en entrenamiento, validación y prueba utilizando `DataLoader`.
3. **Definición del modelo**: Se definió un modelo de red neuronal simple con varias capas densas.
4. **Entrenamiento**: El modelo fue entrenado con la función de pérdida `CrossEntropyLoss` y optimizado con `Adam`.
5. **Validación y evaluación**: Se realizó validación durante el entrenamiento y se utilizó K-Fold Cross Validation para evaluar el rendimiento del modelo.
6. **Fine-Tuning**: Se aplicó fine-tuning a un modelo preentrenado, `ResNet18`, para mejorar el rendimiento.
7. **Exportación del modelo**: El modelo final fue guardado y se proporcionó una forma de cargarlo en el futuro.

### 🔹 Código relevante

```python
import torch
from torch.utils.data import DataLoader, random_split
from torchvision import datasets, transforms
import torch.nn as nn
import torch.optim as optim

# Preparar el dataset
transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])
train_data = datasets.MNIST(root='data', train=True, download=True, transform=transform)
test_data  = datasets.MNIST(root='data', train=False, download=True, transform=transform)

train_size = int(0.8 * len(train_data))
val_size = len(train_data) - train_size
train_subset, val_subset = random_split(train_data, [train_size, val_size])

train_loader = DataLoader(train_subset, batch_size=64, shuffle=True)
val_loader = DataLoader(val_subset, batch_size=64)
test_loader = DataLoader(test_data, batch_size=64)

# Definir el modelo
model = nn.Sequential(
    nn.Flatten(),
    nn.Linear(28*28, 128),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(128, 64),
    nn.ReLU(),
    nn.Linear(64, 10)
)

# Configurar la función de pérdida y optimizador
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Entrenamiento del modelo
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
for epoch in range(10):
    model.train()
    running_loss = 0
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        optimizer.zero_grad()
        output = model(images)
        loss = criterion(output, labels)
        loss.backward()
        optimizer.step()
        running_loss += loss.item()
    print(f"Epoch {epoch+1}, Loss: {running_loss/len(train_loader)}")
```

---

## 📊 Resultados Visuales

* **Curvas de entrenamiento y validación**: Para observar cómo la pérdida disminuye con el tiempo y comparar el rendimiento en entrenamiento vs validación.
* **Matriz de confusión**: Para evaluar el desempeño del modelo en las clases individuales.
* **Gráfica de comparación**: Sin y con fine-tuning para ver cómo mejora el rendimiento del modelo.

---

## 🧩 Prompts Usados

```text
"Entrenar un modelo de red neuronal con los datos de MNIST para clasificación."
"Aplicar fine-tuning en un modelo preentrenado ResNet18 con un dataset de imágenes."
```

---

## 💬 Reflexión Final

Este taller permitió aprender cómo entrenar un modelo de Deep Learning desde cero, comprender cómo dividir los datos para validación y evaluación, y aplicar técnicas avanzadas como el fine-tuning con modelos preentrenados. La parte más interesante fue comparar los resultados con y sin fine-tuning, lo que mostró una mejora significativa en el rendimiento del modelo. En proyectos futuros, podría aplicar técnicas de regularización y optimización para mejorar aún más los resultados.

---

## ✅ Checklist de Entrega

* [x] Carpeta `2025-06-20_taller_entrenamiento_modelo_deep_learning_completo`
* [x] Código limpio y funcional
* [x] Visualizaciones o métricas exportadas
* [x] README completo y claro
* [x] Commits descriptivos en inglés
