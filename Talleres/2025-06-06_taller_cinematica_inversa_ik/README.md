# 🧪 Taller - Cinemática Inversa: Haciendo que el Modelo Persiga Objetivos

## 📅 Fecha
`2025-06-06` - Fecha de realización

---

## 🎯 Objetivo del Taller
Aplicar cinemática inversa (IK) utilizando el algoritmo de Descenso Coordinado Cíclico (CCD) para permitir que un brazo articulado 3D alcance dinámicamente una esfera objetivo arrastrable en un entorno de Three.js y React Three Fiber. Este ejercicio demuestra cómo una cadena de articulaciones se ajusta automáticamente para alcanzar una posición deseada.

---

## 🧠 Conceptos Aprendidos
- [x] Cinemática Inversa (IK) y Cinemática Directa (FK)
- [x] Algoritmo de Descenso Coordinado Cíclico (CCD)
- [x] Estructura jerárquica de brazo 3D usando `<group>` en Three.js
- [x] Interacción en tiempo real con un objetivo arrastrable
- [x] Visualización del movimiento del brazo, alcance y métricas
- [x] Manejo robusto de geometría para evitar errores como "Invalid typed array length"

## 📖 Conceptos Clave

### ¿Qué es la Cinemática Inversa?
La Cinemática Inversa (IK) es una técnica utilizada para calcular los ángulos de las articulaciones necesarios para que una cadena de segmentos (por ejemplo, un brazo robótico) alcance una posición objetivo específica. A diferencia de la Cinemática Directa (FK), donde los ángulos de las articulaciones definen la posición final, la IK trabaja hacia atrás desde el objetivo para determinar las configuraciones necesarias de las articulaciones.

### Descenso Coordinado Cíclico (CCD)
CCD es un algoritmo iterativo de IK que ajusta cada articulación una a una, comenzando desde el efector final hacia la base. Para cada articulación:
- Calcula vectores desde la articulación al efector final actual y al objetivo.
- Calcula el ángulo necesario para alinear el segmento hacia el objetivo usando el producto punto.
- Aplica una rotación restringida para evitar movimientos bruscos.
- Repite hasta que el efector final esté lo suficientemente cerca del objetivo o se alcance un número máximo de iteraciones.

### Implementación del Proyecto
Este proyecto utiliza el algoritmo CCD para controlar un brazo de 4 segmentos en una escena 3D. El brazo ajusta sus ángulos de articulación para alcanzar una esfera roja, que puede ser arrastrada usando el ratón. La retroalimentación visual incluye:
- Líneas que muestran la estructura del brazo, distancia base-objetivo y distancia efector final-objetivo.
- Un círculo que indica el alcance máximo.
- Métricas en tiempo real (distancia al objetivo, conteo de iteraciones, estado de alcance).

---

## 🔧 Herramientas y Entorno
- **Entorno**: Next.js con React Three Fiber y Three.js
- **Herramientas**: `@react-three/fiber`, `@react-three/drei`, `three`, `tailwindcss`
- **Lenguaje**: TypeScript/JavaScript

---

## 📁 Estructura del Proyecto
```
2025-06-06_taller_cinematica_inversa_ik/
├── threejs/
│   ├── components/
│   │   ├── arm-segment.tsx
│   │   ├── draggable-target.tsx
│   │   ├── ik-arm-system.tsx
│   │   ├── ik-workshop.tsx
│   │   ├── theme-provider.tsx
│   ├── lib/
│   │   ├── ik-solver.ts
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
├── README.md
```

---

## 🧪 Implementación

