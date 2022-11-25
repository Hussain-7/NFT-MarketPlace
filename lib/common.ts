import { SignerOrProvider, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { toast } from "react-hot-toast";
import { addresses } from "./constants";

export const successMsg = (
  text: string = `Purchase successful!`,
  toastHandler = toast
) =>
  toastHandler.success(text, {
    style: {
      background: "#04111d",
      color: "#fff",
    },
  });

export const errorMsg = (
  text: string = "Payment Failed!",
  toastHandler = toast
) =>
  toastHandler.error(text, {
    style: {
      background: "#04111d",
      color: "#fff",
    },
  });

export const getContractInstance = async (
  signer: SignerOrProvider | undefined,
  contractType: "marketplace" | "nft-collection"
) => {
  if (!signer) return;
  const sdk = new ThirdwebSDK(
    signer,
    // @ts-ignore
    "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
  );
  const address =
    contractType === "marketplace"
      ? addresses.MarketPlaceContract_Address
      : addresses.NFTCollection_Address;
  return sdk.getContract(address, contractType);
};
