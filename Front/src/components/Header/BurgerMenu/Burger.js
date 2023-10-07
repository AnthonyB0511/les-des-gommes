import styles from "./Burger.module.scss";
import { useState } from "react";
import Nav from "./Nav";


export default function Burger() {
    // useState runs the opening of menu
    const [open, setOpen] = useState(false);
    // const hiddes the menu (style noShow)
    const HamburgerIcon = <>
        <div className={`${styles.burgerMenu} ${styles.noShow} `}>
            <Nav open={open} setOpen={setOpen} />
        </div>
        <div
            className={`${styles.icon}`}
            onClick={() => setOpen(!open)}
        >
            <i className="fa-solid fa-bars"></i>
        </div>
    </>;
    // const shows the menu
    const CloseIcon = <>

        <div className={`${styles.burgerMenu} `}>
            <Nav open={open} setOpen={setOpen} />
        </div>
        <div
            className={`${styles.icon}`}
            onClick={() => setOpen(!open)}>
            <i className="fa-solid fa-circle-xmark"></i>
        </div>
    </>;

    return (
        <div>
            {open ? CloseIcon : HamburgerIcon}
        </div>

    );
}