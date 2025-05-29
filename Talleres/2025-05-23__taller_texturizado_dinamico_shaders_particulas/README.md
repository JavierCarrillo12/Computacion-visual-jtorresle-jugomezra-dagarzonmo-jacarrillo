# 🧪 Taller - Texturizado dinámico con shaders y datos.

## 📅 Fecha
`2025-05-23` – Fecha de realización

---

## 🎯 Objetivo del Taller

Crear materiales que cambien en tiempo real en respuesta a entrada del usuario, paso del tiempo o sensores simulados. Además, se integrarán efectos de partículas para complementar visualmente el comportamiento del material, simulando fenómenos como fuego, agua, electricidad o portales.
---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Crear un shader con `shaderMaterial` y uniforms animados
- [x] Usar `useFrame` para animar propiedades por tiempo o interacción
- [x] Construir un sistema de partículas con `points` y `bufferGeometry`

---

## 🔧 Herramientas y Entornos

- Three.js / React Three Fiber (`TextureLoader`, `shaderMaterial`,`bufferGeometry`)

---

## 📁 Estructura del Proyecto

```
2025-05-24_taller_texturizado_dinámico_shaders_particulas
├── threejs/
├── README.md
```
---

## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas
1. Configuración del proyecto con React Three Fiber y Vite
2. Creación de la escena 3D con objeto central
3. Implementación del sistema de partículas dinámicas alrededor del objeto

### 🔹 Código relevante

```python
# Configuración de canvas con escena básica
function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <AnimatedShaderSphere />
      <ParticleSystem />
      <OrbitControls />
    </Canvas>
  )
}

```
```python
# Shader personalizado para la esfera animada.
const MyShaderMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color(0.2, 0.5, 1.0) },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      float brightness = sin(uTime + vUv.x * 10.0) * 0.5 + 0.5;
      gl_FragColor = vec4(uColor * brightness, 1.0);
    }
  `
)

```
```python
# Partículas alrededor del objeto usando Points y BufferGeometry
function ParticleSystem({ count = 500 }) {
  const pointsRef = useRef()
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const radius = 1.5 + Math.random() * 0.5
    const angle = Math.random() * Math.PI * 2
    const y = (Math.random() - 0.5) * 1.5
    positions.set([
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    ], i * 3)
  }

  useFrame(() => {
    pointsRef.current.rotation.y += 0.001
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="white"
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
```

## 📊 Resultados Visuales
![Escena básica](https://github.com/user-attachments/assets/727f6437-bea8-4a89-81cc-058e88a96e78)
![Cambio dinámico con el movimiento del mouse](https://github.com/user-attachments/assets/8a17a23b-7143-4250-8c1e-b9222c1b0d37)
![Esfera animada con shaders y un campo de particulas](https://github.com/user-attachments/assets/18c79a1e-6f8e-499f-b695-c2719c7a6b05)




```

## 🧩 Reflexión

```
"¿Cuál fue el efecto más interesante o difícil de lograr?"
"El efecto más interesante fue la animación del color y brillo del shader personalizado, ya que logra un efecto visual dinámico y cambiante."
```

## ✅ Checklist de Entrega

- [x] Carpeta `2025_05_24_taller_dinamico_shaders_particulas`
- [x] Código limpio y funcional
- [x] GIFs incluidos con nombre descriptivo
- [x] README completo y claro
---
