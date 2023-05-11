import { Logo } from "@pmndrs/branding";
import { motion } from "framer-motion";
import { AiOutlineShopping } from "react-icons/ai";

export function LogoComp() {
       return <motion.header id={"header-Logo"}
              initial={{ opacity: 0, y: -120 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', duration: 1.8, delay: 1 }}
       >
              <Logo width="40" height="40" />
       </motion.header>   
}
