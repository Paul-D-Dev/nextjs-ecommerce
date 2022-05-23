import React, {FunctionComponent} from 'react';
import {Banner} from "../_models/banner.model";
import {Product as ProductModel} from "../_models/product.model";
import styles from '../styles/Home.module.scss';
import {HeroBanner, FooterBanner, Product} from '../components';

type Props = {
    productsData: ProductModel[];
    bannerData: Banner;
}

const Home: FunctionComponent<Props> = ({productsData, bannerData}) => {
  return (
      <>
        <HeroBanner heroBanner={bannerData}/>
        <div className={styles.products_heading}>
            <h2>Best Selling Products</h2>
            <p>Speakers of many variations</p>
        </div>
        <div className={styles.products_container}>
            {productsData?.map((product) =>
                <Product key={product._id} product={product}/>)
            }
        </div>

        <FooterBanner />
      </>
  )
}

// As useEffect for Next.js
export const getServerSideProps = async () => {
  const productsData = await ProductModel.fetchProducts();
  const bannerData = await Banner.fetchBanner();

  return {
    props: {
        // Serialize data to be sent to the client
      productsData: productsData.map((product) => product.toJSON()),
      bannerData: bannerData.toJSON()
    }
  }
}

export default Home
