import React, { useState, useEffect, useMemo } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { addresses } from "../../lib/constants";
import { motion } from "framer-motion";
import { BiImage, BiX } from "react-icons/bi";
import Header from "../../components/common/Header";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../../components/common/Loader";
import fs from "fs";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ImCross } from "react-icons/im";
import { errorMsg, successMsg } from "../../lib/common";
import { Toaster } from "react-hot-toast";
type Inputs = {
  name: string;
  description: string;
  image: Array<File>;
};
type Props = {};
const styles = {
  label:
    "block uppercase tracking-wide text-white text-sm font-bold mb-[4px] font-sans text-[#e5e8eb]",
  input:
    "text-white bg-transparent block w-full bg-gray-200 border-2 border-[#4c505c] rounded-[10px] py-3 px-4 mb-3 leading-tight bg-transparent text-white ",
  inputBox:
    "bg-transparent block w-full bg-gray-200 border-2 border-[#4c505c] rounded-[10px] py-3 px-4 mb-3 leading-tight h-32",
};

const index = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const address = useAddress();
  const signer = useSigner();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>();

  const NFTContract = useMemo(() => {
    if (!signer) return;
    const sdk = new ThirdwebSDK(
      signer,
      // @ts-ignore
      "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
      // "goerli"
    );
    return sdk.getContract(
      "0x97c4ffB08C8438e671951Ae957Dc77c1f0777D75",
      "nft-collection"
    );
  }, [signer]);

  useEffect(() => {
    console.log("watch(image)", watch("image"));
    if (watch("image").length == 0 && !watch("image")[0]) {
      setPreview("");
      return;
    }
    const selectedFile = watch("image")[0];
    console.log("selectedFile", selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    console.log("objectUrl", objectUrl);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [watch("image")]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      console.log("data", data);
      await mintNft(data);
      successMsg("NFT Minted Successfully");
      // Clear form data
      reset();
      setPreview("");
    } catch (error) {
      console.log("error in onsubmit", error);
      if (error instanceof Error && error.message.includes("AccessControl")) {
        errorMsg("You are not authorized to mint NFT");
      } else errorMsg("Something went wrong");
    }
    setIsLoading(false);
  };

  const mintNft = async (data: Inputs) => {
    if (!address) return;
    const metadata = {
      ...data,
      image: watch("image")[0],
    };
    console.log("metadata", metadata);
    console.log("wallet address", address);
    const walletAddress = address;
    const tx = await (await NFTContract)!?.mintTo(walletAddress, metadata);
    const receipt = tx?.receipt; // the transaction receipt
    const tokenId = tx?.id; // the id of the NFT minted
    const nft = await tx?.data(); //
    console.log("nft", nft);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 20,
      }}
      className="overflow-hidden"
    >
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-[90%] md:w-[600px] flex flex-col space-y-10 mx-auto mt-20">
        <div className="text-[40px] font-bold text-white">Create New Item</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-3 md:space-y-6">
            <div className="w-full px-3">
              <label className={styles.label}>
                Image, Video, Audio or 3D Model{" "}
                <span className="text-red-600">*</span>
              </label>
              <div className="text-xs mb-2 text-[#8A939B]">
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </div>
              <div className="flex items-center justify-center w-64 relative">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent  hover:bg-black hover:opacity-70">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <BiImage className=" text-white w-20 h-20" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    defaultValue={""}
                    {...register("image", { required: true })}
                  />
                  {watch("image") && watch("image")?.length > 0 && (
                    <img
                      src={preview}
                      className="absolute top-[1%] right-[1%] w-[98%] h-[98%] object-cover rounded-md"
                    />
                  )}
                  {/* Cross button on top right of the image */}
                  {watch("image") && watch("image")?.length > 0 && (
                    <div className="absolute top-2 right-2">
                      <button
                        type="button"
                        // on button click select image should not be clickedd
                        className="flex items-center justify-center w-6 h-6 rounded-full text-white"
                        onClick={() => {
                          // @ts-ignore
                          // document.getElementById("dropzone-file").value = "";
                          setValue("image", "");
                          setPreview("");
                        }}
                      >
                        <ImCross />
                      </button>
                    </div>
                  )}
                </label>
              </div>
              <p className="text-red-500 text-xs italic mt-3">
                {errors.image && <span>Image is required</span>}
              </p>
            </div>
            <div className="w-full px-3">
              <label className={styles.label}>
                Name <span className="text-red-600">*</span>
              </label>
              <input
                className={styles.input}
                id="grid-first-name"
                type="text"
                placeholder="Item Name"
                {...register("name", { required: true })}
              />
              <p className="text-red-500 text-xs italic">
                {errors.name && <span>Name field is required</span>}
              </p>
            </div>
            <div className="w-full px-3">
              <label className={styles.label}>Description</label>
              <div className="text-xs mb-2 text-[#8A939B]">
                The description will be included on the item's detail page
                underneath its image. Markdown syntax is supported.
              </div>
              <textarea
                className={styles.inputBox}
                id="grid-last-name"
                placeholder="Provide a detailed description of your item."
                defaultValue=""
                {...register("description")}
              />
            </div>
            <div className="w-full px-3">
              <label className={styles.label}>Collection</label>
              <div className="text-xs mb-2 text-[#8A939B]">
                This is the collection where your item will appear.
              </div>
              <div className="relative">
                <select className={styles.input} id="grid-state">
                  <option>NFT's Collection</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
              </div>
            </div>
            <div className="w-full px-3">
              <button
                className="
                bg-blue-500 hover:bg-blue-900 text-xl text-white font-bold py-4 px-8 rounded-xl md:mt-10 mb-20"
              >
                {isLoading ? <Loader text="Minting..." /> : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default index;
