import styles from "./Burger.module.scss";
import { Nav } from "./Nav";
import { useState } from "react";
import { motion } from 'framer-motion'

export default function Burger(){
    const [open,setOpen] = useState(false);

    const HamburgerIcon = <motion.div 
                            className={`${styles.icon}`}
                            onClick={() => setOpen(!open)}
                            initial={{visibility:"hidden"}}
                            animate={{visibility:"visible"}}
                            transition={{ type: "spring", bounce: 0.5 }}
                            >
                            <i className="fa-solid fa-bars"></i>
                        </motion.div>
    const CloseIcon = <>
                        <Nav 
                        initial="hidden"
                        animate="visible"/>
                        <div 
                        className={`${styles.icon}`}
                        onClick={() => setOpen(!open)}
                        initial={{visibility:"hidden"}}
                        animate={{visibility:"visible"}}
                        transition={{ type: "spring", bounce: 0.5 }}>
                           <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                    </>

    return( 
        <div>
            {open ? CloseIcon : HamburgerIcon}
        </div>
        
        // {open && 
        // <div>
        //     <Nav />
        //     <CloseBurger 
        //     onClick={() => setOpen(!open)}/>  
        // </div>
        // }
        // </>
        
    )
}