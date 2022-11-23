import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import {
  MarketPlaceContext,
  MarketPlaceProvider,
} from "../context/MarketPlace";

import { QueryClient, QueryClientProvider } from "react-query";

// Initialze the client
const queryClient = new QueryClient();

const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <ThirdwebProvider supportedChains={[activeChainId]}>
      <QueryClientProvider client={queryClient}>
        <MarketPlaceProvider>
          <Component {...pageProps} />
        </MarketPlaceProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
