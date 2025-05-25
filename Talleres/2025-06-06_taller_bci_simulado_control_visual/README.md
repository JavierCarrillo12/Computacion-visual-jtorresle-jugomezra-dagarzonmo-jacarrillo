# 🧪 BCI Simulado: Señales Mentales Artificiales para Control Visual

## 📅 Fecha
2025-06-06

---

## 🎯 Objetivo del Taller

Simular el comportamiento de interfaces BCI (Brain-Computer Interface) usando datos generados o precargados para entender el procesamiento básico de señales EEG. El objetivo es aplicar filtros simples y condicionales lógicos para traducir la actividad cerebral simulada en una acción visual.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Filtrado digital (pasa-banda Alpha/Beta)  
- [x] Análisis de potencia espectral y umbralización  
- [x] Detección de eventos en series temporales  
- [x] Otro: BCI, señalización en tiempo real

---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- **Python 3.9+**  
  - `numpy`, `pandas`, `matplotlib`, `scipy.signal`  
- **Jupyter Notebook** / **Google Colab**  

---

## 📁 Estructura del Proyecto

2025-06-06_taller_bci_simulado_control_visual/
├── python/
│ └── bci_simulado.ipynb
└── README.md

---

## 🧪 Implementación

### 🔹 Etapas realizadas

1. **Preparación de datos**  
   - Carga del dataset EEG Eye State del repositorio UCI.  
   - Selección de un canal EEG (p. ej. AF3) y construcción del vector de tiempo (fs = 128 Hz).

2. **Aplicación de filtros**  
   - Diseño de filtros pasa-banda (8–12 Hz y 12–30 Hz) con `scipy.signal.butter` + `filtfilt`.  
   - Extracción de las señales filtradas `eeg_alpha` y `eeg_beta`.

3. **Cálculo de potencia y umbral**  
   - Cálculo de la densidad espectral con `welch` y área bajo la curva para potencia Alpha.  
   - Definición de un umbral dinámico (percentil 75) para generar un vector binario de “atención”.

4. **Visualización e interacción**  
   - Gráficas de señal cruda, bandas filtradas y nivel de atención vs etiqueta real de ojos.  
   - Simulación de una acción visual (fondo verde/rojo) en función del primer pico de atención.

5. **Exportación de resultados**  
   - Generación de un GIF animado que muestra la transición del indicador de atención a lo largo del tiempo.

### 🔹 Código relevante

```python
# Diseño de filtro pasa-banda
def bandpass_filter(data, fs, lowcut, highcut, order=4):
    nyq = 0.5 * fs
    b, a = butter(order, [lowcut/nyq, highcut/nyq], btype='band')
    return filtfilt(b, a, data)

# Calcular potencia Alpha y umbral
f, Pxx = welch(eeg_alpha, fs=fs, nperseg=512)
power_alpha = np.trapz(Pxx, f)
threshold = np.percentile(eeg_alpha**2, 75)

# Nivel de atención binario
attention = (eeg_alpha**2 > threshold).astype(int)
```
---


## 📊 Resultados Visuales

![Captura de pantalla 2025-05-25 163423](https://github.com/user-attachments/assets/a43eb6b9-97de-4579-a13b-a6101a35d34f)

![Captura de pantalla 2025-05-25 163518](https://github.com/user-attachments/assets/c708ca5e-2870-493f-a9d1-e19ec7b3afc2)

![Captura de pantalla 2025-05-25 163531](https://github.com/user-attachments/assets/bf3634d7-8704-448c-88f3-aca5cec34a29)

![Captura de pantalla 2025-05-25 163537](https://github.com/user-attachments/assets/30caee61-043e-4ea2-b4b2-58bab0d9c960)

---
## 🧩 Prompts Usados

```text
"Genera un código en Python para aplicar filtros pasa-banda Alpha y Beta en señales EEG."
"Simula un criterio de atención basado en potencia Alpha y dibuja un indicador visual."
"Integra el dataset EEG Eye State de UCI con fetch_ucirepo en Colab."
"Explica en un README la implementación paso a paso y añade un GIF animado."
```

---

## 💬 Reflexión Final

En este taller aprendimos a integrar un dataset real de EEG, aplicar filtros digitales y diseñar un umbral dinámico para traducir actividad cerebral en acciones de control visual. Fue especialmente interesante ver cómo la potencia en banda Alpha se asocia con el estado de los ojos y cómo un simple percentil puede servir de disparador para un indicador binario.

El reto más complejo fue lidiar con artefactos y picos inesperados en la señal, que obligaron a pensar en filtros robustos y preprocesamiento adicional. En futuros proyectos sería bueno añadir mecanismos de detección y supresión de artefactos (p. ej. interpolación de valores atípicos) y explorar técnicas de machine learning para mejorar la fiabilidad del umbral.

Además, implementar un GIF animado clarificó la necesidad de narrar visualmente los resultados en un informe. Para próximas iteraciones sería bueno usar `imageio` o bibliotecas especializadas para generar animaciones aún más claras y persuasivas.
