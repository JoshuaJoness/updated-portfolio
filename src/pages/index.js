import React, { useState, useRef, useEffect, Suspense, useCallback } from "react"
import { Link } from "gatsby"
import * as THREE from 'three'
import { Canvas, extend, useFrame, useThree, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF, OrbitControls, Stars, Sky, draco, Plane, Html } from 'drei'
import { useSpring, a, config } from 'react-spring/three'
import { animated, useTransition, useSpring as useSpr } from 'react-spring'
import './style.css'

import CalorieCam from './calorieCam'
import ZenChat from './zenChat'
import About from './about'

// experiment with z-index for navbar on About page
// pass setIndex to about component, use button there to set indices 
// implement redux to setIndex -> then each page can have it's own custom nav
 
// disable scroll when index === 0
// use temple pic for about page, use monkey below that
// on Home click, scroll to top of page window.y ...
// screenshots of calorieCam
// if mounted, set Text in canvas via HTML tag
// todo loader on Suspence
// react font awesome
// gatsby google fonts
// load to Heroku, if rendering good, then load other 3d models for other pages
// custom cursor
// sounds
// additional transitions/springs for imags/txt
// add logos / mention tech I'm using
// optimize for mobile (display flex should do the trick)

const Samurai = ({index}) => {
  const myRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const gltf = useGLTF('/scene.gltf', true)

  
  useEffect(() => {
    if (index === 1) {
      gltf.nodes.mesh_5.quaternion._x = 10
    } else if (index === 0) {
      gltf.nodes.mesh_5.quaternion._x = 0
    }
  }, [index])

  gltf.scene.castShadow = true;

  gltf.scene.traverse( function( node ) {
    if ( node.isMesh ) { 
      node.castShadow = true
      node.receiveShadow = true 
    }
  });
  
  const props = useSpring({
    scale: index === 1 ? [0.75, 0.75, 0.75] : hovered ? [1.5,1.5,1.5] : [1,1,1],
    position: index === 1 ? [-250, 10, -300] :  [0, -100, -300],
    config: config.stiff
  })

  useFrame(() => {
    myRef.current.rotation.y += 0.005
  })

  return gltf ? (
    <a.mesh 
      position={props.position} 
      // position={[0, -100, -300]} 
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

// const pages = [
//   ({ style, index }) => {
//     const [mounted, setMounted] = useState(false)

//     return (
//     <animated.div style={{ ...style }}>
//         <Canvas
//           style={{ height:'100vh' }}
//           camera={{ position: [0, 0, 5], /*fov:75*/ }} 
//         >
//             {index === 0 && mounted ? (
//               <Html prepend>
//                 <span style={{ fontSize: 25, position: 'absolute', left: 300, width: 400, lineHeight: 1.5 }}>
//                   In the pursuit of knowledge,
//                   <br />
//                   everyday somthing is added.
//                   <br />
//                   In the practice of the Tao,
//                   <br />
//                   every day something is dropped.
//                   <br /><br />
//                   -Tao Te Ching
//                   </span>
//               </Html>
//               ) : index === 1 ? (
//                 <animated.div style={{ ...style }}>
//                 <h1 style={{ fontFamily: 'Knewave, cursive', fontSize:'7rem', textAlign: 'center' }}>Some of my work...</h1>
//                 <div id="projects" style={{ height: '100vh', background:'#525252' }}>
//                   <CalorieCam />
//                   <ZenChat /> 
//                 </div>
//             </animated.div>
//               ) : null
//             }
//           <ambientLight intensity={1.5}/>
//           <directionalLight
//             castShadow
//             position={[0, -10, -300]}
//             intensity={1.5}
//             shadow-mapSize-width={1024}
//             shadow-mapSize-height={1024}
//             // shadow-camera-far={50}
//             shadow-camera-left={-10}
//             shadow-camera-right={10}
//             shadow-camera-top={10}
//             shadow-camera-bottom={-10}
//           />
//           <OrbitControls target={[0, 0, -300]}/> 
//           <Suspense fallback={null}>
//               <Samurai setMounted={setMounted} />
//           </Suspense>
//       </Canvas>
//     </animated.div>
//   )},
//   ({ style }) => (
//     <animated.div style={{ ...style }}>
//         <h1 style={{ fontFamily: 'Knewave, cursive', fontSize:'7rem', textAlign: 'center' }}>Some of my work...</h1>
//         <div id="projects" style={{ height: '100vh', background:'#525252' }}>
//           <CalorieCam />
//           <ZenChat /> 
//         </div>
//     </animated.div>
//   ),
//   ({ style, setIndex }) => (
//     <animated.div style={{ ...style }}>
//       <About setIndex={setIndex} />
//     </animated.div>
//   ),
// ]


const Home = () => {
  const [index, setIndex] = useState(0)
  const parentRef = useRef()
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

  // const myProps = useSpr

  useEffect(() => {
    if (index === 0) {
      window.scrollTo(0, 0)
    }
  }, [index, setIndex])

  return (
    <div >
      <div style={{ display: index !== 2 ? 'flex' : 'none', justifyContent:'space-between', padding: '20px 45px' }}>
        <button onClick={() => setIndex(0)} className="links">HOME</button>
        <button onClick={() => setIndex(1)} className="links">PROJECTS</button>
        <button onClick={() => setIndex(2)} className="links">ABOUT</button>  
      </div> 


      <Canvas
        ref={parentRef}
        style={{ height:'100vh' }}
        camera={{ position: [0, 0, 5], /*fov:75*/ }} 
        onCreated={({ gl }) => { 
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
        // shadowMap
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
        {/* {index === 0 ? <OrbitControls target={[0, 0, -300]}/> : null} */}
        <Suspense fallback={null}>
            <Samurai index={index} />
        </Suspense>

      </Canvas>
      {index === 1 ? (
            // <Html portal={parentRef} center style={{ transform: "translate3d(-25%, -45%, 0px)", width: '60vw', }} >
                <animated.div style={{ position:'absolute', top: '10%', width: '60vw', right: 100}}>
                  <h1 style={{ fontFamily: 'Knewave, cursive', fontSize:'7rem', textAlign: 'center' }}>Some of my work...</h1>
                  <div style={{ background:'#525252', borderRadius: 10 }}>
                    <CalorieCam />
                    {/* <ZenChat />  */}
                  </div>
              </animated.div>
          
        ) : null}
        </div>
 
  )
}

export default Home