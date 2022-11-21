import React, { useEffect, useState, useContext, useMemo } from "react";
import { Listing, NFT } from "../../types";
import { HiTag } from "react-icons/hi";
import { IoMdWallet } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { MarketPlaceContext } from "../../context/MarketPlace";
import {
  ChainId,
  useNetwork,
  useNetworkMismatch,
  useSigner,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import Loader from "../common/Loader";

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
};

type Props = {
  listings: Array<Listing>;
  selectedNft: NFT;
  isListed: string | string[] | undefined;
};

const Purchase = ({ listings, selectedNft, isListed }: Props) => {
  const signer = useSigner();
  // const { marketPlaceContract } = useContext(MarketPlaceContext);
  const [selectedMarketNft, setSelectedMarketNft] = useState<Listing>();
  const [enableButton, setEnableButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, switchNetwork] = useNetwork();
  const networkMismatch = useNetworkMismatch();

  useEffect(() => {
    if (!listings || isListed === "false") return;
    (async () => {
      setSelectedMarketNft(
        listings.find(
          (marketNft) => marketNft.asset?.id === selectedNft?.metadata.id
        )
      );
    })();
  }, [selectedNft, listings, isListed]);

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return;

    setEnableButton(true);
  }, [selectedMarketNft, selectedNft]);

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  const marketPlaceContract = useMemo(() => {
    if (!signer) return;
    const sdk = new ThirdwebSDK(
      signer,
      // @ts-ignore
      "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
      // "goerli"
    );
    return sdk!.getContract(
      "0xFE64BFAC909d23027691074E833DcB29a3233523",
      "marketplace"
    );
  }, [signer]);
  const buyItem = async (
    listingId = selectedMarketNft!.id,
    quantityDesired = 1
  ) => {
    setLoading(true);
    // Ensure user is on the correct network
    if (networkMismatch) {
      switchNetwork && switchNetwork(ChainId.Goerli);
      return;
    }
    console.log(listingId, quantityDesired, module, "buyItem");
    try {
      await (await marketPlaceContract)!.buyoutListing(
        listingId,
        quantityDesired
      );
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    confirmPurchase();
  };

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      {isListed === "true" ? (
        <>
          <div
            onClick={() => {
              enableButton ? buyItem(selectedMarketNft!.id, 1) : null;
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>
              {loading ? <Loader text={"Buying..."} /> : "Buy Now"}
            </div>
          </div>
          <div
            className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Make Offer</div>
          </div>
        </>
      ) : (
        <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
