import React, {FunctionComponent} from 'react';
import {Product as ProductModel} from '../_models/product.model';
import Link from 'next/link';
import {urlFor} from '../lib/sanity-client'
import styles from '../styles/Product.module.scss';
import Img from 'next/image';

type Props = {
  product: ProductModel;
};

const Product: FunctionComponent<Props> = ({ product: { images, name, slug, price} }) => {
    return (
        <div>
            <Link href={`/product/${slug.current}`}>
                <a className={styles.product_card}>
                    <Img
                        width="250px"
                        height="250px"
                        className={styles.product_image}
                        src={urlFor(images && images[0]).url()}
                        alt={name}
                    />
                    <p className={styles.product_name}>{name}</p>
                    <p className={styles.product_price}>${price}</p>
                </a>
            </Link>
        </div>
    );
}

export default Product;
