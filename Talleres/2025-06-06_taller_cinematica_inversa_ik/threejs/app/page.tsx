"use client"

import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { IKWorkshop } from "@/components/ik-workshop"
import { useState } from "react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <main className="relative w-screen h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Panel de información y leyenda (superior derecha) */}
      <div className="absolute top-4 right-4 w-80 bg-black/40 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 p-4 space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white/90">Información y Leyenda</h2>
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/80">Instrucciones</h3>
              <p className="text-sm text-white/70">
                Arrastra la esfera roja para mover el brazo robótico. El algoritmo CCD ajustará automáticamente las articulaciones.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/80">Leyenda de Colores</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                  <span className="text-xs text-white/70">Segmento 1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <span className="text-xs text-white/70">Segmento 2</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
                  <span className="text-xs text-white/70">Segmento 3</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#06b6d4]" />
                  <span className="text-xs text-white/70">Segmento 4</span>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/80">Líneas de Referencia</h3>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="text-xs text-white/70">Base → Objetivo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400" />
                  <span className="text-xs text-white/70">Cadena del brazo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-xs text-white/70">End effector → Objetivo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de controles (superior izquierda) */}
      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 p-4">
        <h2 className="text-lg font-semibold text-white/90 mb-2">Controles</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 text-xs font-semibold text-white/90 bg-white/10 rounded">Click + Arrastrar</kbd>
            <span className="text-sm text-white/70">Mover objetivo</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 text-xs font-semibold text-white/90 bg-white/10 rounded">Rueda</kbd>
            <span className="text-sm text-white/70">Zoom</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 text-xs font-semibold text-white/90 bg-white/10 rounded">Click Derecho + Arrastrar</kbd>
            <span className="text-sm text-white/70">Rotar cámara</span>
          </div>
        </div>
      </div>

      {/* Título simplificado (inferior derecha) */}
      <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 p-3">
        <p className="text-sm text-white/70">
          Taller de Cinemática Inversa: Simulación de un brazo robótico controlado mediante el algoritmo CCD
        </p>
      </div>

      {/* Canvas de Three.js */}
      <Canvas
        shadows
        camera={{ position: [0, 2, 8], fov: 50 }}
        onCreated={() => setIsLoading(false)}
      >
        <Environment preset="city" />
        <IKWorkshop />
      </Canvas>

      {/* Overlay de carga */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-white/90 text-lg">Cargando escena...</p>
          </div>
        </div>
      )}
    </main>
  )
}
