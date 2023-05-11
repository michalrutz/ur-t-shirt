import { AnimatePresence } from 'framer-motion'
import { Intro } from './components/Intro'
import { Customizer } from './components/Customizer'
import { LogoComp } from './components/LogoComp'
import { useState } from 'react'

  const transition = { type: 'spring', duration: 0.5 }
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }

export function Overlay() {
  const [isIntro, setIntro] = useState(true)
  return (
    <div id="wrapper">
      <LogoComp/>
      <AnimatePresence>
        {isIntro ? (
          <Intro key="main" setIntro={setIntro} />
        ) : (
          <Customizer key="custom" config={config} setIntro={setIntro}/>
        )}
      </AnimatePresence>
    </div>
  )
}



