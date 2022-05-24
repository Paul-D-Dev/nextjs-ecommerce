import React from 'react';
import styles from '../styles/Navbar.module.scss';
import Link from 'next/link';
import { AiOutlineShopping} from "react-icons/ai";

const NavBar = () => {
    return (
        <div className={styles.navbar_container}>
            <p className={styles.logo}>
                <Link href='/'>
                    Headphones
                </Link>
            </p>

            <button
                type='button'
                className='cart-icon'
                onClick={() => {}}>
                <AiOutlineShopping/>
                <span className='cart-item-qty'>1</span>
            </button>
        </div>
    )
}

export default NavBar;
