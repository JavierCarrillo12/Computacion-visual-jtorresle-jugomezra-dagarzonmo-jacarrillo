"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stats, Environment } from "@react-three/drei"
import { Suspense, useState } from "react"
import { OptimizedBurguer } from "@/components/OptimizedBurguer"
import { OptimizationControls } from "@/components/OptimizationControls"
import { LoadingFallback } from "@/components/LoadingFallback"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket } from "lucide-react"

export default function OptimizationWorkshop() {
  const [optimizations, setOptimizations] = useState({
    lod: true,
    shadows: false,
    lighting: true,
    frustumCulling: true,
    materials: true,
  })

  const [showStats, setShowStats] = useState(true)

  return (
    <div className="w-full h-screen relative bg-gray-900">
      {/* Info Panel */}
      <div className="absolute top-4 right-4 z-10">
        <Card className="w-80 bg-black/90 text-white border-gray-700 backdrop-blur-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5" />
              Taller 59 - Optimización Visual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {optimizations.lod && (
                <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">LOD (Level of Detail)</span>
                </div>
              )}
              {optimizations.lighting && (
                <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">Iluminación optimizada</span>
                </div>
              )}
              {optimizations.materials && (
                <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">Materiales preservados</span>
                </div>
              )}
              {optimizations.frustumCulling && (
                <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">Frustum Culling</span>
                </div>
              )}
              {!optimizations.shadows && (
                <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">Sombras desactivadas</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls Panel - Moved to bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <OptimizationControls
          optimizations={optimizations}
          setOptimizations={setOptimizations}
          showStats={showStats}
          setShowStats={setShowStats}
        />
      </div>

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [5, 3, 5], fov: 60 }}
        shadows={optimizations.shadows}
        gl={{
          antialias: true, // Mantener antialiasing para mejor calidad visual
          powerPreference: "high-performance",
        }}
      >
        {showStats && <Stats />}

        <Suspense fallback={<LoadingFallback />}>
          {/* Environment optimizado */}
          <Environment preset="apartment" />

          {/* Iluminación optimizada */}
          {optimizations.lighting ? (
            <>
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow={optimizations.shadows}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
            </>
          ) : (
            <>
              <ambientLight intensity={0.2} />
              <pointLight position={[2, 4, 2]} intensity={0.8} castShadow={optimizations.shadows} />
              <pointLight position={[-2, 4, -2]} intensity={0.6} castShadow={optimizations.shadows} />
              <spotLight position={[0, 6, 0]} intensity={1} castShadow={optimizations.shadows} />
            </>
          )}

          {/* Modelo de cocina optimizado */}
          <OptimizedBurguer optimizations={optimizations} />

          {/* Suelo para recibir sombras */}
          {optimizations.shadows && (
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#444444" />
            </mesh>
          )}
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={15}
        />
      </Canvas>
    </div>
  )
}
