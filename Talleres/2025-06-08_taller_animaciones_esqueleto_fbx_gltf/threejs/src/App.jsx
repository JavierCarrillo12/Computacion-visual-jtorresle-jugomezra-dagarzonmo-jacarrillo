import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Grid, Environment } from '@react-three/drei';

function Model({ url, currentAnimation, isPlaying }) {
  const { scene, animations } = useGLTF(url);
  const { actions, names, mixer } = useAnimations(animations, scene);

  // Información de depuración detallada
  useEffect(() => {
    console.log('=== Información del Modelo ===');
    console.log('URL del modelo:', url);
    console.log('Animaciones cargadas:', animations);
    console.log('Nombres de animaciones:', names);
    console.log('Acciones disponibles:', actions);
    console.log('Escena:', scene);
  }, [url, animations, names, actions, scene]);

  useEffect(() => {
    if (mixer) {
      // Detener todas las animaciones
      Object.values(actions).forEach(action => {
        action.stop();
      });

      // Si hay una animación seleccionada y está en modo reproducción
      if (currentAnimation && actions[currentAnimation] && isPlaying) {
        const action = actions[currentAnimation];
        action.reset();
        action.fadeIn(0.5);
        action.play();
      }
    }
  }, [currentAnimation, isPlaying, actions, mixer]);

  return (
    <primitive 
      object={scene} 
      scale={1} 
      position={[0, -0.5, 0]}
    />
  );
}

function Controls({ animations, currentAnimation, setCurrentAnimation, isPlaying, setIsPlaying }) {
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAnimationChange = (e) => {
    setCurrentAnimation(e.target.value);
  };

  return (
    <div style={{
      position: 'absolute',
      top: 10,
      left: 10,
      background: 'rgba(0,0,0,0.7)',
      padding: '20px',
      borderRadius: '10px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      minWidth: '200px'
    }}>
      <h3 style={{ margin: '0 0 15px 0' }}>Controles de Animación</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Animación:</label>
        <select 
          value={currentAnimation} 
          onChange={handleAnimationChange}
          style={{ 
            padding: '5px',
            width: '100%',
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #555',
            borderRadius: '5px'
          }}
        >
          <option value="">Seleccionar animación</option>
          {animations.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Estado:</label>
        <button
          onClick={handlePlayPause}
          style={{
            padding: '8px 15px',
            backgroundColor: isPlaying ? '#ff4444' : '#44ff44',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            transition: 'background-color 0.3s ease'
          }}
        >
          {isPlaying ? '⏸️ Pausar' : '▶️ Reproducir'}
        </button>
      </div>

      <div style={{ 
        marginTop: '10px', 
        padding: '10px', 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        borderRadius: '5px' 
      }}>
        <p style={{ margin: '0', fontSize: '0.9em' }}>
          Animación actual: <strong>{currentAnimation || 'Ninguna'}</strong>
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>
          Estado: <strong>{isPlaying ? 'Reproduciendo' : 'Pausado'}</strong>
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>
          Animaciones disponibles: <strong>{animations.length}</strong>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [currentAnimation, setCurrentAnimation] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const modelUrl = '/models/character.glb';

  // Obtener las animaciones del modelo
  const { animations } = useGLTF(modelUrl);
  const availableAnimations = animations ? animations.map(anim => anim.name) : [];

  // Información de depuración
  useEffect(() => {
    console.log('=== Estado de la Aplicación ===');
    console.log('URL del modelo:', modelUrl);
    console.log('Animaciones disponibles:', availableAnimations);
    console.log('Animación actual:', currentAnimation);
    console.log('Estado de reproducción:', isPlaying);
  }, [modelUrl, availableAnimations, currentAnimation, isPlaying]);

  // Seleccionar automáticamente la primera animación si está disponible y ninguna está seleccionada
  useEffect(() => {
    if (availableAnimations.length > 0 && !currentAnimation) {
      setCurrentAnimation(availableAnimations[0]);
    }
  }, [availableAnimations, currentAnimation]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a' }}>
      <Canvas 
        camera={{ position: [0, 2, 10], fov: 50 }}
        shadows
      >
        <color attach="background" args={['#1a1a1a']} />
        
        {/* Iluminación */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight 
          position={[-10, 10, -5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.5} 
          castShadow 
        />

        {/* Elementos de la escena */}
        <Grid 
          args={[20, 20]}
          position={[0, -0.01, 0]} 
          cellSize={1} 
          cellThickness={0.5} 
          cellColor="#404040" 
          sectionSize={3.3} 
          sectionThickness={1.5} 
          sectionColor="#808080" 
          fadeDistance={30} 
          fadeStrength={1} 
          followCamera={false} 
          infiniteGrid={true} 
        />

        <Suspense fallback={null}>
          <Model 
            url={modelUrl} 
            currentAnimation={currentAnimation}
            isPlaying={isPlaying}
          />
          <Environment preset="sunset" />
        </Suspense>

        <OrbitControls 
          makeDefault 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2} 
        />
      </Canvas>
      <Controls 
        animations={availableAnimations}
        currentAnimation={currentAnimation}
        setCurrentAnimation={setCurrentAnimation}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
} 