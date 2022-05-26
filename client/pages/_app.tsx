import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import {Toaster} from "react-hot-toast";
import {Layout} from "../components";
import {StateProvider} from '../context/StateProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <StateProvider>
          <Layout>
              <Toaster/>
            <Component {...pageProps} />
          </Layout>
      </StateProvider>
  )
}

export default MyApp
