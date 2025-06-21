# 🔧 Guía de Solución de Problemas - AR.js Taller

## 🚨 Problemas Comunes y Soluciones

### 📱 Problemas de Cámara

#### ❌ Error: "No se puede acceder a la cámara"
**Síntomas:**
- Mensaje de error en la consola
- Pantalla negra o gris
- No aparece el feed de la cámara

**Soluciones:**
1. **Verificar permisos del navegador:**
   ```javascript
   // Verificar si la cámara está disponible
   navigator.mediaDevices.getUserMedia({ video: true })
     .then(stream => console.log('Cámara disponible'))
     .catch(err => console.error('Error de cámara:', err));
   ```

2. **Usar HTTPS:**
   - AR.js requiere HTTPS en producción
   - Para desarrollo local, usar `localhost` o servidor HTTPS

3. **Verificar navegador:**
   - Chrome 60+
   - Firefox 55+
   - Safari 11+
   - Edge 79+

4. **Reiniciar navegador:**
   - Cerrar completamente el navegador
   - Limpiar caché y cookies
   - Volver a abrir

#### ❌ Error: "getUserMedia is not supported"
**Síntomas:**
- Error en consola sobre getUserMedia
- No funciona en navegadores antiguos

**Soluciones:**
1. **Actualizar navegador**
2. **Usar polyfill:**
   ```html
   <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
   ```

### 🎯 Problemas de Detección de Marcadores

#### ❌ No detecta el marcador HIRO
**Síntomas:**
- La cámara funciona pero no aparece el modelo 3D
- No hay feedback visual de detección

**Soluciones:**
1. **Verificar el marcador:**
   - Usar el marcador HIRO oficial
   - Imprimir en alta calidad
   - Tamaño mínimo: 5cm x 5cm

2. **Condiciones de iluminación:**
   - Buena iluminación (no muy brillante ni muy oscura)
   - Evitar sombras sobre el marcador
   - No usar luz directa que cause reflejos

3. **Distancia y ángulo:**
   - Distancia óptima: 20-80cm
   - Ángulo: no muy inclinado
   - Marcador completamente visible

4. **Verificar configuración:**
   ```html
   <a-marker preset="hiro" 
             emitevents="true"
             id="hiro-marker">
   ```

#### ❌ Detección inestable
**Síntomas:**
- El modelo aparece y desaparece
- Movimiento brusco del modelo 3D

**Soluciones:**
1. **Mejorar estabilidad del marcador:**
   - Fijar el marcador a una superficie plana
   - Evitar movimiento excesivo
   - Usar marcador más grande

2. **Optimizar configuración:**
   ```html
   <a-scene arjs="detectionMode: mono_and_matrix; 
                  matrixCodeType: 3x3;
                  sourceWidth: 1280;
                  sourceHeight: 960;">
   ```

3. **Reducir complejidad:**
   - Menos objetos 3D
   - Animaciones más simples
   - Modelos más ligeros

### 🎮 Problemas de Interacción

#### ❌ No responde a clics
**Síntomas:**
- Los objetos 3D no reaccionan al clic
- No se activan eventos

**Soluciones:**
1. **Verificar configuración de raycaster:**
   ```html
   <a-marker cursor="rayOrigin: mouse"
             raycaster="objects: .clickable">
     <a-box class="clickable"></a-box>
   </a-marker>
   ```

2. **Añadir clase clickable:**
   ```html
   <a-entity class="clickable" 
             gltf-model="models/robot.glb">
   </a-entity>
   ```

3. **Verificar eventos:**
   ```javascript
   element.addEventListener('click', function() {
       console.log('Elemento clickeado');
   });
   ```

#### ❌ Interacciones lentas
**Síntomas:**
- Retraso entre clic y respuesta
- Animaciones lentas

**Soluciones:**
1. **Optimizar rendimiento:**
   - Reducir complejidad de modelos
   - Usar menos polígonos
   - Comprimir texturas

2. **Usar requestAnimationFrame:**
   ```javascript
   function animate() {
       requestAnimationFrame(animate);
       // Lógica de animación
   }
   ```

### 🔊 Problemas de Audio

#### ❌ No se reproduce el sonido
**Síntomas:**
- Los sonidos no se escuchan
- Error en consola sobre audio

**Soluciones:**
1. **Verificar interacción del usuario:**
   ```javascript
   // Los navegadores requieren interacción del usuario
   document.addEventListener('click', function() {
       audio.play().catch(e => console.log('Audio error:', e));
   });
   ```

2. **Verificar formato de audio:**
   - Usar MP3 o OGG
   - Verificar que el archivo existe
   - Tamaño < 1MB

3. **Configuración correcta:**
   ```html
   <a-assets>
       <audio id="mi-sonido" src="sounds/sonido.mp3" preload="auto"></audio>
   </a-assets>
   
   <a-entity sound="src: #mi-sonido; on: click"></a-entity>
   ```

