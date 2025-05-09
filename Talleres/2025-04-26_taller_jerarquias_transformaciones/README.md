# Threejs

**Explicación concisa de la implementación:**

1. **Jerarquía 3D con `<group>`:**  
   Se crea una estructura padre-hijo-nieto usando componentes `<group>` de React Three Fiber. Cada grupo actúa como contenedor de transformaciones (posición, rotación, escala) que se heredan en cascada.

2. **Controles dinámicos con Leva:**  
   - Se usan controles deslizantes para manipular en tiempo real:  
     ✅ `Rotación` del padre (eje Y)  
     ✅ `Posición X/Y` del padre  
   - Los cambios afectan a **toda la jerarquía** gracias a la reactividad de React.

3. **Transformaciones encadenadas:**  
   - **Padre:** Control base con Leva (rotación + posición 2D)  
   - **Hijo:** Transformación fija (posición [1,0,0] + rotación 45°) relativa al padre  
   - **Nieto (Bonus):** Transformación adicional (posición vertical + rotación 45° en Z) relativa al hijo  

4. **Herencia visual:**  
   - Las cajas (`<Box>`) disminuyen de escala en cada nivel (1 → 0.6 → 0.4)  
   - Los colores diferenciados (naranja, rosa, cyan) ayudan a identificar cada nivel  
   - La rotación/traslación del padre mueve **todo el sistema** como una unidad coherente

**Efecto final:**  
Al manipular los controles de Leva, se observa cómo:  
- El movimiento del padre arrastra consigo toda la estructura  
- Las transformaciones locales de hijos/nietos se mantienen relativas a su padre  
- Las rotaciones se combinan de forma acumulativa (ej: rotación padre + rotación hijo)  

# GIF

![Threejs_jerarquíaz](https://github.com/user-attachments/assets/83c1e130-e057-460c-bcec-87605d0fc14d)

# Unity

# GIF

![Unity-jERARQUÍA-](https://github.com/user-attachments/assets/6c2f3bdb-4de7-4404-8fb4-d22642af095f)


**Desarrollo del Ejercicio de Jerarquía en Unity:**

### **1. Estructura de la Jerarquía:**
- **Objetos 3D anidados:**  
  - **Padre:** Un cubo (`Cube`) como raíz de la jerarquía.  
  - **Hijo:** Una esfera (`Sphere`) como hijo directo del cubo.  
  - **Nieto:** Un cilindro (`Cylinder`) como hijo de la esfera.  
  - **Propósito:** Demostrar cómo las transformaciones del padre afectan a toda la cadena jerárquica.

### **2. Configuración de la UI:**
- **Elementos necesarios:**  
  - **Canvas:** Contenedor principal para los elementos de interfaz.  
  - **Sliders:**  
    - *Posición X*: Rango de -5 a 5 unidades.  
    - *Rotación Y*: Rango de 0° a 360°.  
    - *Escala*: Rango de 0.5x a 1.5x.  
  - **Textos (TMP):** Para mostrar los valores actuales de posición, rotación y escala.  
  - **Botones (Bonus):** *Play/Pause* y *Reset* para controlar la animación.  

### **3. Script en C# (`ParentController.cs`):**
- **Funcionalidades clave:**  
  ```csharp
  public class ParentController : MonoBehaviour {
      // Referencias a UI
      [SerializeField] private Slider positionSlider, rotationSlider, scaleSlider;
      [SerializeField] private TMP_Text positionText, rotationText, scaleText;

      // Control de animación
      private bool isAnimating = true;
      private Vector3 initialPosition;
      
      void Start() {
          // Inicializar valores y vincular eventos de sliders
          positionSlider.onValueChanged.AddListener(UpdatePosition);
          // ... (similar para rotación y escala)
      }

      void UpdatePosition(float value) {
          // Mover padre en X y actualizar texto
          transform.position = new Vector3(value * 10 - 5, initialPosition.y, initialPosition.z);
          positionText.text = $"Pos: {transform.position.x:F2}";
      }

      // Métodos para animación (Bonus)
      public void ToggleAnimation() => isAnimating = !isAnimating;
      public void ResetTransform() { /* Reiniciar sliders y valores */ }
  }
  ```

### **4. Vinculación en el Editor de Unity:**
- **Asignación de referencias:**  
  - Arrastrar los sliders y textos desde la jerarquía al script en el Inspector del objeto padre.  
  - Configurar los rangos de los sliders (0 a 1 para normalizar valores).  

- **Configuración de botones (Bonus):**  
  - Vincular los métodos `ToggleAnimation()` y `ResetTransform()` a los eventos `OnClick()` de los botones.  

### **5. Herencia de Transformaciones:**
- **Comportamiento automático:**  
  - Al modificar la posición/rotación/escala del padre:  
    - Los hijos heredan las transformaciones en coordenadas locales.  
    - Ejemplo: Si el padre se mueve en X, el hijo se mueve junto a él manteniendo su posición relativa.  
  - La escala se aplica multiplicativamente: Escalar al padre al 200% hará que los hijos dupliquen su tamaño relativo.  

### **6. Animación Automática (Bonus):**
- **Implementación:**  
  - En `Update()`, usar `Mathf.PingPong()` para crear movimiento de vaivén.  
  - Controlar la velocidad con `animationSpeed`.  
  ```csharp
  void Update() {
      if (isAnimating) {
          float pingPong = Mathf.PingPong(Time.time * animationSpeed, 1f);
          positionSlider.value = pingPong; // Actualiza el slider automáticamente
      }
  }
  ```

### **7. Pruebas y Resultados:**
- **Ejecución:**  
  - Al mover los sliders, el cubo (padre) se traslada, rota o escala, arrastrando consigo a la esfera y el cilindro.  
  - Los textos muestran los valores en tiempo real (ej: `Pos: 2.50`, `Rot: 180°`).  
  - La animación activa el movimiento automático del padre, que puede pausarse o reiniciarse.  

### **8. Comentarios personales sobre el aprendizaje y dificultades encontradas:**
- **UI no visible:**  
  - Fue un reto organizar los sliders y la visibilidad debido a la complejidad del movimiento en Unity 
- **Sliders no funcionan:**  
  - Fue complicado asociar lor valores a los sliders.  
- **Hijos no se mueven:**  
  - Fue complicado hacer que las asociaciones de jerarquía fueran cambiando.  

