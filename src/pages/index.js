import React, { useState, useRef, useEffect, Suspense } from "react"
import { Link } from "gatsby"
import * as THREE from 'three'
import { Canvas, extend, useFrame, useThree, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF, OrbitControls, Stars, Sky, draco, Plane} from 'drei'
import { useSpring, useTransition, a, config } from 'react-spring/three'
import './style.css'
import { Geometry } from "three"

import CalorieCam from './calorieCam'
import ZenChat from './zenChat'
import About from './about'

const quotes = ["1", "2", "3"]
  // todo change cursor on hover
  // todo set Suspense loader

const Samurai = () => {
  const myRef = useRef()
  const [hovered, setHovered] = useState(false)
  const gltf = useGLTF('/scene.gltf', true)

  gltf.scene.castShadow = true;

  if (gltf) {
    gltf.scene.traverse( function( node ) {
      if ( node.isMesh ) { node.castShadow = true; }
    } );
  }


  const props = useSpring({
    scale: hovered ? [1.5,1.5,1.5] : [1,1,1],
    config: config.stiff
  })

  useFrame(() => {
    if (myRef) {
      myRef.current.rotation.y += 0.005
    } 
  })

  return gltf ? (
    <a.mesh 
      position={[0, -100, -300]} 
      ref={myRef} 
      castShadow
      receiveShadow 
      scale={props.scale} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      onClick={() => myRef.current.rotation.y += 5}
    >
      <primitive object={gltf.scene} dispose={null}/>
    </a.mesh>
  ) : null
}

export default function Home() {
  const [initialURL, setInitialURL] = useState(null)

  useEffect(() => {
    setInitialURL(window.location.href)
  }, [])

  return (
    <div onScroll={(e) => console.log(window.location.href, initialURL)}>
      <div style={{ display:'flex', justifyContent:'space-between', margin: '20px 45px' }}>
        <Link to="#projects" className="links">PROJECTS</Link>
        <Link to="#projects" className="links">ABOUT</Link>   
      </div> 
      <Canvas
        style={{ height:'100vh' }}
        camera={{ position: [0, 0, 5], /*fov:75*/ }} 
        // onCreated={({ gl }) => { 
        //   gl.shadowMap.enabled = true
        //   gl.shadowMap.type = THREE.PCFSoftShadowMap
        // }}
        shadowMap
      >
        <ambientLight intensity={1.5}/>
        <directionalLight
          castShadow
          position={[0, -10, -300]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          // shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* <spotLight position={[0, 0, 10]} penumbra={1} castShadow /> */}

        {/* <OrbitControls target={[0, 0, -300]}/>      */}
        <Suspense fallback={null}>
            <Samurai />
        </Suspense>
{/* 
        <Plane
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -100, 0]}
          args={[1000, 1000]}
        >
        <meshStandardMaterial attach="material" color="white" />
      </Plane> */}
    </Canvas>


    <h1 style={{ fontFamily: 'Knewave, cursive', fontSize:'7rem', textAlign: 'center' }}>Some of my work...</h1>
      <div id="projects" style={{ height: '100vh', background:'#525252' }}>
        <CalorieCam />
        <ZenChat />
        <About />
      </div>
    </div>
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


// function Samurai() {
//   const { nodes, materials } = useLoader(GLTFLoader, '/scene.gltf', draco())
//   return (
//     <group position={[0, -7, 0]} rotation={[-Math.PI / 2, 0, 0]} dispose={null}>
//       <mesh material={materials} geometry={nodes.mesh_2.geometry} castShadow receiveShadow />
//     </group>
//   )
// }


{/* <mesh material={materials['Scene_-_Root']} geometry={nodes.mesh_0.geometry} castShadow receiveShadow /> */}