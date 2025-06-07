"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RotateCcw, Activity } from "lucide-react"

interface OptimizationControlsProps {
  optimizations: {
    lod: boolean
    shadows: boolean
    lighting: boolean
    frustumCulling: boolean
    materials: boolean
  }
  setOptimizations: (optimizations: any) => void
  showStats: boolean
  setShowStats: (show: boolean) => void
}

export function OptimizationControls({
  optimizations,
  setOptimizations,
  showStats,
  setShowStats,
}: OptimizationControlsProps) {
  const handleOptimizationChange = (key: string, value: boolean) => {
    setOptimizations((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const resetToDefault = () => {
    setOptimizations({
      lod: true,
      shadows: false,
      lighting: true,
      frustumCulling: true,
      materials: true,
    })
  }

  return (
    <Card className="w-96 bg-black/90 text-white border-gray-700 backdrop-blur-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-center gap-2">
          <Activity className="w-5 h-5" />
          Controles de Rendimiento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Controles principales */}
        <div className="grid grid-cols-2 gap-3">
          {/* LOD Control */}
          <div className="flex items-center justify-between bg-gray-800/50 p-2 rounded-lg">
            <Label htmlFor="lod" className="text-sm">
              🔍 LOD
            </Label>
            <Switch
              id="lod"
              checked={optimizations.lod}
              onCheckedChange={(checked) => handleOptimizationChange("lod", checked)}
            />
          </div>

          {/* Shadows Control */}
          <div className="flex items-center justify-between bg-gray-800/50 p-2 rounded-lg">
            <Label htmlFor="shadows" className="text-sm">
              🌑 Sombras
            </Label>
            <Switch
              id="shadows"
              checked={optimizations.shadows}
              onCheckedChange={(checked) => handleOptimizationChange("shadows", checked)}
            />
          </div>

          {/* Lighting Control */}
          <div className="flex items-center justify-between bg-gray-800/50 p-2 rounded-lg">
            <Label htmlFor="lighting" className="text-sm">
              💡 Iluminación
            </Label>
            <Switch
              id="lighting"
              checked={optimizations.lighting}
              onCheckedChange={(checked) => handleOptimizationChange("lighting", checked)}
            />
          </div>

          {/* Stats Control */}
          <div className="flex items-center justify-between bg-gray-800/50 p-2 rounded-lg">
            <Label htmlFor="stats" className="text-sm flex items-center gap-1">
              📊 FPS Stats
            </Label>
            <Switch id="stats" checked={showStats} onCheckedChange={setShowStats} />
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center pt-2">
          <Button 
            onClick={resetToDefault} 
            variant="outline" 
            className="w-full bg-gray-800/50 hover:bg-gray-700/50 border-gray-600"
            size="sm"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restablecer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
