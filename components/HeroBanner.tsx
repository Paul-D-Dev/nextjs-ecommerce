import React, {FunctionComponent} from 'react';
import Link from 'next/link';
import {Banner} from "../_models/banner.model";
import styles from '../styles/HeroBanner.module.scss';
import {urlFor} from '../lib/sanity-client';

type Props = {
    heroBanner: Banner
}

const HeroBanner: FunctionComponent<Props> = ({heroBanner}) => {
    return (
        <div className={styles.hero_banner_container}>
            <div>
                <p className={styles.beats_solo}>{heroBanner.smallText}</p>
                <h3>{heroBanner.midText}</h3>
                <img src={urlFor(heroBanner.image).url()}
                     alt="headphones"
                     className={styles.hero_banner_image}
                />
            </div>

            <div>
                <Link href={`/product/${heroBanner.product}`}>
                    <button type='button'>{heroBanner.buttonText}</button>
                </Link>
                <div className="desc">
                    <h5>Description</h5>
                    <p>{heroBanner.desc}</p>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner;
