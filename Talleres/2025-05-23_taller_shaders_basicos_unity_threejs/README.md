# Shader Demos: Unity y Three.js

Este repositorio contiene dos ejemplos prácticos de **shaders**: uno en **Unity (URP + Shader Graph)** y otro en **Three.js con React Three Fiber**.

---

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