### 📊 Problemas de Rendimiento

#### ❌ FPS bajo
**Síntomas:**
- Animaciones lentas
- Interacciones con retraso
- Consumo alto de CPU

**Soluciones:**
1. **Optimizar modelos 3D:**
   - Reducir número de polígonos
   - Usar LOD (Level of Detail)
   - Comprimir texturas

2. **Limitar objetos:**
   - Máximo 10-20 objetos por escena
   - Usar instancing para objetos repetidos
   - Cull objetos fuera de vista

3. **Optimizar animaciones:**
   ```javascript
   // Usar transform3d para hardware acceleration
   element.style.transform = 'translate3d(0,0,0)';
   ```

#### ❌ Consumo alto de memoria
**Síntomas:**
- Navegador lento
- Crashes en dispositivos móviles

**Soluciones:**
1. **Lazy loading:**
   ```javascript
   // Cargar modelos solo cuando se necesiten
   if (markerDetected) {
       loadModel('models/robot.glb');
   }
   ```

2. **Limpiar recursos:**
   ```javascript
   // Limpiar geometrías no utilizadas
   geometry.dispose();
   material.dispose();
   texture.dispose();
   ```

### 🌐 Problemas de Navegador

#### ❌ No funciona en móvil
**Síntomas:**
- Funciona en desktop pero no en móvil
- Errores específicos de móvil

**Soluciones:**
1. **Verificar compatibilidad:**
   - iOS 11+ para Safari
   - Android 7+ para Chrome
   - Verificar WebGL support

2. **Optimizar para móvil:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
   ```

3. **Reducir calidad en móvil:**
   ```javascript
   if (isMobile) {
       // Usar configuraciones más ligeras
       arjsConfig.sourceWidth = 640;
       arjsConfig.sourceHeight = 480;
   }
   ```

#### ❌ Problemas de orientación
**Síntomas:**
- La cámara se ve al revés
- Orientación incorrecta

**Soluciones:**
1. **Configurar orientación:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
   <meta name="apple-mobile-web-app-capable" content="yes">
   ```

2. **Manejar cambios de orientación:**
   ```javascript
   window.addEventListener('orientationchange', function() {
       // Reconfigurar cámara
       setTimeout(() => {
           location.reload();
       }, 1000);
   });
   ```

### 🔧 Problemas de Desarrollo

#### ❌ No carga el proyecto
**Síntomas:**
- Página en blanco
- Errores 404
- No se cargan las librerías

**Soluciones:**
1. **Verificar estructura de archivos:**
   ```
   proyecto/
   ├── index.html
   ├── models/
   ├── markers/
   └── sounds/
   ```

2. **Usar servidor local:**
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve . -p 8000
   
   # PHP
   php -S localhost:8000
   ```

3. **Verificar rutas:**
   - Usar rutas relativas
   - Verificar que los archivos existen
   - Comprobar permisos de archivos

#### ❌ Errores de CORS
**Síntomas:**
- Errores en consola sobre CORS
- No se cargan recursos externos

**Soluciones:**
1. **Usar servidor local:**
   - No abrir archivos directamente
   - Usar `http://localhost:8000`

2. **Configurar CORS en servidor:**
   ```javascript
   // Para desarrollo
   res.setHeader('Access-Control-Allow-Origin', '*');
   ```

## 🛠️ Herramientas de Debug

### Console Debugging
```javascript
// Verificar si AR.js está cargado
console.log('AR.js version:', AFRAME.version);

// Verificar marcadores
const markers = document.querySelectorAll('a-marker');
console.log('Marcadores encontrados:', markers.length);

// Verificar cámara
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => console.log('Cámara OK'))
  .catch(err => console.error('Error cámara:', err));
```

### Visual Debugging
```html
<!-- Activar debug UI -->
<a-scene arjs="debugUIEnabled: true">
```

### Performance Monitoring
```javascript
// Monitorear FPS
let frameCount = 0;
let lastTime = performance.now();

function updateFPS() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        console.log('FPS:', fps);
        frameCount = 0;
        lastTime = currentTime;
    }
    
    requestAnimationFrame(updateFPS);
}

updateFPS();
```

## 📞 Soporte Adicional

### Recursos Útiles
- [AR.js Issues](https://github.com/AR-js-org/AR.js/issues)
- [A-Frame Documentation](https://aframe.io/docs/)
- [Three.js Examples](https://threejs.org/examples/)

### Comunidad
- [AR.js Discord](https://discord.gg/ar-js)
- [A-Frame Slack](https://aframevr-slack.herokuapp.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/ar.js)

---

*Si el problema persiste después de intentar estas soluciones, considera crear un issue en el repositorio del proyecto con información detallada sobre el error, navegador, dispositivo y pasos para reproducir el problema.* 