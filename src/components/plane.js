export const Plane = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <a.meshPhysicalMaterial attach="material" color="white" />
    </mesh>
  )