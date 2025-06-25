# Taller – Explorando el Universo Latente: Introducción a Stable Diffusion

## 🎯 Objetivo  
Comprender cómo funcionan los modelos de difusión generativa y aprender a generar imágenes detalladas a partir de descripciones textuales (prompts) usando **Stable Diffusion** con la librería **diffusers** de Hugging Face, ya sea en **Google Colab** o en un **entorno local**.


---

## 📖 1. Introducción a los Modelos de Difusión  
Los **modelos de difusión** son una clase de generadores de imágenes que aprenden a transformar ruido gaussiano en contenido visual coherente, paso a paso, siguiendo la señal de un prompt textual. A grandes rasgos:

1. **Difusión directa**: Añade ruido progresivamente a datos reales.  
2. **Difusión inversa**: El modelo aprende a remover ese ruido, reconstruyendo imágenes desde ruido puro.  

Más información:  
- Rami, Xu et al. “High-Resolution Image Synthesis with Latent Diffusion Models”  
- Documentación oficial de Hugging Face Diffusers  

---

## ⚙️ 2. Preparación del Entorno

### Google Colab  
#### Link al colab: https://colab.research.google.com/drive/1vjsiGepbEtkFq0pJahgytah7syIh1ucr?usp=sharing
1. Abre el notebook `Taller_StableDiffusion.ipynb` en tu Drive
2. Activa GPU: **Entorno → Cambiar tipo de entorno de ejecución → GPU**.  
3. Ejecuta la celda de instalación:
```bash
   !pip install diffusers transformers accelerate safetensors
````

4. Autentícate en Hugging Face si quieres acceder a modelos privados:

   ```python
   from huggingface_hub import login
   login()
   ```

### Entorno Local

1. Crea un entorno virtual:

   ```bash
   python3 -m venv venv
   source venv/bin/activate   # Linux/macOS
   venv\Scripts\activate      # Windows
   ```
2. Instala dependencias:

   ```bash
   pip install torch torchvision diffusers transformers accelerate safetensors
   ```
3. (Opcional) Si tienes GPU NVIDIA y CUDA:

   ```bash
   pip install xformers    # para atención eficiente
   ```

---

## 🚀 3. Carga de un Modelo Preentrenado

```python
from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")
```

> **Tip:** Para SDXL o SDXL-Turbo reemplaza el identificador de modelo.

---

## 🎨 4. Generación de Imágenes a Partir de Prompts

```python
generator = torch.Generator(device="cuda").manual_seed(42)

output = pipe(
    prompt="Un paisaje onírico al atardecer, estilo óleo",
    negative_prompt="baja calidad, desenfoque, texto",
    height=512,
    width=512,
    num_inference_steps=50,
    guidance_scale=7.5,
    num_images_per_prompt=4,
    generator=generator
)

for idx, img in enumerate(output.images):
    img.save(f"salida_{idx}.png")
```

* **`num_inference_steps`**: cantidad de pasos de difusión.
* **`guidance_scale`**: fuerza de adherencia al prompt.
* **`height`/`width`**: resolución (múltiplos de 8 para SD1.x, de 64 para SDXL).
* **`negative_prompt`**: filtra artefactos o elementos no deseados.
* **`num_images_per_prompt`**: genera varias imágenes en un solo batch.

---

## 🔧 5. Optimización de Memoria y Velocidad

```python
pipe.enable_xformers_memory_efficient_attention()
pipe.enable_attention_slicing()
pipe.enable_model_cpu_offload()  
```

* **xFormers** y **slicing** reducen el pico de VRAM.
* **CPU offload** mueve partes del modelo a RAM si tu GPU es limitada.

---

## ✨ 6. Técnicas Avanzadas

| Técnica        | Pipeline                                | Notas clave                        |
| -------------- | --------------------------------------- | ---------------------------------- |
| **Inpainting** | `StableDiffusionInpaintPipeline`        | Necesita máscara de área a rehacer |
| **ControlNet** | `StableDiffusionControlNetPipeline`     | Usa preprocesadores (pose, edges…) |
| **LoRA**       | `pipe.load_lora_weights("ruta/a/lora")` | Aísla estilo propio con pocos MB   |

---

## 💾 7. Guardado y Presentación de Resultados

* **TorchVision Grid**:

  ```python
  from torchvision.utils import save_image
  save_image(output.images, "grid.png", nrow=2)
  ```

---

## 📚 8. Resultados visuales

![Captura de pantalla 2025-06-25 161221](https://github.com/user-attachments/assets/27bc1157-3e3e-4225-a235-cd1efd42dd79)

![Captura de pantalla 2025-06-25 165709](https://github.com/user-attachments/assets/5a94a1df-9e5f-43c0-8177-3afcfc3e21a6)
![Captura de pantalla 2025-06-25 165716](https://github.com/user-attachments/assets/2c402075-bd2c-459f-8a43-bf1961d066ff)
![Captura de pantalla 2025-06-25 165725](https://github.com/user-attachments/assets/c810dffb-db94-4335-87d0-b1921837e9dd)
![Captura de pantalla 2025-06-25 165700](https://github.com/user-attachments/assets/587cd555-5243-4809-8079-b61c68fb2713)

![Captura de pantalla 2025-06-25 165644](https://github.com/user-attachments/assets/3418329b-3811-470f-8771-608dc1bb069d)

---

## 🤔 Reflexión  
- **`num_inference_steps`**: a más pasos, más detalle y texturas finas, pero también más tiempo de cómputo y riesgo de “sobre-suavizado”.  
- **`guidance_scale`**: valores bajos (~3–5) dan imágenes más creativas y menos ligadas al prompt; valores altos (>7) aumentan la fidelidad al texto pero pueden producir artefactos.  
- **`height` / `width`**: resoluciones mayores revelan más detalle, pero consumen proporcionalmente más VRAM y tardan más; relaciones muy alargadas pueden distorsionar (mejor usar múltiplos adecuados).  
- **`negative_prompt`**: filtra artefactos comunes (baja calidad, textos, manos deformes), logrando imágenes más limpias sin modificar el prompt principal.  
- **`num_images_per_prompt`**: genera varios ejemplos en paralelo, facilitando la comparación de variaciones y permitiendo escoger la mejor.

**Estilos más satisfactorios**  
- El estilo **óleo** para paisajes generó texturas naturales y transiciones suaves de color.  
- El estilo **cyberpunk nocturno** dio ambientes ricos en neón y alto contraste, especialmente usando relaciones de aspecto panorámicas.  

---

## 🗒️ Descripción del modelo y versión usada  
Para todas las pruebas utilizamos el siguiente pipeline:

```python
from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")


