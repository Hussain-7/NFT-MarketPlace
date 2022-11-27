import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { MarketPlaceProvider } from "../context/MarketPlace";
import { motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/common/Layout";

// Initialze the client
const queryClient = new QueryClient();

const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <ThirdwebProvider supportedChains={[activeChainId]}>
      <QueryClientProvider client={queryClient}>
        <MarketPlaceProvider>
          <Layout>
            {" "}
            <Component {...pageProps} />
          </Layout>
        </MarketPlaceProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
