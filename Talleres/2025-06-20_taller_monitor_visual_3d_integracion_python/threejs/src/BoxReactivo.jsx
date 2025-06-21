import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default function BoxReactivo({ setNPersonas }) {
  const ref = useRef()
  const [n, setN] = useState(0)
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    const intervalo = setInterval(() => {
      fetch("http://localhost:3001/datos.json")
        .then(res => res.json())
        .then(data => {
          if (data.n_personas !== n) {
            setColor(getRandomColor())       // cambia color al cambiar n_personas
            setN(data.n_personas)
            setNPersonas(data.n_personas)
          }
        })
        .catch(() => {})
    }, 100)
    return () => clearInterval(intervalo)
  }, [n, setNPersonas])

  useFrame(() => {
    if (ref.current) {
      const scale = 1 + n * 0.3
      ref.current.scale.set(scale, scale, scale)
      ref.current.material.color.set(color)
    }
  })

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial />
    </mesh>
  )
}
