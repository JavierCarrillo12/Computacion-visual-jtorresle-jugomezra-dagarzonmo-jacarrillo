## Modelos de Color Utilizados

### RGB (Red – Green – Blue)

* Es el espacio más habitual para representar imágenes en pantallas digitales.
* Cada píxel se describe mediante tres componentes (rojo, verde y azul) con valores normalmente entre 0 y 255.
* Permite la combinación aditiva de colores: al sumar valores máximos se obtiene blanco, y al poner todos a cero, negro.

### HSV (Hue – Saturation – Value)

* **Hue (tono)**: ángulo entre 0° y 360° que define el matiz de color (rojo, verde, azul…).
* **Saturation (saturación)**: intensidad del color desde 0 % (gris) hasta 100 % (color puro).
* **Value (valor o brillo)**: luminancia del color de 0 % (negro) a 100 % (color al máximo de brillo).
* Separar la tonalidad de la saturación y brillo facilita ajustes como cambiar solo el matiz o el nivel de luz sin alterar la intensidad del color.

### CIE Lab (Luminosity – a – b)

* Diseñado para ser perceptualmente uniforme: cambios iguales en cualquiera de sus tres ejes resultan en variaciones visualmente similares.
* **L** (luminosidad): de 0 (negro) a 100 (blanco).
* **a**: eje que va de verde (valores negativos) a rojo (positivos).
* **b**: eje que va de azul (negativos) a amarillo (positivos).
* Útil para procesamientos avanzados de color donde la percepción humana debe considerarse, como corrección de color y análisis de imágenes.

---

## Transformaciones de Color Realizadas

### 1. Inversión de Colores

* Cada componente RGB se invierte: lo que era 0 pasa a 255, y viceversa.
* Produce un efecto tipo “negativo fotográfico”.
* Se usó para demostrar manipulaciones directas y crear contrastes extremos.

### 2. Conversión a Monocromo

* Se calcula un único canal de luminancia (grises) a partir de RGB.
* Facilita el análisis de textura y luminosidad sin preocuparse por el matiz o saturación.
* Ideal para procesamientos donde el color no aporta información adicional (p. ej. detección de bordes).

### 3. Ajustes de Brillo y Contraste

* **Brillo**: se suma o resta un valor constante a cada componente para aclarar u oscurecer la imagen.
* **Contraste**: se multiplica cada componente por un factor (>1 para aumentar, <1 para disminuir).
* Permite optimizar la visibilidad de detalles en zonas muy claras u oscuras.

### 4. Simulaciones de Daltonismo

* Se transformó la imagen a CIE Lab y de vuelta a RGB, modificando dichos valores para imitar:

  * **Protanopia** (deficiencia en la percepción del rojo).
  * **Deuteranopia** (deficiencia en el verde).
* Mostró cómo personas con estos tipos de daltonismo verían la misma escena.

---

## Función de Alternancia de Color

Se diseñó una función genérica que, según un parámetro — por ejemplo `"invertir"` o `"monocromo"` — aplica la transformación adecuada sobre la imagen original. Esto centraliza la lógica de todos los efectos y simplifica su invocación.

---

## Interfaz Interactiva

Para facilitar la exploración de las distintas simulaciones, se integró un selector desplegable en el notebook que:

1. Muestra las opciones de transformación (original, inversión, monocromo, protanopia, etc.).
2. Al elegir una de ellas, aplica inmediatamente la función de alternancia y refresca la imagen.
3. Ofrece una experiencia visual dinámica sin tener que reejecutar manualmente celdas de código.

---

### Conclusión

Este conjunto de pruebas demuestra:

* **Cómo y por qué** cambiar entre espacios de color según la necesidad (visualización, corrección, simulación perceptual).
* La **importancia** de separar componentes (tono, saturación, brillo) para intervenciones precisas.
* La **versatilidad** de integrar todo en un flujo interactivo que facilita el aprendizaje y la experimentación.

Al aplicar estas simulaciones de color hemos podido apreciar cómo pequeñas variaciones en el espacio cromático transforman por completo nuestra lectura de la imagen y revelan aspectos sobre la percepción visual:

1. **Contraste y atención**

   * **Inversión de colores** convierte una escena familiar en un negativo fotográfico: los blancos se vuelven negros y viceversa. Este cambio drástico potencia el contraste de bordes y texturas, llevando nuestra mirada instantáneamente a formas y contornos que, de otro modo, pasarían desapercibidos. Funciona casi como un filtro de realce de contornos, pero a costa de perder la “naturalidad” del color.
   * En situaciones de análisis —por ejemplo, detectar defectos en una superficie o resaltar zonas de interés— esta simulación puede ser muy efectiva para llamar la atención sobre detalles finos.

2. **Reducción de complejidad visual**

   * Al pasar a **monocromo**, dejamos de lado la información de tono y saturación, quedándonos solo con la luminosidad. Esto simplifica la escena, centrándonos en la estructura, el sombreado y la intensidad de luz.
   * Para aplicaciones como el procesamiento de bordes, OCR o reconocimiento de formas, el monocromo despeja “ruido” innecesario; pero desde un punto de vista estético el resultado es más sobrio y pierde riqueza emocional asociada al color.

3. **Empatía y accesibilidad**

   * Las simulaciones de **protanopia** y **deuteranopia** nos muestran cómo las personas con daltonismo perciben los matices rojos y verdes: zonas originalmente vibrantes se convierten en tonos más apagados o similares, dificultando la distinción entre ciertos elementos.
   * Este ejercicio invita a diseñadores y creadores de contenido a comprobar la legibilidad de gráficos y diagramas en paletas amigables (por ejemplo, evitando el clásico rojo/verde en combinación). Asegurar un contraste suficiente y usar texturas o formas secundarias es clave para una experiencia inclusiva.


