import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { Perf } from 'r3f-perf'
import { OrbitControls } from '@react-three/drei'
import { Overlay } from './Overlay.jsx'

const cameraSettings = { 
  position:[0.3,0.2,1],
  fov: 45,
  near: 0.1,
  far: 10
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Canvas
      eventSource = { document.getElementById('root') }
      eventPrefix = { "client" }
      camera      = { cameraSettings }
      shadows
    >
      <OrbitControls
        minAzimuthAngle = {-Math.PI*0.1}
        maxAzimuthAngle = { Math.PI*0.1}
        maxPolarAngle   = { Math.PI*0.5 }
        minPolarAngle   = { Math.PI*0.5-0.5 }
        enablePan       = { false }
        enableZoom      = { false }
      />
      <App/>
    </Canvas>
    <Overlay />
  </React.StrictMode>
)