### 🔹 Pasos Realizados
1. **Configuración del Entorno**: Configurado un proyecto Next.js con React Three Fiber y Tailwind CSS.
2. **Creación de la Escena**: Añadido un plano base, una base cilíndrica y un brazo de 4 segmentos con segmentos y articulaciones coloreados.
3. **Jerarquía del Brazo**: Organizado los segmentos en una estructura jerárquica usando elementos `<group>`, donde la posición y rotación de cada segmento dependen del anterior.
4. **Solver CCD**: Implementado el algoritmo CCD para ajustar los ángulos de las articulaciones iterativamente, asegurando que el efector final se acerque al objetivo.
5. **Objetivo Arrastrable**: Creada una esfera roja que puede ser arrastrada usando raycasting e intersección de plano, con controles de cámara deshabilitados durante el arrastre.
6. **Visualización**:
   - Añadidos componentes `SimpleLine` y `SimpleCircle` para mostrar conexiones (base-objetivo, cadena del brazo, efector final-objetivo) y el círculo de alcance máximo.
   - Mostradas métricas (distancia, iteraciones, alcance) usando componentes `<Text>`.
7. **Manejo de Errores**: Reemplazados componentes `<Line>` problemáticos con geometrías de caja personalizadas para evitar errores "Invalid typed array length".
8. **Interactividad**: Añadidos efectos hover, colores dinámicos y un indicador de arrastre para mejor experiencia de usuario.

### 🔹 Diagrama de Jerarquía del Brazo
```
Base (cilindro)
└── Segmento 0 (longitud: 2.0, color: naranja)
    ├── Articulación 0 (esfera)
    └── Segmento 1 (longitud: 1.8, color: rojo)
        ├── Articulación 1 (esfera)
        └── Segmento 2 (longitud: 1.5, color: púrpura)
            ├── Articulación 2 (esfera)
            └── Segmento 3 (longitud: 1.2, color: cian)
                ├── Articulación 3 (esfera)
                └── Efector Final (esfera, verde/rojo según alcance)
```
*Nota*: La esfera objetivo (roja) es independiente y arrastrable en el plano XY.

---

## 💬 Reflexión Final
- **¿Qué aprendí o reforcé?**  
  Profundicé mi comprensión de la cinemática inversa, particularmente el algoritmo CCD, y cómo implementarlo en un entorno 3D usando React Three Fiber. También aprendí a manejar interacciones de usuario en tiempo real y visualizar sistemas dinámicos de manera robusta con un manejo adecuado de errores.

- **¿Cuál fue la parte más compleja o interesante?**  
  La parte más compleja fue abordar el error "Invalid typed array length" causado por el componente `<Line>`. Reemplazarlo con geometrías de caja personalizadas (`SimpleLine`, `SimpleCircle`) fue tanto desafiante como interesante, ya que requería una validación cuidadosa de vectores y longitudes para asegurar la estabilidad. El aspecto más interesante fue ver el brazo ajustarse dinámicamente al objetivo en tiempo real, con una retroalimentación visual clara sobre el alcance.

- **Desafíos y Soluciones**  
  - **Desafío**: El componente `<Line>` inicial causaba errores con longitudes de array inválidas.  
    **Solución**: Creé componentes personalizados `SimpleLine` y `SimpleCircle` usando `boxGeometry` con validación robusta.  
  - **Desafío**: Los controles de cámara interferían con el arrastre del objetivo.  
    **Solución**: Deshabilité `OrbitControls` durante el arrastre y añadí retroalimentación visual (por ejemplo, cambios de cursor, anillo amarillo).  
  - **Desafío**: Asegurar un movimiento suave del brazo sin oscilaciones.  
    **Solución**: Añadí normalización de ángulos y límites de rotación en el solver CCD.

---

## ✅ Lista de Entrega
- [x] Carpeta `2025-06-06_taller_cinematica_inversa_ik`
- [x] Estructura jerárquica de brazo con 4 segmentos
- [x] Solver CCD funcional
- [x] Objetivo arrastrable en tiempo real con interacción suave
- [x] Visualización clara (líneas, círculo, métricas)
- [x] Código modular y documentado
- [x] README con explicación, diagrama, código, prompts y reflexión
- [x] Commits descriptivos en español (por ejemplo, "Añadir solver CCD", "Corregir errores de geometría de línea")