¡Listo para comenzar tu viaje en el universo latente! 🌌🪐🚀

```

````markdown
## 🤔 Reflexión  
- **`num_inference_steps`**: a más pasos, más detalle y texturas finas, pero también más tiempo de cómputo y riesgo de “sobre-suavizado”.  
- **`guidance_scale`**: valores bajos (~3–5) dan imágenes más creativas y menos ligadas al prompt; valores altos (>7) aumentan la fidelidad al texto pero pueden producir artefactos.  
- **`height` / `width`**: resoluciones mayores revelan más detalle, pero consumen proporcionalmente más VRAM y tardan más; relaciones muy alargadas pueden distorsionar (mejor usar múltiplos adecuados).  
- **`negative_prompt`**: filtra artefactos comunes (baja calidad, textos, manos deformes), logrando imágenes más limpias sin modificar el prompt principal.  
- **`num_images_per_prompt`**: genera varios ejemplos en paralelo, facilitando la comparación de variaciones y permitiendo escoger la mejor.

**Estilos más satisfactorios**  
- El estilo **óleo** para paisajes generó texturas naturales y transiciones suaves de color.  
- El estilo **cyberpunk nocturno** dio ambientes ricos en neón y alto contraste, especialmente usando relaciones de aspecto panorámicas.  
- La variante **SDXL-Turbo** (cuando la probamos) fue muy rápida en pasos bajos, ideal para iteraciones exploratorias.

---

## 🗒️ Descripción del modelo y versión usada  
Para todas las pruebas utilizamos el siguiente pipeline:

```python
from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")
````

- **Modelo**: `runwayml/stable-diffusion-v1-5` (983 M parámetros)  
- **Arquitectura**:  
  - Autoencoder Variacional (VAE) para mapear imágenes a un espacio latente  
  - U-Net profundo con atención cruzada condicionada por embeddings de texto CLIP  
  - Classifier-free guidance para equilibrar creatividad y fidelidad al prompt  
- **Datos de entrenamiento**: subconjuntos de LAION-5B con imágenes de alta estética y sin marca de agua  
- **Resolución base**: 512 × 512 px (múltiplos de 8)  
- **Características clave**: text-to-image, inpainting nativo, soporte ControlNet y fine-tuning ligero (LoRA/DreamBooth)  
- **Licencia**: CreativeML Open RAIL-M, uso local o en la nube con atribución y medidas de seguridad  

---

## 📝 Lista de prompts utilizados

* `"A surreal futuristic city in the clouds, digital art"`
* `"Un paisaje onírico al atardecer, estilo óleo"`
* `"A photograph of an astronaut riding a horse"`
* `"A cyberpunk street at night"`
* `"A cyberpunk street at dawn"`
* `"A cyberpunk street in the rain"`
* `"An apple seeing soe bananas in oilpainting"`
* `"A cyberpunk runnig from Adam Smasher"`
* `"A cyberpsyco after use the sandevistan"`


