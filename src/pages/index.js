import React, { useState, useRef, useEffect, Suspense } from "react"
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber'
import { useGLTF, OrbitControls, Stars, draco } from 'drei'
import { useSpring, a } from 'react-spring/three'
import './style.css'


const Samurai = () => {
  const gltf = useGLTF('/scene.gltf', true)
  return <primitive object={gltf.scene} dispose={null} />
}

// extend({ OrbitControls })

// const Samurai = () => {
//   const [model, setModel] = useState()

//   useEffect(() => {
//     new GLTFLoader().load('/scene.gltf', setModel)
//   })

//   return model ? <primitive object={model.scene} position={[0, -30, -300]} /> : null
// }

// const Controls = () => {
//   const orbitRef = useRef()
//   const { camera, gl } = useThree()

//   useFrame(() => {
//     orbitRef.current.update()
//   })

//   return (
//     <orbitControls 
//       autoRotate 
//       /* maxPolarAngle={Math.PI / 3} 
//       minPolarAngle={Math.PI / 3} */ 
//       args={[camera, gl.domElement]} 
//       ref={orbitRef} 
//     />
//   )
// }


const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <a.meshPhysicalMaterial attach="material" color="white" />
  </mesh>
)





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

export default function Home() {
  return (
    <> 
      <div style={{display:'flex', justifyContent:'space-between', position: 'absolute', top: 0, left: 0}}>
        <button style={{border:'none', margin: 20, background: 'none', fontSize: 39, height: 10}} onClick={() => console.log('testing...')}>PROJECTS</button>
        <button style={{border:'none', margin: 20, background: 'none', fontSize: 39, height: 10}} onClick={() => console.log('testing...')}>CONTACT</button>
      </div>

      <Canvas 
        camera={{ position: [0, 0, 5] }} 
        onCreated={({ gl }) => { 
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
        <OrbitControls />     
        {/* <Controls /> */}
        <Suspense fallback={null}>
          <mesh position={[0, -30, -300]}>
            <Samurai />
          </mesh>
        </Suspense>

        {/* <Samurai /> */}
        {/* <Box /> */}
        {/* <fog attach="fog" args={["white", 15, 20]} /> */}
           
        {/* <Stars />        */}
        {/* <Plane /> */}
    </Canvas>
  </>
  )
}

// TODO 
// import model
// add fonts (Typographpy)
// add music (Howler?)
// custom cursor
// add project pages
