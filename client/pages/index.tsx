import React from 'react';
import styles from '../styles/Home.module.scss';
import { HeroBanner, FooterBanner } from '../components';

const Home = () => {
  return (
      <>
        <HeroBanner/>
        <div className={styles.products_heading}>
            <h2>Best Selling Products</h2>
            <p>Speakers of many variations</p>
        </div>

        <FooterBanner />
      </>
  )
}

export default Home
