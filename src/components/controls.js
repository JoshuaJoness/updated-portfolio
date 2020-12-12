import React, { useRef } from "react"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useThree, useFrame } from 'react-three-fiber'

extend({ OrbitControls })


export const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

  useFrame(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls 
      autoRotate 
      /* maxPolarAngle={Math.PI / 3} 
      minPolarAngle={Math.PI / 3} */ 
      args={[camera, gl.domElement]} 
      ref={orbitRef} 
    />
  )
}