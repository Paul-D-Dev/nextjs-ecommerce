import React, {FunctionComponent} from 'react';
import Head from 'next/head';
import {Footer, Navbar} from "./index";
import styles from "../styles/Layout.module.scss";

type Props = {
    children: React.ReactNode;
}

/*
    * children props come from _app.tsx
* */
const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
        {/*Title of page*/}
        <Head>
            <title>Headphones shop</title>
        </Head>

        <header>
            <Navbar/>
        </header>

        <main className={styles.main_container}>
            {/* HomePage from index.tsx */}
            {children}
        </main>

        <footer>
            <Footer/>
        </footer>
    </div>
  );
};

export default Layout;
