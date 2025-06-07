# Implementación Unity - Animaciones por Esqueleto

## 🎮 Requisitos

- Unity 2022.3 LTS o superior
- Modelo FBX con rig humanoide (desde Mixamo o similar)

## 📁 Estructura del Proyecto

```
unity/
├── Assets/
│   ├── Models/        # Modelos FBX
│   ├── Animations/    # Clips de animación
│   ├── Scripts/       # Scripts C#
│   ├── Scenes/        # Escenas Unity
│   └── Prefabs/       # Prefabs reutilizables
└── ProjectSettings/   # Configuración del proyecto
```

## 🛠️ Configuración

1. **Importación del Modelo**
   - Importar el modelo FBX en la carpeta `Assets/Models`
   - Configurar el rig como "Humanoid" en las import settings
   - Asegurarse de que las animaciones estén configuradas correctamente

2. **Animator Controller**
   - Crear un nuevo Animator Controller
   - Configurar los estados de animación (Idle, Walk, Run)
   - Establecer transiciones entre estados
   - Configurar parámetros para controlar las transiciones

3. **Scripts**
   - `AnimationController.cs`: Controla las transiciones de animación
   - `PlayerInput.cs`: Maneja la entrada del usuario
   - `UIManager.cs`: Gestiona la interfaz de usuario

## 🎯 Implementación

1. **Sistema de Animación**
   ```csharp
   // AnimationController.cs
   public class AnimationController : MonoBehaviour
   {
       private Animator animator;
       private readonly int SpeedHash = Animator.StringToHash("Speed");
       private readonly int JumpHash = Animator.StringToHash("Jump");

       void Start()
       {
           animator = GetComponent<Animator>();
       }

       public void SetSpeed(float speed)
       {
           animator.SetFloat(SpeedHash, speed);
       }

       public void TriggerJump()
       {
           animator.SetTrigger(JumpHash);
       }
   }
   ```

2. **Control de Entrada**
   ```csharp
   // PlayerInput.cs
   public class PlayerInput : MonoBehaviour
   {
       private AnimationController animController;

       void Start()
       {
           animController = GetComponent<AnimationController>();
       }

       void Update()
       {
           float horizontal = Input.GetAxis("Horizontal");
           float vertical = Input.GetAxis("Vertical");
           
           Vector3 movement = new Vector3(horizontal, 0, vertical);
           float speed = movement.magnitude;
           
           animController.SetSpeed(speed);
       }
   }
   ```

## 🎨 UI

1. **Elementos de la Interfaz**
   - Panel de control de animaciones
   - Botones para cada animación
   - Slider para velocidad de transición
   - Toggle para pausar/reanudar

2. **Eventos**
   - Botones conectados a eventos de animación
   - Sliders para controlar parámetros
   - Toggles para activar/desactivar características

## 🔧 Optimizaciones

1. **Rendimiento**
   - Uso de mecanim para animaciones eficientes
   - Transiciones suaves entre estados
   - Optimización de bones y weights

2. **Memoria**
   - Carga asíncrona de animaciones
   - Pooling de objetos cuando sea necesario
   - Limpieza de recursos no utilizados

## 📝 Notas Adicionales

- Asegúrate de que el modelo tenga un rig humanoide correcto
- Configura las transiciones con tiempos apropiados
- Prueba las animaciones en diferentes situaciones
- Documenta cualquier problema encontrado 