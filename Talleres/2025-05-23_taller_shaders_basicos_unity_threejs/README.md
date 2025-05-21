# 🧪 taller_shaders_basicos_unity_threejs

## 📅 Fecha
2025-05-23

---

## 🎯 Objetivo del Taller

Introducir la creación de shaders personalizados para modificar visualmente materiales en tiempo real, comprendiendo la estructura básica de un shader y aplicando efectos visuales mediante código.
---

## 🧠 Conceptos Aprendidos

- Shaders en unity y threejs

---

## 🔧 Herramientas y Entornos

- Unity (versión LTS, XR Toolkit, Shader Graph)
- Three.js / React Three Fiber

---

## 📁 Estructura del Proyecto

```
2025-05-23_taller_shaders_basicos_unity_threejs/
├── entorno/               # python/, unity/, threejs/, colab/
├── datos/                 # imágenes, audio, modelos, video
├── resultados/            # capturas, métricas, gifs
├── README.md
```
---

## 🧪 Implementación

## ¿Qué es un shader?

Un **shader** es un programa que corre directamente en la **GPU** y define **cómo se dibujan** los vértices y píxeles de un objeto 3D. Se utiliza para controlar:

* **Color** y degradados
* **Iluminación** (difusa, especular, toon, etc.)
* **Texturas**, transparencias y efectos especiales (reflejos, distorsiones)
* **Optimización** de cálculos en la GPU para liberar la CPU

Existen distintos tipos:

* **Vertex Shaders:** transforman las posiciones de los vértices.
* **Fragment (Pixel) Shaders:** calculan el color final de cada píxel.
* **Surface Shaders / Shader Graph:** abstracciones que facilitan la interacción con los sistemas de iluminación de Unity.
* **Compute Shaders:** para cómputo genérico en GPU.

---

## Unity (versión LTS) – Ejemplo con Shader Graph

### Este fue el paso a paso seguido para contruir el programa

### 1. Crear la escena y el material

1. En la **Hierarchy**, añadir un objeto 3D (Cube o Sphere).
2. En el **Project**, **Right-click → Create → Shader → URP → Unlit Shader Graph**. Nombrar `GradientTimeShader`.
3. Crear un **Material** asociado: `GradientTimeMat`.

### 2. Diseñar el shader en Shader Graph

1. Abrir `GradientTimeShader` y en el **Blackboard** definir dos propiedades **ColorA** y **ColorB**.
2. Añadir nodos:

   * **Position (World u Object)** → **Split** → canal **Y** para el degradado.
   * **Time** → usa su salida **Sine Time** (o pasa **Time** por un **Sine** Node), normalizar de –1..1 a 0..1.
   * **Lerp(ColorA, ColorB, PositionY)** para el degradado vertical.
   * **Multiply(LerpOut, NormalizedSine)** para la animación.
   * Conectar salida al **Color** del **Unlit Master**.

### Shader Graph

![Shader Graph](https://github.com/user-attachments/assets/7494e3d8-80af-460c-a2b3-5586eb927883)

### Position World

![Shaders_basic](https://github.com/user-attachments/assets/81ed2e02-28dc-41ba-9619-8a79deed6961)

### Positio object

![Shader_basic_object](https://github.com/user-attachments/assets/d0f59e75-c9f3-4e78-9032-ff70f6dbca1e)

## Threejs

Aquí el objeto cambia de color a lo largo del tiempo y también se puede notar que existe un degrade dependiendo de la posición del color a lo largo del objeto (en el eje Y)

![Shader_Cubo_Threejs](https://github.com/user-attachments/assets/b3008315-ac8e-4fdd-baf6-3c8d59777f05)

## 🧩 Prompts Usados

```text
"¿Qué es un shader en unity?"
"Desarrolla el siguiente código: (se dieron los requerimientos para el programa en threejs)"
"Dame el paso a paso de cómo debería implementar los requerimiento en unity (se adjuntó la imagen de los requerimientos del programa en unity)"
```

---

## 💬 Reflexión Final

- ¿Qué aprendiste o reforzaste con este taller?
Entendimos cómo funcionan los shaders en unity y además el cómo implementarlos sin necesidad de agregar mucho código si no que por medio de shader graph la cual es una herramienta bastante útil para la generación de shaders de manera visual y no-code
- ¿Qué parte fue más compleja o interesante?
Fue complejo la exploración de la herramienta ya que realmete no se conocía mucho de ella, por lo que se tuvo que pedir bastante orientación de ChatGPT y videos de YouTube para poder usarla adecuadamente

---

## ✅ Checklist de Entrega

- [✅] Carpeta `YYYY-MM-DD_nombre_taller`
- [✅] Código limpio y funcional
- [✅] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [✅] Visualizaciones o métricas exportadas
- [✅] README completo y claro
- [✅] Commits descriptivos en inglés

---
