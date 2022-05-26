
import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateProvider } from '../context/StateProvider';
import { urlFor } from '../lib/sanity-client';
import styles from '../styles/Cart.module.scss';

const Cart = () => {
    const cartRef = useRef<HTMLDivElement>(null);
    const { totalPrice, totalQuantities, cartItems, setShowCart } = useStateProvider();

    return (
        <div className={styles.cart_wrapper}>
            <div className={styles.cart_container}>
                <button
                    type="button"
                    className={styles.cart_heading}
                    onClick={() => setShowCart(false)}>
                    <AiOutlineLeft />
                    <span className="heading">Your Cart</span>
                    <span className={styles.cart_num_items}>({totalQuantities} items)</span>
                </button>


                {/*Cart is empty*/}
                {cartItems.length < 1 && (
                    <div className={styles.empty_cart}>
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping bag is empty</h3>
                        <Link href="/">
                            <button
                                type="button"
                                onClick={() => setShowCart(false)}
                                className="btn"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className={styles.cart_product_container}>
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className={styles.cart_product} key={item._id}>
                            <img src={urlFor(item.images[0]).url()} className={styles.cart_product_image} alt={item.name}/>
                            <div>
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h4>${item.price}</h4>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity_desc">
                                            <span className="minus" onClick={() => {}}>
                                                <AiOutlineMinus />
                                            </span>
                                            <span className="num" onClick={() => {}}>{item.quantity}</span>
                                            <span className="plus" onClick={() => {}}>
                                                <AiOutlinePlus />
                                            </span>
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className={styles.cart_remove_item}
                                        onClick={() => {}}
                                    >
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {cartItems.length >= 1 && (
                    <div className={styles.cart_bottom}>
                        <div className={styles.cart_total}>
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <button
                                type="button"
                                className="btn"
                                onClick={() => {}}
                            >
                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Cart;
