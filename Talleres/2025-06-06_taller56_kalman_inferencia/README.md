# Filtro de Kalman 1D: Estimación de Señal Oculta

Este proyecto implementa un **filtro de Kalman** unidimensional para estimar una variable oculta a partir de observaciones ruidosas e incompletas. A continuación se describe cada parte del flujo, las ecuaciones clave y un análisis de resultados.

---

## 1. Descripción del problema

- Generamos una **señal real** como un random walk suave (`real`).
- Simulamos **observaciones** añadiendo ruido Gaussiano (`observed`) y un 20 % de datos faltantes (`observed_incomplete`).
- El objetivo es usar un filtro de Kalman para obtener una **estimación** (`estimate`) que:
  1. Suavice el ruido.
  2. Rellene de forma óptima los valores faltantes.

---

## 2. Ecuaciones del filtro de Kalman 1D

Denotamos en el instante $k$:

- $x_k$: estado verdadero (desconocido).  
- $z_k$: medición ruidosa (observada).  
- $\hat x_{k|k-1}$: predicción de $x_k$ antes de ver $z_k$.  
- $\hat x_{k|k}$: estimación corregida tras incorporar $z_k$.  
- $P_{k|k-1}$, $P_{k|k}$: incertidumbres asociadas.  
- $Q$: varianza del proceso (ruido de modelo).  
- $R$: varianza de la medición (ruido de sensor).

### 2.1 Predicción
$
\begin{aligned}
\hat x_{k|k-1} &= \hat x_{k-1|k-1},\\
P_{k|k-1} &= P_{k-1|k-1} + Q.
\end{aligned}
$

### 2.2 Corrección
Si hay medición $z_k$:
$
\begin{aligned}
K_k &= \frac{P_{k|k-1}}{P_{k|k-1} + R},\\
\hat x_{k|k} &= \hat x_{k|k-1} + K_k\,(z_k - \hat x_{k|k-1}),\\
P_{k|k} &= (1 - K_k)\,P_{k|k-1}.
\end{aligned}
$
Si $z_k$ está ausente, se omite la corrección y $\hat x_{k|k} = \hat x_{k|k-1}$.

---

## 3. Resultados visuales

- **Línea azul**: señal real $x_k$.  
- **Línea naranja discontinua**: observaciones $z_k$ con ruido.  
- **Cruz roja**: posiciones donde faltan datos.  
- **Línea verde**: estimación $\hat x_k$ del filtro de Kalman.

---

## 4. ¿Cómo infiere el filtro la variable oculta?

- El filtro mantiene una **predicción continua** del estado y su **incertidumbre**.  
- Cada vez que llega una medición, ajusta la predicción según la **ganancia de Kalman** $K_k$, que pondera entre confiar en el modelo (Q) o en el sensor (R).  
- Cuando no hay medición, el filtro **confía en su predicción** y propaga únicamente la incertidumbre del proceso, permitiendo rellenar huecos sin colapsar.

---

## 5. Análisis de error

- Definimos el **error de estimación** en cada paso como  
  $\varepsilon_k = x_k - \hat x_{k|k}$.  
- El **error cuadrático medio** (MSE) sobre $N$ muestras es  
  $\displaystyle \mathrm{MSE} = \frac1N \sum_{k=1}^N \varepsilon_k^2.$

En nuestras pruebas con $Q=0.01$, $R=1.0$, obtenemos un MSE significativamente menor que la varianza de la medición, lo que demuestra que el filtro está **suavizando el ruido** y recuperando la señal subyacente con alta fidelidad.

![grafico_resultado](https://github.com/user-attachments/assets/9ff0318c-7cdc-451b-90fd-5585c4203e80)


---

> **Conclusión**: El filtro de Kalman 1D es una herramienta muy eficaz para estimar señales continuas corruptas por ruido e incluso con datos faltantes, al combinar de forma óptima la predicción de modelo con las mediciones disponibles.
