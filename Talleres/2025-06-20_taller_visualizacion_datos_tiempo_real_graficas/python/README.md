# 🧪 Taller - Visualización de datos en tiempo real.

## 📅 Fecha
`2025-06-30` – Fecha de realización

---
## 🎯 Objetivo del Taller
Capturar o simular datos (por ejemplo, conteo de objetos, coordenadas, temperatura, pulsos o señales artificiales) y visualizarlos en tiempo real mediante gráficos dinámicos. Se busca explorar cómo enlazar datos numéricos con representaciones gráficas actualizadas en vivo, útiles en monitoreo, visualización científica y dashboards.

---
## 🧠 Conceptos Aprendidos

- [x] Bloqueo y bufferizado en notebooks
  
- [x] Renderers de Plotly
      
- [x] Actualización de datos en vivo

- [x] Modo interactivo de Matplotlib

---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- Python (`plotly`, `kaleido`, `matplotlib`,`numpy`)
- Colab/Jupyter

---

## 📁 Estructura del Proyecto

```
2025-06-20_taller_visualizacion_datos_tiempo_real_graficas/
├── python/
├── README.md
```

---

## 🧪 Implementación

### 🎥 Captura y Procesamiento en Tiempo Real con YOLO

El script simula datos de temperatura en un bucle y actualiza en vivo una gráfica de Plotly, capturando cada fotograma para luego exportar un GIF.

### 🧩 Flujo General

1. **Configuración del entorno y del widget**
2. **Bucle de simulación y captura de fotogramas**
3. **Ensamblado y guardado de GIF**

### 🧩 Fragmento de código clave

```python
# Bucle principal: genera 100 fotogramas
for _ in range(100):
    # Calcula el tiempo actual desde el inicio
    t = time.time() - start

    # Añade el nuevo punto de tiempo y la temperatura con ruido
    x_data.append(t)
    y_data.append(np.sin(t) + np.random.normal(0, 0.1))

    # Crea la figura Plotly con la serie temporal actualizada
    fig = go.Figure(
        data=[go.Scatter(x=x_data, y=y_data, mode='lines')]
    )

    # Renderiza la figura a PNG en memoria y la lee como array
    img = fig.to_image(format='png', width=600, height=400)
    frames.append(imageio.v3.imread(img))

    # Pausa breve para simular tiempo real (aumenta o reduce para ajustar velocidad)
    time.sleep(0.1)
```

## 📊 Resultados Visuales
![GIF tiempo real ](https://github.com/user-attachments/assets/5dfde69e-7698-4c7c-979e-566255bece01)


---

## 🧩 Prompts Usados

```text
¿Cómo definir frames y updatemenus para una animación nativa de Plotly?
```

---

## 💬 Reflexión Final

## ¿Qué tan útil es visualizar datos en tiempo real?

Es fundamental cuando se trabaja con procesos dinámicos, porque ahorra ciclos de prueba-error: Se puede ajustar el algoritmo de captura o filtrado viendo inmediatamente el impacto.

## ¿Qué dificultades encontraste?

- La resolución alta hace que cada frame tarde demasiado en renderizarse.  
- El ensamblado de los fotogramas con `imageio` añade demora extra.  

Para solucionarlo, fue necesario balancear calidad y velocidad reduciendo el tamaño de la figura y optimizando el bucle de actualización.  
