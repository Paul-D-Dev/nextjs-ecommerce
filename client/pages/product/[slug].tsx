import {GetStaticProps} from "next";
import React, {FunctionComponent} from 'react';
import { ParsedUrlQuery } from 'querystring'
import {Product as ProductModel} from "../../_models/product.model";
import styles from '../../styles/ProductDetails.module.scss';
import {urlFor} from "../../lib/sanity-client";

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

    return (
        <div>
            <div className={styles.product_detail_container}>
                <div>
                    <div className='image-container'>
                        <img src='' alt=""/>
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
