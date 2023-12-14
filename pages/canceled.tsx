import React from 'react';
import Link from 'next/link';
import styles from '../styles/Success.module.scss';

const Canceled = () => {
    return (
        <div className={styles.cancel_wrapper}>
            <div className={styles.cancel}>
                <h2>Your order has been canceled.</h2>
                <p className={styles.description}>
                    If you have any questions, please email:
                    <a className={styles.email} href="mailto:order@example.com">
                        order@example.com
                    </a>
                </p>
                <Link href="/">
                    <button type="button" className="btn">
                        Back to shop
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Canceled;
