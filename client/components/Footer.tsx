import React from 'react';
import {AiFillInstagram, AiOutlineTwitter} from "react-icons/ai";
import styles from '../styles/Footer.module.scss';

const Footer = () => {
  return (
      <div className={styles.footer_container}>
          <p>Headphones - All rights reserved</p>
          <p className={styles.icons}>
              <AiFillInstagram />
              <AiOutlineTwitter />
          </p>
      </div>
  )
}

export default Footer;
