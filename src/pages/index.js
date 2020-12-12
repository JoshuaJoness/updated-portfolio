import React, { useState, useRef, useEffect, Suspense } from "react"
import * as THREE from 'three'
import { Canvas, extend, useFrame, useThree, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF, OrbitControls, Stars, Sky, draco } from 'drei'
import { useSpring, a } from 'react-spring/three'
import './style.css'
import { Geometry } from "three"



const Samurai = () => {
  const myRef = useRef()
  const gltf = useGLTF('/scene.gltf', true)
  console.log(gltf)
  useFrame(() => myRef.current.rotation.y += 0.01 )
  return (
    <mesh position={[0, -100, -300]} ref={myRef} castShadow receiveShadow>
      <primitive object={gltf.scene} dispose={null} castShadow receiveShadow />
    </mesh>
  )
}

// function Samurai() {
//   const { nodes, materials } = useLoader(GLTFLoader, '/scene.gltf', draco())
//   return (
//     <group position={[0, -7, 0]} rotation={[-Math.PI / 2, 0, 0]} dispose={null}>
//       <mesh material={materials} geometry={nodes.mesh_2.geometry} castShadow receiveShadow />
//     </group>
//   )
// }


{/* <mesh material={materials['Scene_-_Root']} geometry={nodes.mesh_0.geometry} castShadow receiveShadow /> */}


export default function Home() {
  return (
    <> 
      <Canvas 
        camera={{ position: [0, 0, 5] }} 
        onCreated={({ gl }) => { 
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <ambientLight intensity={1.5} castShadow/>
        <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
        <OrbitControls target={[0, 0, -300]}/>     
        <Suspense fallback={null}>
            <Samurai />
        </Suspense>
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


{/* <div style={{display:'flex', justifyContent:'space-between', position: 'absolute', top: 0, left: 0}}>
<button style={{border:'none', margin: 20, background: 'none', fontSize: 39, height: 10}} onClick={() => console.log('testing...')}>PROJECTS</button>
<button style={{border:'none', margin: 20, background: 'none', fontSize: 39, height: 10}} onClick={() => console.log('testing...')}>CONTACT</button>
</div> */}
