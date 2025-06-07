"use client"

import { Html, useProgress } from "@react-three/drei"
import { Menu } from "lucide-react"

export function LoadingFallback() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className="bg-black/90 text-white p-8 rounded-xl text-center backdrop-blur-lg border border-gray-700 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full"></div>
            <Menu className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Cargando Hamburguesa 3D
            </h3>
            <p className="text-sm text-gray-300">Optimizando modelo: {Math.round(progress)}%</p>
          </div>
          <div className="w-56 bg-gray-800/50 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-400 to-red-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Html>
  )
}
