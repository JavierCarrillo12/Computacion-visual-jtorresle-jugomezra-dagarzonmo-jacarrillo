# 🔊 Sonidos para AR.js

Esta carpeta contiene archivos de audio que pueden ser utilizados en la experiencia de realidad aumentada.

## 🎵 Archivos de Audio Incluidos

### hover.mp3 (Opcional)
- Sonido de hover/interacción
- Reproducido al hacer clic en modelos 3D
- Duración recomendada: 0.5-2 segundos

### detection.mp3 (Opcional)
- Sonido de detección de marcador
- Reproducido cuando se detecta el marcador HIRO
- Duración recomendada: 1-3 segundos

## 📋 Formatos Soportados

A-Frame soporta los siguientes formatos de audio:

- **MP3**: Formato más compatible (recomendado)
- **OGG**: Formato libre, buena compresión
- **WAV**: Sin compresión, archivos grandes
- **AAC**: Formato de Apple, buena calidad

## 🛠️ Cómo Añadir Sonidos Personalizados

### 1. Preparar el Audio
```bash
# Convertir formatos (si es necesario)
# Usar herramientas como Audacity, FFmpeg, o convertidores online
```

### 2. Optimizar el Audio
- **Tamaño**: Mantener archivos < 1MB para carga rápida
- **Duración**: Sonidos cortos (0.5-3 segundos)
- **Calidad**: 44.1kHz, 128-192kbps para MP3
- **Formato**: MP3 para máxima compatibilidad

### 3. Integrar en el Código
```html
<!-- Definir sonidos en assets -->
<a-assets>
    <audio id="mi-sonido" src="sounds/mi-sonido.mp3" preload="auto"></audio>
</a-assets>

<!-- Usar sonido en entidad -->
<a-entity sound="src: #mi-sonido; on: click"></a-entity>
```

## 🎨 Propiedades de Audio

### Configuración Básica
```javascript
// Sonido simple
sound="src: #mi-sonido"

// Sonido con evento específico
sound="src: #mi-sonido; on: click"

// Sonido con volumen
sound="src: #mi-sonido; volume: 0.5"
```

### Configuración Avanzada
```javascript
// Sonido con múltiples eventos
sound="src: #mi-sonido; on: click, mouseenter"

// Sonido con distancia
sound="src: #mi-sonido; distanceModel: linear; refDistance: 1; maxDistance: 10"

// Sonido posicional
sound="src: #mi-sonido; positional: true"
```

### Eventos Disponibles
- `click`: Al hacer clic
- `mouseenter`: Al entrar el mouse
- `mouseleave`: Al salir el mouse
- `markerFound`: Al detectar marcador
- `markerLost`: Al perder marcador
- `animationstart`: Al iniciar animación
- `animationend`: Al terminar animación

## 🔧 Herramientas Recomendadas

### Software de Audio
- **Audacity**: Gratuito, potente, multiplataforma
- **GarageBand**: Mac, fácil de usar
- **Adobe Audition**: Profesional, amplias capacidades
- **Reaper**: Profesional, asequible

### Convertidores Online
- **Online Audio Converter**: https://online-audio-converter.com/
- **Convertio**: https://convertio.co/audio-converter/
- **CloudConvert**: https://cloudconvert.com/audio-converter

### Editores Web
- **AudioMass**: https://audiomass.co/
- **TwistedWave**: https://twistedwave.com/online

## 📊 Mejores Prácticas

### Rendimiento
- ✅ Usar formatos comprimidos (MP3, OGG)
- ✅ Mantener archivos pequeños (< 1MB)
- ✅ Preload para sonidos importantes
- ✅ Lazy loading para sonidos grandes

### Experiencia de Usuario
- ✅ Sonidos cortos y relevantes
- ✅ Volumen apropiado (no muy alto)
- ✅ Feedback inmediato
- ✅ Opción de silenciar

### Accesibilidad
- ✅ No depender solo del audio
- ✅ Proporcionar alternativas visuales
- ✅ Considerar usuarios con discapacidad auditiva
- ✅ Controles de volumen accesibles

## 🎯 Ejemplos de Uso

### Sonido de Interacción
```html
<a-entity gltf-model="models/robot.glb"
          sound="src: #robot-sound; on: click"
          class="clickable">
</a-entity>
```

### Sonido de Detección
```html
<a-marker preset="hiro" id="hiro-marker">
    <a-entity sound="src: #detection-sound; on: markerFound">
    </a-entity>
</a-marker>
```

### Sonido Ambiental
```html
<a-entity sound="src: #ambient-sound; loop: true; volume: 0.3">
</a-entity>
```

### Sonido Posicional
```html
<a-entity gltf-model="models/coche.glb"
          sound="src: #engine-sound; positional: true; distanceModel: linear; refDistance: 1; maxDistance: 10">
</a-entity>
```

## 🎵 Tipos de Sonidos Útiles

### Feedback de Interacción
- Clics y botones
- Hover effects
- Confirmaciones
- Errores

### Ambientales
- Música de fondo
- Efectos atmosféricos
- Sonidos de entorno
- Transiciones

### Narrativos
- Instrucciones de voz
- Explicaciones
- Storytelling
- Guías interactivas

### Efectos Especiales
- Explosiones
- Transformaciones
- Apariciones
- Desapariciones

## 🚀 Recursos Adicionales

- [A-Frame Sound Component](https://aframe.io/docs/1.3.0/components/sound.html)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Audio Optimization Guide](https://developers.google.com/web/fundamentals/media/audio)
- [Free Sound Effects](https://freesound.org/)

## 📝 Notas Importantes

### Compatibilidad
- Algunos navegadores requieren interacción del usuario para reproducir audio
- iOS Safari tiene restricciones especiales para audio automático
- Considerar fallbacks para navegadores sin soporte de audio

### Licencias
- Verificar licencias de uso para sonidos
- Usar recursos libres de derechos cuando sea posible
- Atribuir correctamente a los creadores

### Testing
- Probar en múltiples dispositivos
- Verificar funcionamiento con diferentes navegadores
- Comprobar calidad de audio en diferentes entornos

---

*Los sonidos pueden mejorar significativamente la inmersión de una experiencia de realidad aumentada, pero deben usarse de manera responsable y accesible.* 