# Taller - Ojos Digitales: Introducción a la Visión Artificial

Este taller exploró conceptos fundamentales de visión artificial aplicando transformaciones sobre la imagen `ignus.jpg`, incluyendo filtros de suavizado, afilado y detección de bordes.

---

## Actividades realizadas

1. **Carga de imagen** a color y conversión a escala de grises.
2. **Aplicación de filtros convolucionales**:
   - Suavizado: Filtro Gaussiano (`cv2.GaussianBlur`)
   - Afilado: Kernel personalizado (`cv2.filter2D`)
3. **Detección de bordes** con:
   - Sobel (X e Y)
   - Laplaciano (`cv2.Laplacian`)
4. **Visualización de resultados** con ventanas emergentes (`cv2.imshow()`).
5. **Generación de un GIF** comparando todos los resultados intermedios.

---

## Resultados visuales

- `01_gris.jpg`: conversión a escala de grises  
- `02_blur.jpg`: imagen suavizada  
- `03_sharpen.jpg`: imagen afilada  
- `04_sobel_x.jpg`: bordes en eje X  
- `05_sobel_y.jpg`: bordes en eje Y  
- `06_laplaciano.jpg`: bordes con Laplaciano  
- `filtros_bordes.gif`: animación de todas las transformaciones

### GIF resumen:

![GIF animado](./python/resultados/filtros_bordes.gif)

---

## Código relevante

```python
# Filtro de afilado
kernel_sharp = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
sharp = cv2.filter2D(img_gray, -1, kernel_sharp)
```

```python
# Filtros Sobel
sobel_x = cv2.Sobel(img_gray, cv2.CV_64F, 1, 0)
sobel_y = cv2.Sobel(img_gray, cv2.CV_64F, 0, 1)
```

```python
# Filtro Laplaciano
laplacian = cv2.Laplacian(img_gray, cv2.CV_64F)
laplacian = cv2.convertScaleAbs(laplacian)
```

```python
# Guardado y redimensionamiento para GIF
img_resized = cv2.resize(img, (base_shape[1], base_shape[0]))
imageio.mimsave("resultados/filtros_bordes.gif", frames, duration=2)
```

---

## Autor

Juan Pablo Gómez Rangel
