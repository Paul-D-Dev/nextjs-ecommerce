import React, {FunctionComponent} from 'react';
import {Banner} from "../_models/banner.model";
import Link from "next/link";
import {urlFor} from "../lib/sanity-client";
import styles from '../styles/FooterBanner.module.scss';

type Props = {
    footerBanner: Banner;
}

const FooterBanner: FunctionComponent<Props> = ({footerBanner: {
    discount, largeText1, largeText2, saleTime,
    smallText, midText, desc, product,
    buttonText, image}}) => {
    return (
        <div className={styles.footer_banner_container}>
            <div className={styles.banner_desc}>
                <div className={styles.left}>
                    <p>{discount}</p>
                    <h3>{largeText1}</h3>
                    <h3>{largeText2}</h3>
                    <p>{saleTime}</p>
                </div>
                <div className={styles.right}>
                    <p>{smallText}</p>
                    <p>{midText}</p>
                    <p>{desc}</p>
                    <Link href={`/product/${product}`}>
                        <button type='button'>{buttonText}</button>
                    </Link>
                </div>

                <img
                    className={styles.footer_banner_image}
                    src={urlFor(image).url()}
                    alt={product}
                />
            </div>
        </div>
    );
};

export default FooterBanner;
