import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateProvider } from '../context/StateProvider';
import getStripe from "../lib/getStripe";
import { urlFor } from '../lib/sanity-client';
import styles from '../styles/Cart.module.scss';

const Cart = () => {
    const cartRef = useRef<HTMLDivElement>(null);
    const { totalPrice, totalQuantities, cartItems, setShowCart, updateQtyCartItem, onRemove } = useStateProvider();
    const handleCheckout = async () => {
        const stripe = await getStripe();

        // Folder api/stripe
        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems)
        });

        if (response.status === 500) return;

        const data = await response.json();

        // Go to checkout page from Stripe
        stripe.redirectToCheckout({
            sessionId: data.id
        });
    }

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
                                            <span className="minus" onClick={() => {updateQtyCartItem(item._id!, 'decrease')}}>
                                                <AiOutlineMinus />
                                            </span>
                                            <span className="num" onClick={() => {}}>{item.quantity}</span>
                                            <span className="plus" onClick={() => {updateQtyCartItem(item._id!, 'increase')}}>
                                                <AiOutlinePlus />
                                            </span>
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className={styles.cart_remove_item}
                                        onClick={() => {onRemove(item)}}
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
                                onClick={() => {handleCheckout()}}
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
