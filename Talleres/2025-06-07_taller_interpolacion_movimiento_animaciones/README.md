# 🧪 Taller - Interpolación de Movimiento: Suavizando Animaciones en Tiempo Real

## 📅 Fecha
`2025-06-07` – Fecha de realización

---

## 🎯 Objetivo del Taller

Este taller tiene como objetivo explorar e implementar diferentes técnicas de interpolación para crear animaciones suaves y naturales en objetos 3D, comparando el comportamiento y resultados de la interpolación lineal (LERP) y la interpolación Bézier.

---

## 🧠 Conceptos Aprendidos

- [x] Transformaciones geométricas (escala, rotación, traslación)
- [x] Interpolación lineal (LERP)
- [x] Curvas Bézier
- [x] Easing functions (Ease In/Out)
- [x] Quaterniones y SLERP
- [x] Animaciones en tiempo real

---

## 🔧 Herramientas y Entornos

- Three.js
- React Three Fiber
- TypeScript
- Leva (para controles)
- Tailwind CSS

---

## 📁 Estructura del Proyecto

```
2025-06-07_taller_interpolacion_movimiento_animaciones/
├── threejs/               # Implementación en Three.js
├── unity/                 # Implementación en Unity
├── README.md
```

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Implementación de interpolación LERP usando `THREE.Vector3.lerpVectors()`
2. Desarrollo de interpolación Bézier cuadrática personalizada
3. Integración de funciones de easing para suavizar el movimiento
4. Implementación de rotación suave usando `Quaternion.slerp()`
5. Visualización de trayectorias y controles de velocidad

### 🔹 Código relevante

```typescript
// Interpolación LERP
const lerpPosition = new THREE.Vector3().lerpVectors(startPoint, endPoint, t);

// Interpolación Bézier
const bezierPosition = new THREE.Vector3()
  .addVectors(
    startPoint.clone().multiplyScalar(Math.pow(1 - t, 2)),
    controlPoint.clone().multiplyScalar(2 * (1 - t) * t),
    endPoint.clone().multiplyScalar(Math.pow(t, 2))
  );

// Ease In/Out
const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
```

---

## 📊 Resultados Visuales

[GIFs pendientes de agregar]

> ✅ Este taller requiere explícitamente GIFs mostrando la comparación entre LERP y Bézier.

---

## 💬 Reflexión Final

La implementación de diferentes técnicas de interpolación nos permitió comprender profundamente cómo afectan al movimiento y la naturalidad de las animaciones. La interpolación Bézier resultó ser significativamente más natural que la interpolación lineal, especialmente cuando se combina con funciones de easing.

La parte más interesante fue la implementación de la curva Bézier y ver cómo el punto de control permite crear trayectorias más orgánicas. La combinación con quaterniones para la rotación añadió una capa adicional de complejidad pero también de realismo al movimiento.

Para futuros proyectos, sería interesante explorar curvas Bézier de mayor orden y diferentes funciones de easing para crear movimientos aún más complejos y naturales.

---

## 👥 Contribuciones Grupales

- Implementación de interpolación LERP y visualización de trayectoria
- Desarrollo de interpolación Bézier y sistema de control
- Integración de funciones de easing y rotación con quaterniones
- Documentación y pruebas de rendimiento

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-06-07_taller_interpolacion_movimiento_animaciones`
- [x] Código limpio y funcional
- [ ] GIF incluido con nombre descriptivo
- [x] Visualizaciones de trayectorias
- [x] README completo y claro
- [x] Commits descriptivos en inglés 