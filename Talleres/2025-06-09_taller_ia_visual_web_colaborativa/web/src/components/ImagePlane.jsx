import React, { useState, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const ImagePlane = ({ file }) => {
  const [texture, setTexture] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [imageDimensions, setImageDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (file) {
      // Crear URL para la imagen
      const imageUrl = URL.createObjectURL(file);
      
      // Cargar la textura
      const loader = new TextureLoader();
      loader.load(imageUrl, (loadedTexture) => {
        setTexture(loadedTexture);
        
        // Calcular dimensiones reales de la imagen
        const img = new Image();
        img.onload = () => {
          const ratio = img.width / img.height;
          setAspectRatio(ratio);
          setImageDimensions({ width: img.width, height: img.height });
        };
        img.src = imageUrl;
      });

      // Limpiar URL al desmontar
      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  }, [file]);

  if (!texture) return null;

  // Calcular dimensiones del plano basado en aspect ratio
  const planeWidth = 8; // Ancho fijo del plano
  const planeHeight = planeWidth / aspectRatio;

  return (
    <group>
      {/* Plano principal con la imagen */}
      <mesh position={[0, 0, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Borde del plano para mejor visibilidad */}
      <mesh position={[0, 0, -0.11]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[planeWidth + 0.1, planeHeight + 0.1]} />
        <meshBasicMaterial 
          color="#333333" 
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

export default ImagePlane; 