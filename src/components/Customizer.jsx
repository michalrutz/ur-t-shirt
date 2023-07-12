import { useSnapshot } from "valtio"
import { state } from "../store"
import { motion } from "framer-motion"
import { AiFillHome } from "react-icons/ai"

export function Customizer({ config, setIntro }) {
          const snap = useSnapshot(state)
        
          return (
            <motion.section id={"custom"} {...config} >
              <div className="options-wrapper">
                <div className="color-options options" >
                  {snap.colors.map((color) => (
                    <div
                      key={color}
                      className="circle"
                      style={{ background: color }}
                      onClick={ () => (state.selectedColor = color) }></div>
                  ))}
                </div>
                <div id="decals" className="options">
                    {snap.decals.map((decal) => (
                      <div
                        key={decal}
                        className="decal"
                        onClick={() => {
                          state.selectedDecal = decal;
                        }
                        }>
                        <img src={decal + '_thumb.png'} alt="brand" />
                      </div>
                    ))}
                </div>
                <button
                  className="exit"
                  style={{ background: snap.selectedColor }}
                  onClick={() => ( setIntro(true))}>
                  <AiFillHome size="1.6em"/>
                </button>
                </div>
            </motion.section>
          )
        }
        