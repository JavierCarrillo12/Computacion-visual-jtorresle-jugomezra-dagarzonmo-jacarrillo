# Python (https://colab.research.google.com/drive/1UrfiJ2eP0E12UxeaKlQjZpdP6hq3mEC-?authuser=6#scrollTo=XkVoz8b_iz59)

Partiendo de una lista de coordenadas (ya sea definida a mano o leída desde un CSV/JSON), el notebook itera cada punto y, según el índice, decide si crear un cubo, una esfera o un cilindro. Para cada objeto se calculan tamaño y color —usando un array de colores y una fórmula lineal sobre el índice— y luego se llaman a las APIs de Vedo, Trimesh y Open3D para generar la malla correspondiente y trasladarla a la posición deseada. Finalmente, esas mallas se agrupan en una escena (con Assembly en Vedo, Scene en Trimesh o sumándolas en Open3D) y se exportan en los formatos OBJ, STL o GLTF con una sola línea de código.

# Se generaron los archivos pedidos

![image](https://github.com/user-attachments/assets/0f625b48-f684-4215-99b3-91454fd63941)


## GIF

![Python_GIF](https://github.com/user-attachments/assets/0d82edca-3a9e-4917-8081-37133c7f6c1e)

# Threejs

1. **Datos estructurados**:  
   Se define un array `initialObjects` donde cada objeto contiene:  
   ```jsx
   {
     id: único,
     position: [x, y, z],
     scale: factor de tamaño,
     color: hexadecimal,
     rotation: ángulo en radianes,
     type: 'box' o 'sphere'
   }
   ```

2. **Mapeo adaptativo**:  
   Se usa `map()` para convertir cada objeto del array en componentes 3D:  
   ```jsx
   initialObjects.map(obj => (/* componente 3D */))
   ```

3. **Propiedades dinámicas**:  
   - `position`: Se toma directamente del dato  
   - `scale`: Combina la escala del objeto con un control global de Leva (`obj.scale * config.globalScale`)  
   - `rotation`: Aplica rotación en eje Y usando el ángulo del objeto modificado por la escala global  
   - `color`: Usa el color del objeto, o el color global de Leva si no está definido (`obj.color ?? config.globalColor`)

4. **Renderizado condicional**:  
   Se decide el tipo de geometría con un operador ternario:  
   ```jsx
   {obj.type === 'box' ? <Box/> : <Sphere/>}
   ```

5. **Integración con Leva**:  
   Los controles `globalScale` y `globalColor` modifican en tiempo real propiedades de todos los objetos, demostrando cómo los datos estáticos pueden combinarse con parámetros dinámicos.

## GIF

![Threejs-Gneración-de-objetos](https://github.com/user-attachments/assets/c3c85e6b-feb3-4bac-9a8d-4c87a5bce372)

# PROMPTS USADOS

A nivel general se solicitó que se ayudara en la generación y comentación de código para poder entender la tarea realizada en cada uno se pasaron los requerimientos del programa y el lenguaje en el cual se debía desarrollar

# MEJORAS, CONSIDERACIONES Y DIFICULTADES ENCONTRADAS

Fue sencillo el poder entender por medio de la IA la estructura del código y qué funciones se utilizan en cada lenguaje para realizar las generaciones solicitadas, aunque cabe decir que el uso de algunas bibliotecas y la renderización en colab fueron algo complicados ya que existían falta de recursos


