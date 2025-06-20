# 🧪 Taller - Cinemática Directa: Brazo Robóticos

`2025-06-12` – Fecha de realización


---
## 🎯 Objetivo del Taller

Utilizar los principios de la cinemática directa (Forward Kinematics) para dar movimiento a objetos articulados, como brazos robóticos. El propósito es entender cómo las rotaciones en cadena influyen en el desplazamiento y la ubicación de cada componente dentro de una estructura jerárquica.

---

## 🧠 Conceptos Aprendidos

### ¿Qué es la Cinemática Directa?
Consiste en determinar la posición y orientación del extremo de una estructura articulada (como el efector final de un brazo robótico) utilizando los ángulos de sus articulaciones y las dimensiones de sus eslabones.
Se basa en una estructura jerárquica, donde cada segmento influye en el siguiente y los movimientos rotacionales se combinan progresivamente.

- [x] Cinemática directa (Forward Kinematics)
- [x] Transformaciones jerárquicas
- [x] Rotaciones locales y globales
- [x] Trayectorias visuales

---

## 🔧 Herramientas y Entornos

- Threejs

---

## 📁 Estructura del Proyecto

```
2025-06-06_taller_cinematica_directa_fk/
├── threejs/
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── .gitignore
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── index.css
│       └── vite-env.d.ts
├── README.md

```
---

## 🧪 Implementación

### Implementación de la animación directa en Threejs

En el proyecto con React Three Fiber, se representó un brazo robótico con 3 segmentos unidos por grupos jerárquicos. Cada parte rota sobre su eje local, transmitiendo ese movimiento a los segmentos hijos.

Se usaron referencias (ref) para controlar las rotaciones con rotation.z, y se calculó la posición final con getWorldPosition() para trazar su trayectoria. La interfaz con Leva permite ajustar los ángulos manualmente o activar animación automática.

### 🔹 Código relevante

#### Threejs

```Javascript
// Animación y cálculo de la trayectoria.
'''Python
useFrame(({ clock }) => {
  const t = clock.getElapsedTime()
  ...
  if (autoAnimation) {
    baseRef.current.rotation.z = Math.sin(t)
    ...
  } else {
    baseRef.current.rotation.z = angle1
    
  }
  ...
  tipRef.current.getWorldPosition(tipWorldPos)
  trail.current.push(tipWorldPos.clone())
  ```

```Javascript
//Jerarquía de grupos articulados
<group ref={baseRef} position={[0, 0, 0]}>
  <mesh ... />
  <group ref={joint1Ref} position={[4, 0, 0]}>
    <mesh ... />
    <group ref={joint2Ref} position={[4, 0, 0]}>
      <mesh ref={tipRef} ... />
    </group>
  </group>
</group>
```


## 📊 Resultados Visuales

### Threejs
```
![Vite-React-TS-Google-Chrome](https://github.com/user-attachments/assets/e2386dd1-6871-4012-89fb-c94f39a413ed)




```

## 💬 Reflexión Final

En este taller se aprendió a aplicar cinemática directa para animar estructuras jerárquicas, comprendiendo cómo las rotaciones locales se propagan en cadena y afectan la posición del extremo final. Utilicé controles interactivos y animación automática para ajustar ángulos en tiempo real, lo que facilitó la exploración del movimiento. La visualización de la trayectoria permitió verificar el comportamiento esperado y reforzó conceptos clave sobre transformaciones espaciales, jerarquía de objetos y control preciso en contextos como robótica y simulación.
