import React, { useState } from "react"
import { Canvas } from 'react-three-fiber'
import { OrbitControls, Stars } from 'drei'
import './style.css'

const Box = () => {
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState(false)

  return (
    <mesh 
      onPointerOver={() => setHover(true)} 
      onPointerOut={() => setHover(false)}
      onClick={() => setActive(!active)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshLambertMaterial attach="material" color={hover ? "grey" : "hotpink"} />
    </mesh>
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
