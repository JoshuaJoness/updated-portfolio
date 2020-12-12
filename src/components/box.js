import React, { useState, useRef } from "react"
import { useFrame } from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three'

export const Box = () => {
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
        castShadow
      >
        {/* <ambientLight intensity={0.5} />
        <spotLight position={[0, 5, 10]} penumbra={1} castShadow /> */}
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        {/* <Samurai /> */}
        <a.meshPhysicalMaterial attach="material" color={props.color} />
      </a.mesh>
    )
  }