import React, { useEffect, useState, useContext, useMemo } from "react";

import { HiTag } from "react-icons/hi";
import { IoMdWallet } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import {
  ChainId,
  useNetwork,
  useNetworkMismatch,
  useSigner,
} from "@thirdweb-dev/react";
import {
  AuctionListing,
  DirectListing,
  NATIVE_TOKEN_ADDRESS,
  NFT,
  ThirdwebSDK,
} from "@thirdweb-dev/sdk";
import Loader from "../common/Loader";
import { addresses } from "../../lib/constants";
import Modal from "../common/Modal";
import CustomModal from "../common/Modal";
import { errorMsg, successMsg } from "../../lib/common";
import { MarketPlaceContext } from "../../context/MarketPlace";

const style = {
  button: `mr-8 justify-center flex items-center py-2 px-12 rounded-lg cursor-pointer w-full`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
};

type Props = {
  listings: (AuctionListing | DirectListing)[] | null | undefined;
  selectedNft: NFT;
  isOwner: boolean;
  isListed: string | string[] | undefined;
  marketNft: (AuctionListing | DirectListing) | undefined;
};

const Trade = ({ selectedNft, isOwner, isListed, marketNft }: Props) => {
  const { refetchNfts, refetchUserNfts, refetchActiveListings } =
    useContext(MarketPlaceContext);
  const signer = useSigner();
  const [isDone, setIsDone] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, switchNetwork] = useNetwork();
  const [showModal, setShowModal] = useState(false);
  const networkMismatch = useNetworkMismatch();
  useEffect(() => {
    console.log("isOwner", isOwner);
    console.log("isListed", isListed);
  });
  useEffect(() => {
    if (!marketNft || !selectedNft) return;
    setEnableButton(true);
  }, [marketNft, selectedNft]);

  const marketPlaceContract = useMemo(() => {
    if (!signer) return;
    const sdk = new ThirdwebSDK(
      signer,
      // @ts-ignore
      "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
      // "goerli"
    );
    return sdk.getContract(
      "0xFE64BFAC909d23027691074E833DcB29a3233523",
      "marketplace"
    );
  }, [signer]);

  const buyItem = async (
    listingId = selectedNft.metadata.id,
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
      successMsg();
      setLoading(false);
    } catch (err) {
      if (err instanceof Error && err.message.includes("is no longer valid")) {
        errorMsg("This NFT is no longer available!");
      } else if (
        err instanceof Error &&
        err.message.includes("insufficient funds for gas")
      ) {
        errorMsg("Payment Failed: Due to Insufficient funds in wallet!");
      } else {
        errorMsg("Payment Failed!");
      }
      setLoading(false);
    }
  };

  const listItem = async (price: number) => {
    setLoading(true);
    setShowModal(true);
    // Ensure user is on the correct network
    if (networkMismatch) {
      switchNetwork && switchNetwork(ChainId.Goerli);
      return;
    }
    console.log(selectedNft, marketNft, "listItem");
    try {
      // Data of the listing you want to create
      const listing = {
        // address of the NFT contract the asset you want to list is on
        assetContractAddress: addresses.NFTCollection_Address,
        // token ID of the asset you want to list
        tokenId: selectedNft.metadata.id,
        // when should the listing open up for offers
        startTimestamp: new Date(),
        // how long the listing will be open for
        listingDurationInSeconds: 86400 * 365,
        // how many of the asset you want to list
        quantity: 1,
        // address of the currency contract that will be used to pay for the listing
        currencyContractAddress: NATIVE_TOKEN_ADDRESS,
        // how much the asset will be sold for
        buyoutPricePerToken: price,
      };
      const tx = await (await marketPlaceContract)!.direct.createListing(
        listing
      );
      const receipt = tx.receipt; // the transaction receipt
      const listingId = tx.id; // the id of the newly created listing
      console.log("receipt", receipt);
      console.log("listingId", listingId);
      if (refetchActiveListings) {
        const result = await refetchActiveListings();
        console.log("result", result);
      }
      successMsg("Listing successful!");
      setLoading(false);
      setShowModal(false);
    } catch (err) {
      if (err instanceof Error && err.message.includes("is no longer valid")) {
        errorMsg("Listing is no longer valid");
      } else {
        errorMsg("Listing Failed!");
      }
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2 justify-center items-left py-5 w-full items-left rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      <CustomModal
        toggle={showModal}
        loading={loading}
        toggleShowModal={setShowModal}
        listItem={listItem}
      />
      {isListed === "true" && (
        <>
          <div className="text-[#8a939b] text-lg font-normal mt-0">
            Current price:
          </div>
          <div className="text-2xl font-semibold">
            {marketNft?.buyoutCurrencyValuePerToken.displayValue} ETH{" "}
            <span className="text-[#8a939b] text-lg font-normal">
              $
              {parseFloat(
                marketNft?.buyoutCurrencyValuePerToken.displayValue as string
              ) * 1100}{" "}
            </span>
          </div>
        </>
      )}
      <div className="lg:w-[40%] text-center items-center">
        {/* Case when item is listed and current user not owner */}
        {isListed === "true" && !isOwner && (
          <>
            <div
              onClick={() => {
                enableButton && !isOwner && !loading
                  ? buyItem(marketNft!.id, 1)
                  : null;
              }}
              className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
            >
              <IoMdWallet className={style.buttonIcon} />
              <div className={style.buttonText}>
                {loading ? <Loader text={"Buying..."} /> : "Buy Now"}
              </div>
            </div>
          </>
        )}
        {/* Case when item is listed and current user is owner */}
        {isListed === "true" && isOwner && (
          <div className={`${style.button} bg-[#507397]`}>
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Item Listed</div>
          </div>
        )}
        {/* Case when item is not listed and current user is owner */}
        {isListed === "false" && isOwner && (
          <div
            onClick={() => {
              setShowModal(true);
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>List Item</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trade;
