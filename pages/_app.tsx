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
    <ThirdwebProvider
      supportedChains={[activeChainId]}
      // https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98
      dAppMeta={{
        name: "Exarta Marketplace",
        description: "Exarta Marketplace",
        url: "https://exarta.com",
      }}
    >
      <MarketPlaceProvider>
        <Component {...pageProps} />
      </MarketPlaceProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
