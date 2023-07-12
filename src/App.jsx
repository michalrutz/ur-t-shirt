import { AccumulativeShadows, Center, ContactShadows, Decal, Environment, PresentationControls, RandomizedLight, useGLTF, useTexture } from '@react-three/drei'
import './App.css'
import { useEffect, useMemo, useRef } from 'react'
import { useSnapshot } from 'valtio'
import { state } from './store.js'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'

export function App() {
  const snap = useSnapshot(state)

  return <>
    <Lights/>
        <PresentationControls 
          global snap rotation = { [0, 0, 0] } 
          azimuth = { [-1, 1] }
          polar   = { [-0.2, 0.2] }
          config  = { {mass: 5, tension: 200, friction: 30} }
        >
          <Shirt/>
          <AccShadows/>      

        </PresentationControls>
  </>
}


function Shirt(props) {
  const snap = useSnapshot(state)

  const texture = useTexture(`/${snap.selectedDecal}.png`)
  const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')

  const shirtRef = useRef()

  let {viewport} = useThree()
    console.log(viewport)

  useFrame((state, delta) =>{

    easing.dampE( shirtRef.current.rotation , [0, snap.selectedRotation , 0 ] , 0.25, delta )

    let current = viewport.getCurrentViewport()
    if (current.width > 1.5){
      let power = 1.1;
      shirtRef.current.scale.set( power, power, power )
    }
    else {
      shirtRef.current.scale.set( 0.8, 0.8, 0.8 )
    }

    easing.dampC(
      materials.lambert1.color,
      snap.selectedColor, 
      0.25, 
      delta)}
  )


  return (
    <mesh
      scale={0.9}
      position-y = {0.05}
      rotation={[0, 120, 0]}
      ref = { shirtRef}
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}
      onPointerEnter  = { () => { document.body.style.cursor = "grab" }}
      onPointerOut    = { () => { document.body.style.cursor = "default" }}
      >
      <Decal
        position={[0, 0.04, 0.15]}
        rotation={[0, 0, 0]}
        scale={0.15}
        opacity={0.7}
        map={texture}
        map-anisotropy={16}
      />
    </mesh>
  )
}

function CameraRig({ children }) {
  const group = useRef()

  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      state.camera.position,
      0.25,
      delta
    )
    easing.dampE(
      group.current.rotation,
      group.current.rotation,
      0.25,
      delta
    )
  })
  return <group ref={group}>{children}</group>
}

function AccShadows() {
  const shadows = useRef()

  useFrame((state, delta) =>{
    console.log(shadows.current.getMesh().geometry.parameters)
    shadows.current.getMesh().geometry.parameters.width=1;
    shadows.current.getMesh().geometry.parameters.widthSegments = 100;

    easing.dampC(
      shadows.current.getMesh().material.color,
      state.selectedColor,
      0.25,
      delta
    )
  })

  return (
    <AccumulativeShadows
      ref={shadows}
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.18]}>
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  )
}


function Lights () {
  return <>
    <ambientLight intensity={0.7}/>
    <spotLight intensity={0.6}/>
  </>
}

useGLTF.preload('/shirt_baked_collapsed.glb');
[ '/react.png', '/threejs.png' ].forEach(useTexture.preload)
