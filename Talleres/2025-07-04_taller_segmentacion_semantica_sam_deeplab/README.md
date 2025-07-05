
# Taller de Segmentación Semántica con DeepLabV3

Este taller aplica segmentación semántica sobre imágenes utilizando el modelo **DeepLabV3** preentrenado de `torchvision`.  
Se realizó la segmentación de una imagen de entrada para identificar las regiones de la misma de forma automática.

---

## Estructura del Proyecto

```
2025-07-04_taller_segmentacion_semantica_sam_deeplab/
├── colab_notebooks/
│   └── taller_segmentacion_deeplabv3.ipynb
├── imagenes_entrada/
│   └── urus.jpg
├── mascaras_salida/
│   └── deeplab_output.png
├── resultados/
│   └── comparacion.png
```

---

## Imágenes y Resultados

### Imagen original:
![Imagen Original](/imagenes_entrada/urus.jpg)

### Máscara segmentada:
![Máscara Segmentada](/mascaras_salida/deeplab_output.png)

### Comparación lado a lado:
![Comparación](/resultados/comparacion.png)

---

## Descripción del Modelo
Se utilizó **DeepLabV3** con backbone ResNet101, el cual:
- Funciona sin puntos o cajas manuales.
- Predice automáticamente la segmentación de la imagen.
- Produce una máscara con múltiples clases segmentadas.

---

## Código Relevante

```python
from torchvision import models, transforms
from PIL import Image
import torch

# Cargar modelo preentrenado
model = models.segmentation.deeplabv3_resnet101(pretrained=True).eval()

# Cargar imagen y preprocesar
input_image = Image.open("imagenes_entrada/urus.jpg")
preprocess = transforms.Compose([
    transforms.Resize(520),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])
input_tensor = preprocess(input_image).unsqueeze(0)

# Segmentación
with torch.no_grad():
    output = model(input_tensor)['out']
output_predictions = output.argmax(1).squeeze().cpu().numpy()
```

---

## Reflexión
- **Facilidad:** DeepLabV3 fue fácil de usar, ya que no requiere intervención manual.
- **Resultado:** Identificó correctamente los objetos principales como el vehículo, pero algunas clases pequeñas fueron menos precisas.
- **Mejor uso:** Funciona mejor en imágenes claras con objetos bien definidos.
