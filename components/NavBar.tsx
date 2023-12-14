import React from 'react';
import styles from '../styles/Navbar.module.scss';
import Link from 'next/link';
import { AiOutlineShopping} from "react-icons/ai";
import {Cart} from './';
import { useStateProvider } from '../context/StateProvider';

const NavBar = () => {
    const {showCart, setShowCart, totalQuantities} = useStateProvider();
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
                onClick={() => setShowCart(true)}>
                <AiOutlineShopping/>
                <span className='cart-item-qty'>{totalQuantities}</span>
            </button>

            {showCart && <Cart/>}
        </div>
    )
}

export default NavBar;
