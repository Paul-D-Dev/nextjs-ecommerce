import React, {FunctionComponent} from 'react';
import {Product as ProductModel} from '../_models/product.model';
import Link from 'next/link';
import {urlFor} from '../lib/sanity-client'
import styles from '../styles/Product.module.scss';

type Props = {
  product: ProductModel;
};

const Product: FunctionComponent<Props> = ({ product: { image, name, slug, price} }) => {
    return (
        <div>
            <Link href={`/product/${slug.current}`}>
                <a className={styles.product_card}>
                    <img
                        className={styles.product_image}
                        src={urlFor(image && image[0]).url()}
                        alt={name}
                        width={250}
                        height={250}
                    />
                    <p className={styles.product_name}>{name}</p>
                    <p className={styles.product_price}>${price}</p>
                </a>
            </Link>
        </div>
    );
}

export default Product;
