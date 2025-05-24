# 🎮 Taller - Interacción y UI en Escenas 3D con React Three Fiber

📅 **Fecha:** 2025-05-23 – Fecha de realización

🎯 **Objetivo del Taller:**
Implementar un sistema de interacción y UI similar al desarrollado en Unity, pero utilizando React Three Fiber. Este taller nos permitirá comparar dos enfoques diferentes para lograr resultados similares: Unity (con C#) y React Three Fiber (con JavaScript/React).

## 🔄 Comparación con Unity

### 🎮 Sistema de Input
**Unity (C#)**
```csharp
void Update() {
    float horizontal = Input.GetAxis("Horizontal");
    float vertical = Input.GetAxis("Vertical");
    Vector3 move = transform.right * horizontal + transform.forward * vertical;
    transform.Translate(move * speed * Time.deltaTime, Space.World);
}
```

**React Three Fiber (JS)**
```jsx
useFrame(({ mouse }) => {
  meshRef.current.rotation.y = mouse.x * Math.PI
})
```

### 🖼️ Sistema de UI
**Unity (C#)**
```csharp
public class UIManager : MonoBehaviour {
    public Text statusText;
    void Update() {
        statusText.text = $"Coordenadas: ({pos.x:F2}, {pos.y:F2}, {pos.z:F2})";
    }
}
```

**React Three Fiber (JS)**
```jsx
<Html>
  <button onClick={() => setPosition([Math.random(), 0, 0])}>Mover</button>
</Html>
```

## 🧠 Conceptos Aprendidos
* Implementación de `useFrame()` para tracking del mouse (equivalente a Update() en Unity)
* Sistema de eventos para objetos 3D con `onClick` (similar a Input.GetMouseButtonDown)
* Gestión de input global con `window.addEventListener` (alternativa a Input.GetAxis)
* Integración de UI 2D en espacio 3D mediante `<Html />` (similar a Canvas en Unity)
* Implementación de controles visuales con `leva` (equivalente a Slider en Unity)
* Gestión de estado para transformaciones en tiempo real (similar a Transform en Unity)

## 🔧 Stack Tecnológico
* React + Vite como base
* Three.js para gráficos 3D (equivalente a Unity Engine)
* React Three Fiber para integración React
* @react-three/drei para utilidades (similar a componentes de Unity)
* leva para controles visuales (equivalente a UI Sliders de Unity)
* Entorno de desarrollo: VSCode

## 📁 Estructura del Proyecto
```
2025-05-23_taller_interaccion_ui_r3f/
├── src/
│ ├── App.jsx # Escena principal (similar a Scene en Unity)
│ └── index.css # Estilos
├── public/
│ └── gifs/ # Recursos visuales
├── README.md
```

## 🧪 Implementación

Este taller nos permite explorar una implementación alternativa a Unity, utilizando el ecosistema React para crear interacciones 3D. Aunque el resultado final es similar, el enfoque y las herramientas son diferentes.

### 🔹 Características Implementadas

#### 🖱️ Sistema de Interacción
1. **Tracking del mouse**: Implementación de rotación basada en posición del cursor (similar a Input.GetAxis("Mouse X"))
2. **Sistema de clics**: Cambio de estado visual al interactuar con objetos (equivalente a Input.GetMouseButtonDown)
3. **Control por teclado**: Sistema de reset mediante teclas específicas (similar a Input.GetKeyDown)

#### 🧩 Sistema de UI
4. **UI Embebida**: Integración de elementos 2D en el espacio 3D (similar a Canvas en Unity)
5. **Controles Externos**: Panel de control para manipulación de propiedades (equivalente a UI Sliders)

### 🔹 Ejemplos de Código

**📌 1. Sistema de Tracking**
```jsx
useFrame(({ mouse }) => {
  meshRef.current.rotation.y = mouse.x * Math.PI
})
```

**📌 2. Sistema de Estados**
```jsx
<mesh onClick={() => setActive(!active)}>
  <meshStandardMaterial color={active ? 'hotpink' : 'orange'} />
</mesh>
```

**📌 3. Control por Teclado**
```jsx
useEffect(() => {
  const handleKeyDown = e => e.key === 'r' && setPosition([0, 0, 0])
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [])
```

**📌 4. UI Embebida**
```jsx
<Html>
  <button onClick={() => setPosition([Math.random(), 0, 0])}>Mover</button>
</Html>
```

**📌 5. Sistema de Control**
```jsx
const { scale } = useControls({ scale: { value: 1, min: 0.5, max: 3 } })
```

**📊 Resultados**

![Resultado tree](resultados/%20Input%20y%20UI%20.gif)

## 💭 Reflexión Final

Este taller nos ha permitido explorar una implementación alternativa a Unity, utilizando el ecosistema React. Aunque el resultado final es similar, el enfoque y las herramientas son diferentes, lo que nos da una perspectiva más amplia sobre cómo implementar interacciones 3D. La combinación de React Three Fiber con herramientas como drei y leva nos muestra cómo se pueden lograr resultados similares con diferentes tecnologías, enriqueciendo nuestro entendimiento de la programación gráfica.

### 🔄 Comparación de Enfoques

1. **Unity (C#)**
   - Enfoque orientado a componentes
   - Sistema de eventos integrado
   - UI Canvas nativo
   - Gestión de estado más tradicional

2. **React Three Fiber (JS)**
   - Enfoque declarativo
   - Sistema de hooks para eventos
   - UI flexible con HTML/CSS
   - Gestión de estado con React

Esta comparación nos ayuda a entender las fortalezas y debilidades de cada enfoque, permitiéndonos elegir la herramienta más adecuada según el proyecto.