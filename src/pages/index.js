import React, { useState, useRef } from "react"
import { Canvas, useFrame } from 'react-three-fiber'
import { OrbitControls, Stars } from 'drei'
import { useSpring, a } from 'react-spring/three'
import './style.css'

const Box = () => {
  const meshRef = useRef()
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const props = useSpring({
    scale: hover ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: active ? "grey" : "hotpink"
  })
  useFrame(() => {
    meshRef.current.rotation.y += 0.01
  })

  return (
    <a.mesh 
      ref={meshRef}
      onPointerOver={() => setHover(true)} 
      onPointerOut={() => setHover(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshBasicMaterial attach="material" color={props.color} />
    </a.mesh>
  )
}

export default function Home() {
  return (
    <Canvas>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Box />
  </Canvas>
  )

}
