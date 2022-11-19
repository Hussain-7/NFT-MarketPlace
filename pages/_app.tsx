import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import {
  MarketPlaceContext,
  MarketPlaceProvider,
} from "../context/MarketPlace";
const supportedChainIds = [5];
const connectors = {
  injected: {},
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <MarketPlaceProvider>
        <Component {...pageProps} />
      </MarketPlaceProvider>
    </ThirdwebWeb3Provider>
  );
}

export default MyApp;
