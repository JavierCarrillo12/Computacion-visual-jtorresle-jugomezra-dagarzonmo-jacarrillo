# 🧪 Taller - Redes Convolucionales desde Cero: Reconocimiento de Imágenes con Keras o PyTorch

## 📅 Fecha
`2025-06-20`

---

## 🎯 Objetivo del Taller
Construir, entrenar y evaluar un modelo de red neuronal convolucional (CNN) desde cero para clasificación de imágenes usando un dataset genérico (MNIST, FashionMNIST o CIFAR-10). El objetivo es comprender los componentes fundamentales de una CNN y su aplicación práctica en tareas de visión por computador.

---

## 🧠 Conceptos Aprendidos
- [x] Convolución y filtros (kernels)  
- [x] Funciones de activación (ReLU, Softmax)  
- [x] Pooling (MaxPooling, AveragePooling)  
- [x] Flatten para vectorizar características  
- [x] Capas densas (Dense / Linear)  
- [x] Dropout y técnicas de regularización  
- [x] Backpropagation y optimización (SGD, Adam)  

---

## 🔧 Herramientas y Entornos
- **Frameworks**: PyTorch  
- **Lenguaje**: Python 3.x  
- **Entorno**: Google Colab  
- **Bibliotecas**:  
  - `torch`, `torchvision` 
  - `matplotlib`, `numpy`, `scikit-learn`  

---

## 📁 Estructura del Proyecto
```

2025-06-09\_taller\_cnn\_basico/
├── notebooks/
│   └── cnn_entrenamiento.ipynb
├── models/
│   └── cnn_model.pth
├── results/
│   ├── loss_accuracy.png
│   ├── confusion_matrix.png
├── README.md

````

---

## 🧪 Implementación

### 🔹 1. Carga y visualización de datos
```python
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

train_ds = datasets.MNIST('data', train=True, download=True, transform=transform)
test_ds  = datasets.MNIST('data', train=False, download=True, transform=transform)

train_loader = DataLoader(train_ds, batch_size=64, shuffle=True)
test_loader  = DataLoader(test_ds, batch_size=64)
````

### 🔹 2. Definición de la CNN básica

```python
import torch.nn as nn
import torch.nn.functional as F

class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 16, 3, padding=1)
        self.pool  = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(16, 32, 3, padding=1)
        self.fc1   = nn.Linear(32*7*7, 128)
        self.drop  = nn.Dropout(0.25)
        self.fc2   = nn.Linear(128, 10)
    def forward(self, x):
        x = F.relu(self.conv1(x))
        x = self.pool(x)
        x = F.relu(self.conv2(x))
        x = self.pool(x)
        x = x.view(-1, 32*7*7)
        x = F.relu(self.fc1(x))
        x = self.drop(x)
        return self.fc2(x)
```

### 🔹 3. Entrenamiento

```python
import torch.optim as optim

model = SimpleCNN().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=1e-3)

for epoch in range(10):
    model.train()
    running_loss = 0
    for imgs, lbls in train_loader:
        imgs, lbls = imgs.to(device), lbls.to(device)
        optimizer.zero_grad()
        loss = criterion(model(imgs), lbls)
        loss.backward()
        optimizer.step()
        running_loss += loss.item()
    print(f"Epoch {epoch+1}, Loss: {running_loss/len(train_loader):.4f}")
```

### 🔹 4. Evaluación y visualización

```python
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

model.eval()
preds, trues = [], []
with torch.no_grad():
    for imgs, lbls in test_loader:
        imgs = imgs.to(device)
        out = model(imgs).argmax(1).cpu().tolist()
        preds.extend(out); trues.extend(lbls.tolist())

print(classification_report(trues, preds, zero_division=0))

cm = confusion_matrix(trues, preds)
sns.heatmap(cm, annot=True, fmt='d')
plt.show()
```

---

## 📚 Breve explicación de cada componente de la red CNN

* **Convolución:** aplica filtros (kernels) para extraer características locales como bordes y texturas.
* **Kernel:** matriz de pesos (p. ej. 3×3) que se desliza sobre la imagen.
* **ReLU:** introduce no linealidad activando solo valores positivos.
* **MaxPooling:** reduce dimensiones reteniendo el valor máximo en regiones locales, reduciendo cómputo y sobreajuste.
* **Flatten:** convierte la salida 2D de las capas convolucionales en un vector 1D para las capas densas.
* **Capa densa (Dense/Linear):** combina las características extraídas para la decisión de clasificación.
* **Dropout:** apaga aleatoriamente neuronas durante el entrenamiento para mejorar la generalización.

---

## 💬 Reflexión Final

**¿Qué aprendiste sobre los filtros y capas?**
Los filtros convolucionales actúan como detectores de patrones y, al apilarlos en varias capas, el modelo aprende representaciones cada vez más complejas y abstractas de las imágenes.

**¿Qué cambios hicieron tu modelo más preciso?**
Incrementar el número de filtros en la primera capa, añadir una segunda capa convolucional y aplicar **Dropout** redujo el sobreajuste y mejoró la precisión final en el test set.
