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

// if mounted, set Text in canvas via HTML tag
// todo loader on Suspence
// react font awesome
// gatsby google fonts
// load to Heroku, if rendering good, then load other 3d models for other pages
// custom cursor
// sounds
// additional transitions/springs for imags/txt

const Samurai = ({setMounted}) => {
  const myRef = useRef()
  const [hovered, setHovered] = useState(false)
  const gltf = useGLTF('/scene.gltf', true)

  useEffect(() => {
    if (myRef.current) {
      setMounted(true)
    }
  }, [myRef])

  gltf.scene.castShadow = true;

  gltf.scene.traverse( function( node ) {
    if ( node.isMesh ) { node.castShadow = true; }
  });
  

  const props = useSpring({
    scale: hovered ? [1.5,1.5,1.5] : [1,1,1],
    config: config.stiff
  })

  useFrame(() => {
    myRef.current.rotation.y += 0.005
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

// const quoteArray = [
//   <span style={{ fontSize: 25, position: 'absolute', left: 300, width: 400, lineHeight: 1.5 }}>
//                   In the pursuit of knowledge,
//                   <br />
//                   everyday somthing is added.
//                   <br />
//                   In the practice of the Tao,
//                   <br />
//                   every day something is dropped.
//                   <br /><br />
//                   -Tao Te Ching
//                   </span>,
//                   <span style={{ fontSize: 25, position: 'absolute', left: 300, width: 400, lineHeight: 1.5 }}>
//                   Test
//                   </span>
// ]

const pages = [
  ({ style }) => {
    const [mounted, setMounted] = useState(false)
    const [timeToChange, setTimeToChange] = useState(0)

    useEffect(() => {
      setText()
    })

    // setTimeout(() => {
    //   setTimeToChange(timeToChange++)
    // }, 4000)

    return (
    <animated.div style={{ ...style }}>
        <Canvas
          style={{ height:'100vh' }}
          camera={{ position: [0, 0, 5], /*fov:75*/ }} 
        >
            {mounted ? (
              <Html>
                <span style={{ fontSize: 25, position: 'absolute', left: 300, width: 400, lineHeight: 1.5 }}>
                  In the pursuit of knowledge,
                  <br />
                  everyday somthing is added.
                  <br />
                  In the practice of the Tao,
                  <br />
                  every day something is dropped.
                  <br /><br />
                  -Tao Te Ching
                  </span>
              </Html>
              ) : null
            }
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
          <OrbitControls target={[0, 0, -300]}/> 
          <Suspense fallback={null}>
              <Samurai setMounted={setMounted} />
          </Suspense>
      </Canvas>
    </animated.div>
  )},
  ({ style }) => (
    <animated.div style={{ ...style }}>
        <h1 style={{ fontFamily: 'Knewave, cursive', fontSize:'7rem', textAlign: 'center' }}>Some of my work...</h1>
        <div id="projects" style={{ height: '100vh', background:'#525252' }}>
          <CalorieCam />
          <ZenChat /> 
        </div>
    </animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: 'lightgreen' }}>
      <About />
    </animated.div>
  ),
]


const Home = () => {
  const [index, set] = useState(0)
  const onClick = useCallback(() => set(state => (state + 1) % 3), [])
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })
  // const myProps = useSpr

  return (
    <div className="simple-trans-main" style={{backgroundColor: index === 2 ? '#fff' : '#636363'}}>
      {/* Temp loader below */}
      {/* <span style={{fontSize: 35, position: 'absolute', top: '50vh', left: '50vw'}}>Realize deeply that the present moment is all you ever have... -Eckart Tolle</span> */}
      <div style={{ display:'flex', justifyContent:'space-between', padding: '20px 45px' }}>
        <button onClick={() => set(0)} className="links">HOME</button>
        <button onClick={() => set(1)} className="links">PROJECTS</button>
        <button onClick={() => set(2)} className="links">ABOUT</button>  
      </div> 
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props} />
      })}
    </div>
  )

  // return (
  //   <div>
  //     <div style={{ display:'flex', justifyContent:'space-between', margin: '20px 45px' }}>
  //       <Link to="#projects" className="links">PROJECTS</Link>
  //       <Link to="#projects" className="links">ABOUT</Link> 
  //     </div> 

  //     <Canvas
  //       style={{ height:'100vh' }}
  //       camera={{ position: [0, 0, 5], /*fov:75*/ }} 
  //       onCreated={({ gl }) => { 
  //         gl.shadowMap.enabled = true
  //         gl.shadowMap.type = THREE.PCFSoftShadowMap
  //       }}
  //       // shadowMap
  //     >
  //       <ambientLight intensity={1.5}/>
  //       <directionalLight
  //         castShadow
  //         position={[0, -10, -300]}
  //         intensity={1.5}
  //         shadow-mapSize-width={1024}
  //         shadow-mapSize-height={1024}
  //         // shadow-camera-far={50}
  //         shadow-camera-left={-10}
  //         shadow-camera-right={10}
  //         shadow-camera-top={10}
  //         shadow-camera-bottom={-10}
  //       />
  //       {/* <spotLight position={[0, 0, 10]} penumbra={1} castShadow /> */}
  //       {/* <OrbitControls target={[0, 0, -300]}/>      */}
  //       <Suspense fallback={null}>
  //           <Samurai />
  //       </Suspense>
  //       {/* 
  //       <Plane
  //         receiveShadow
  //         rotation={[-Math.PI / 2, 0, 0]}
  //         position={[0, -100, 0]}
  //         args={[1000, 1000]}
  //       >
  //       <meshStandardMaterial attach="material" color="white" />
  //     </Plane> */}
  //   </Canvas>

  //   <h1 style={{ fontFamily: 'Knewave, cursive', fontSize:'7rem', textAlign: 'center' }}>Some of my work...</h1>
  //     <div id="projects" style={{ height: '100vh', background:'#525252' }}>
  //       <CalorieCam />
  //       <ZenChat />
  //       <About />
  //     </div>

  //   </div>
  // )
}

export default Home

// TODO 
//   // todo change cursor on hover
  // todo set Suspense loader
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


/* <mesh material={materials['Scene_-_Root']} geometry={nodes.mesh_0.geometry} castShadow receiveShadow /> */

// const test1Ref = useRef()
// return(<div ref={test1Ref} style={{ background:'#eee', height: '100vh' }}>TEST 1</div>
// )}
// const test2 = () => {
// const test2Ref=useRef()
// return(<div ref={test2Ref} style={{ background:'#e9e9', height: '100vh' }}>TEST 2</div>
// )}