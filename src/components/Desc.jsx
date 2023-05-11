import { motion } from "framer-motion";

export function Desc() {
       return <motion.aside id={"header-Logo"}
              initial={{ opacity: 0, y: -120 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', duration: 1.8, delay: 1 }}
       >
                <p>It should not only describe the t-shirt. Rather, it should tell a compelling story about why the t-shirt is worth buying. As with stories, your t-shirt product description must have an attention hook, a climax, and an impact. Besides, it should not only amuse but also empower the customers to make informed decisions.</p>
        </motion.aside>   
}
