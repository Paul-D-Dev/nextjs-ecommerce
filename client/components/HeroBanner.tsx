import React from 'react';
import Link from 'next/link';
import styles from '../styles/HeroBanner.module.scss';

const HeroBanner = () => {
    return (
        <div className={styles.hero_banner_container}>
            <div>
                <p className={styles.beats_solo}>beat solo</p>
                <h3>Mid text</h3>
                <img src="" alt="headphones" className={styles.hero_banner_image}/>
            </div>

            <div>
                <Link href='/product/ID'>
                    <button type='button'>BTN TEXT</button>
                </Link>
                <div className="desc">
                    <h5>Description</h5>
                    <p>DESCRIPTION</p>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner;
