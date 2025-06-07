"use client"

import { useGLTF } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef, useMemo, useEffect } from "react"
import { type Group, LOD, Mesh, type Material, MeshStandardMaterial } from "three"

interface OptimizationProps {
  optimizations: {
    lod: boolean
    shadows: boolean
    lighting: boolean
    frustumCulling: boolean
    materials: boolean
  }
}

export function OptimizedBurguer({ optimizations }: OptimizationProps) {
  const groupRef = useRef<Group>(null)
  const { camera } = useThree()

  // Cargar el modelo GLB
  const { scene: BurguerScene } = useGLTF("/models/Burguer.glb")

  // Clonar y optimizar el modelo
  const optimizedBurguer = useMemo(() => {
    const clonedScene = BurguerScene.clone()

    // Almacenar los materiales originales para reutilizarlos
    const originalMaterials = new Map<Mesh, Material | Material[]>()

    clonedScene.traverse((child) => {
      if (child instanceof Mesh) {
        // Guardar el material original
        originalMaterials.set(child, child.material)

        // Configurar sombras
        child.castShadow = optimizations.shadows
        child.receiveShadow = optimizations.shadows

        // Configurar frustum culling
        child.frustumCulled = optimizations.frustumCulling

        // Preservar materiales originales
        if (optimizations.materials && child.material instanceof MeshStandardMaterial) {
          child.material = child.material.clone()
          child.material.needsUpdate = true
        }
      }
    })

    return { scene: clonedScene, originalMaterials }
  }, [BurguerScene, optimizations.shadows, optimizations.frustumCulling, optimizations.materials])

  // Sistema LOD (Level of Detail) mejorado
  const lodSystem = useMemo(() => {
    if (!optimizations.lod) return null

    const lod = new LOD()

    // Versión detallada (cerca) - Material completo con texturas originales
    const detailedBurguer = optimizedBurguer.scene.clone()
    detailedBurguer.traverse((child) => {
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
        child.material = child.material.clone()
        child.material.needsUpdate = true
      }
    })
    lod.addLevel(detailedBurguer, 0)

    // Versión media distancia - Mantener estructura pero simplificar algunos materiales
    const mediumBurguer = optimizedBurguer.scene.clone()
    mediumBurguer.traverse((child) => {
      if (child instanceof Mesh) {
        // Reducir calidad de sombras en media distancia
        if (optimizations.shadows) {
          child.castShadow = false
          child.receiveShadow = true
        }

        // Mantener materiales pero con menor calidad
        if (child.material instanceof MeshStandardMaterial) {
          const material = child.material.clone()
          material.roughness = Math.min(material.roughness + 0.2, 1)
          material.metalness = Math.max(material.metalness - 0.2, 0)
          child.material = material
          child.material.needsUpdate = true
        }
      }
    })
    lod.addLevel(mediumBurguer, 8)

    // Versión lejana - Mantener todos los objetos pero con materiales más simples
    const farBurguer = optimizedBurguer.scene.clone()
    farBurguer.traverse((child) => {
      if (child instanceof Mesh) {
        // Desactivar sombras completamente en la distancia
        child.castShadow = false
        child.receiveShadow = false

        // Simplificar material pero mantener color original
        if (child.material instanceof MeshStandardMaterial) {
          const material = child.material.clone()
          material.color = child.material.color.clone()
          material.roughness = 1
          material.metalness = 0
          material.flatShading = true
          child.material = material
          child.material.needsUpdate = true
        }
      }
    })
    lod.addLevel(farBurguer, 15)

    return lod
  }, [optimizedBurguer, optimizations.lod, optimizations.shadows])

  // Actualizar LOD basado en distancia de cámara
  useFrame(() => {
    if (lodSystem && groupRef.current) {
      lodSystem.update(camera)
    }
  })

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.clear()

      if (lodSystem && optimizations.lod) {
        groupRef.current.add(lodSystem)
      } else {
        groupRef.current.add(optimizedBurguer.scene)
      }
    }
  }, [lodSystem, optimizedBurguer.scene, optimizations.lod])

  return <group ref={groupRef} position={[0, 0, 0]} scale={[1, 1, 1]} />
}

// Precargar el modelo
useGLTF.preload("/models/Burguer.glb")
