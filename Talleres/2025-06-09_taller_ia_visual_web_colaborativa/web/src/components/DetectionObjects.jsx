import React from 'react';
import { Html } from '@react-three/drei';

const DetectionObjects = ({ detections, controls, selectedFile }) => {
  // Obtener color para clase
  const getColorForClass = (className) => {
    const colors = {
      'person': '#ff6b6b',
      'car': '#4ecdc4',
      'dog': '#45b7d1',
      'cat': '#96ceb4',
      'chair': '#feca57',
      'bottle': '#ff9ff3',
      'cup': '#54a0ff',
      'book': '#5f27cd',
      'laptop': '#00d2d3',
      'phone': '#ff9f43'
    };
    
    return colors[className.toLowerCase()] || '#6366f1';
  };

  // Convertir coordenadas de imagen a coordenadas 3D
  const convertImageTo3DCoords = (x, y, w, h, imageWidth = 800, imageHeight = 600) => {
    const planeWidth = 8; // Ancho del plano 3D
    const planeHeight = planeWidth * (imageHeight / imageWidth); // Alto del plano 3D
    
    // Normalizar coordenadas de imagen (0-1)
    const normalizedX = x / imageWidth;
    const normalizedY = y / imageHeight;
    const normalizedW = w / imageWidth;
    const normalizedH = h / imageHeight;
    
    // Convertir a coordenadas 3D
    const x3D = (normalizedX - 0.5) * planeWidth;
    const y3D = (0.5 - normalizedY) * planeHeight; // Invertir Y
    const w3D = normalizedW * planeWidth;
    const h3D = normalizedH * planeHeight;
    
    return { x: x3D, y: y3D, w: w3D, h: h3D };
  };

  // Obtener dimensiones de la imagen si está disponible
  const getImageDimensions = () => {
    if (selectedFile) {
      // Intentar obtener dimensiones reales de la imagen
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
        img.src = URL.createObjectURL(selectedFile);
      });
    }
    return Promise.resolve({ width: 800, height: 600 });
  };

  return detections.map((detection, index) => {
    const color = getColorForClass(detection.class);
    // Usar dimensiones por defecto por ahora, se puede mejorar con useEffect
    const coords3D = convertImageTo3DCoords(detection.x, detection.y, detection.w, detection.h);
    
    return (
      <group key={index}>
        {/* Bounding Box */}
        {controls.showBoundingBoxes && (
          <mesh
            position={[coords3D.x, coords3D.y, index * 0.1 + 0.05]}
          >
            <boxGeometry args={[coords3D.w, coords3D.h, 0.1]} />
            <meshLambertMaterial color={color} transparent opacity={0.7} />
          </mesh>
        )}
        
        {/* Etiqueta */}
        {controls.showLabels && (
          <Html
            position={[
              coords3D.x, 
              coords3D.y + coords3D.h / 2 + 0.3, 
              index * 0.1 + 0.1
            ]}
            center
          >
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(10px)',
              pointerEvents: 'none',
              border: `2px solid ${color}`,
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              minWidth: '80px',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                {detection.class}
              </div>
              {controls.showConfidence && (
                <div style={{ fontSize: '10px', opacity: 0.8 }}>
                  {(detection.confidence * 100).toFixed(1)}%
                </div>
              )}
            </div>
          </Html>
        )}
      </group>
    );
  });
};

export default DetectionObjects; 