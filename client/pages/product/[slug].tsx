import {GetStaticProps} from "next";
import Img from "next/image";
import React, {FunctionComponent, useState} from 'react';
import { ParsedUrlQuery } from 'querystring'
import {Product as ProductModel} from "../../_models/product.model";
import {Product} from "../../components";
import styles from '../../styles/ProductDetails.module.scss';
import {urlFor} from "../../lib/sanity-client";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

/* [slug] for dynamic changes
* routing is automatically handled by Next.js
* no need to import lib router-dom
* https://website.com/product/[slug]
* */

type Props = {
    productSlug: ProductModel;
    productsData: ProductModel[];
}
const ProductDetails: FunctionComponent<Props> = ({ productSlug, productsData}) => {
    const { images, name, details, price } = productSlug;
    const [index, setIndex] = useState(0);

    return (
        <div>
            <div className={styles.product_detail_container}>
                <div>
                    <div className='image-container'>
                        <Img
                            width="400px"
                            height="400px"
                            className={styles.product_detail_image}
                            src={urlFor(images && images[index]).url()}
                            alt={name}/>
                    </div>
                    <div className={styles.small_images_container}>
                        {images.map((image, i) => (
                            <Img
                                width="70px"
                                height="70px"
                                className={i === index ? `${styles.small_image} ${styles.selected_image}` : `${styles.small_image}`}
                                key={i}
                                src={urlFor(image).url()}
                                alt={name}
                                onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.product_detail_desc}>
                    <h1>{name}</h1>
                    <div className={styles.reviews}>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details:</h4>
                    <p>{details}</p>
                    <p className={styles.price}>${price}</p>
                    <div className={styles.quantity}>
                        <h3>Quantity:</h3>
                        <p className={styles.quantity_desc}>
                            <span className={styles.minus} onClick={() => {}}><AiOutlineMinus /></span>
                            <span className={styles.num}>0</span>
                            <span className={styles.plus} onClick={() => {}}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className={styles.buttons}>
                        <button type="button" className={styles.add_to_cart} onClick={() => {}}>Add to Cart</button>
                        <button type="button" className={styles.buy_now} onClick={() => {}}>Buy Now</button>
                    </div>
                </div>

            </div>


            <div className={styles.maylike_products_wrapper}>
                <h2>You may also like</h2>
                <div className={styles.marquee}>
                    <div className={`${styles.maylike_products_container} ${styles.track}`}>
                        {productsData.map((product) => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


// Documentation type getStaticProps
// https://wallis.dev/blog/nextjs-getstaticprops-and-getstaticpaths-with-typescript
interface IParams extends ParsedUrlQuery {
    slug: string;
}
// getStaticProps is a function that is called when the page is loaded
// HTML is pre rendering and allows getting params url to fetch data
export const getStaticProps: GetStaticProps = async ({params}) => {
    const { slug } = params as IParams;
    const productSlug = await ProductModel.fetchProductBySlug(slug);
    const productsData = await ProductModel.fetchProducts();

    return {
        props: {
            // Serialize data to be sent to the client
            productSlug: productSlug.toJSON(),
            productsData: productsData.map((product) => product.toJSON())
        }
    }
}

// Allow getStaticProps to get params slug for fetch data
// Next js will statically generate `product/earphones` etc..
export const getStaticPaths = async () => {
    const productsData = await ProductModel.fetchProductsSlugStaticPaths();
    const paths = productsData.map(slug => ({
        params: {
            slug: slug
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export default ProductDetails;
