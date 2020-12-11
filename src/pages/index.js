import React, { useState, useRef } from "react"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, useFrame, extend, useThree } from 'react-three-fiber'
import { Stars } from 'drei'
import { useSpring, a } from 'react-spring/three'
import './style.css'

extend({ OrbitControls })

const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

  useFrame(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls autoRotate /* maxPolarAngle={Math.PI / 3} minPolarAngle={Math.PI / 3} */ args={[camera, gl.domElement]} ref={orbitRef} />
  )
}

const Box = () => {
  const meshRef = useRef()
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const props = useSpring({
    scale: hover ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: active ? "grey" : "hotpink"
  })
  // useFrame(() => {
  //   meshRef.current.rotation.y += 0.01
  //   meshRef.current.rotation.x += 0.01
  // })

  setTimeout(() => {
    setActive(!active)
  }, 750)

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
      {/* <OrbitControls /> */}
      <Controls />
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Box />
  </Canvas>
  )

}
