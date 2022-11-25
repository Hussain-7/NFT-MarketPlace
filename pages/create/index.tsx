import React, { useState, useEffect, useMemo } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { addresses } from "../../lib/constants";

import { BiImage } from "react-icons/bi";
import Header from "../../components/common/Header";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../../components/common/Loader";
import { MdSettingsInputAntenna } from "react-icons/md";
import fs from "fs";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { InputType } from "zlib";
type Inputs = {
  name: string;
  description: string;
  image: File;
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
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    await mintNft(data);
    setIsLoading(false);

    console.log(data);
  };
  const address = useAddress();
  const signer = useSigner();
  const [selectedFile, setSelectedFile] = useState();
  const [fileBuffer, setFileBuffer] = useState<string | ArrayBuffer | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>();
  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    console.log("e.target.files", e.target.files[0]);
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setSelectedFile(file);
      setFileBuffer(reader.result);
    };
    // setSelectedFile(e.target.files[0]);
  };
  const NFTContract = useMemo(() => {
    if (!signer) return;
    const sdk = new ThirdwebSDK(
      signer,
      // @ts-ignore
      "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
      // "goerli"
    );
    return sdk!.getContract(
      "0x97c4ffB08C8438e671951Ae957Dc77c1f0777D75",
      "nft-collection"
    );
  }, [signer]);
  const mintNft = async (data: Inputs) => {
    // const metadata = {
    //   name: "Cool NFT",
    //   description: "This is a cool NFT",
    //   image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
    // };
    if (!address) return;
    const metadata = {
      ...data,
      // image: fileBuffer,
      image: selectedFile,
    };
    console.log("metadata", metadata);
    console.log("wallet address", address);
    const walletAddress = address;
    const tx = await (await NFTContract)!?.mintTo(walletAddress, metadata);
    const receipt = tx.receipt; // the transaction receipt
    const tokenId = tx.id; // the id of the NFT minted
    const nft = await tx.data(); //
    console.log("nft", nft);
  };

  return (
    <div>
      <Header />
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
                    {/* <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg> */}
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
                    onChange={onSelectFile}
                    defaultValue={selectedFile}
                    // {...register("file")}
                  />
                  {selectedFile && (
                    <img
                      src={preview}
                      className="absolute top-[1%] right-[1%] w-[98%] h-[98%] object-cover rounded-md"
                    />
                  )}
                </label>
              </div>

              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
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
            {/* <div className="w-full px-4">
              <hr className="px-3 border-[#8A939B]" />
            </div> */}
            <div className="w-full px-3">
              <button
                // blue background and white text
                className="
                bg-blue-500 hover:bg-blue-900 text-xl text-white font-bold py-4 px-8 rounded-xl md:mt-10 mb-20"
              >
                {isLoading ? <Loader text="Minting..." /> : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default index;
