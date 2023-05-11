import { motion } from 'framer-motion'
import { AiFillFormatPainter } from "react-icons/ai"

export function Intro({ setIntro }) {
          return (
            <motion.section id={"intro"} 
            initial = {{ opacity: 0, x: -200 }}
            animate = {{ opacity: 1, x: 0 }}
            exit    = {{ opacity: 0, x: -10 }}
            transition={{ type: 'spring', duration: 1.8, delay: 0 }}
            
            >
              <h1>LET'S DO IT.</h1>
              <button className='negative'
                      onClick={ () => { setIntro(false) } }>
                      customize
                      <AiFillFormatPainter/>
              </button>
            </motion.section>
          )
        }