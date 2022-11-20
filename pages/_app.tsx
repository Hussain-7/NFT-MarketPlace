import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import {
  MarketPlaceContext,
  MarketPlaceProvider,
} from "../context/MarketPlace";

const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <ThirdwebProvider supportedChains={[activeChainId]}>
      <MarketPlaceProvider>
        <Component {...pageProps} />
      </MarketPlaceProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
