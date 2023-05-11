import { AccumulativeShadows, Center, Decal, Environment, Float, RandomizedLight, useGLTF, useHelper, useTexture } from '@react-three/drei'
import './App.css'
import { DoubleSide, SpotLightHelper } from 'three'
import { useEffect, useRef } from 'react'
import { useControls } from 'leva'
import { useSnapshot } from 'valtio'
import { state } from './store.js'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

export function App() {
  return <>
    <Lights/>
    <Environment preset="city" />
    <Center>
      <Shirt/>
    </Center>
    <AccShadows/>
  </>
}


function Shirt(props) {
  const snap = useSnapshot(state)

  const texture = useTexture(`/${snap.selectedDecal}.png`)
  const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')

  const shirtRef = useRef()
  useEffect(
    () => {
      shirtRef.current.rotation.y = -0.3
      shirtRef.current.rotation.x = -0.1
    },[]      
  )
  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.selectedColor, 0.25, delta)
  )

  return (
    <mesh
      ref = { shirtRef}
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}>
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

function Backdrop (params) {
  return (
    <mesh
      position = {[0,0,-0.2]} 
      receiveShadow
    >
      <planeGeometry/>
      <meshStandardMaterial 
        color = {"whitesmoke"}
      />
    </mesh>
  )
}
function AccShadows() {
  const shadows = useRef()

  useFrame((state, delta) =>
    easing.dampC(
      shadows.current.getMesh().material.color,
      state.selectedColor,
      0.25,
      delta
    )
  )

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
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
    <ambientLight intensity={0.5}/>
  </>
}

useGLTF.preload('/shirt_baked.glb')
useTexture.preload('/react.png')
