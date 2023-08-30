import styles from "./Burger.module.scss";
import { Nav } from "./Nav";
import { useState } from "react";
export default function Burger(){
    const [open,setOpen] = useState(false);

    const HamburgerIcon = <div 
                            className={`${styles.icon}`}
                            onClick={() => setOpen(!open)}>
                            <i className="fa-solid fa-bars"></i>
                        </div>
    const CloseIcon = <>
                        <Nav />
                        <div 
                        className={`${styles.icon}`}
                        onClick={() => setOpen(!open)}>
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