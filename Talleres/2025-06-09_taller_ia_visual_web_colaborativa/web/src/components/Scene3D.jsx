import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import DetectionObjects from './DetectionObjects';
import ImagePlane from './ImagePlane';

const Scene3D = ({ detections, controls, selectedFile }) => {
  return (
    <div className="scene-container">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ background: '#1a1a1a' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
        <Grid args={[20, 20]} cellColor="#475569" sectionColor="#334155" />
        <OrbitControls enableDamping dampingFactor={0.05} />
        
        {/* Plano con la imagen */}
        {selectedFile && controls.showImage && (
          <ImagePlane file={selectedFile} />
        )}
        
        {/* Objetos de detección */}
        <DetectionObjects detections={detections} controls={controls} selectedFile={selectedFile} />
      </Canvas>
      <div className="scene-overlay">
        <div className="scene-info">
          <span>Objetos: {detections.length}</span>
          <span>FPS: 60</span>
        </div>
      </div>
    </div>
  );
};

export default Scene3D; 