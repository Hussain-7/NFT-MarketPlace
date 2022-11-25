import React from "react";
import { IoMdSnow } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { NFTProps } from "../../types";
import ethereum from "../../assets/ethereum.svg";
const style = {
  topBar: `bg-[#303339] p-2 rounded-t-lg`,
  topBarContent: `flex items-center`,
  likesCounter: `flex-1 flex items-center justify-end`,
};

const NFTImage = ({ selectedNft }: NFTProps) => {
  return (
    <div className="border border-[#303339] rounded-lg">
      <div className={style.topBar}>
        <div className={style.topBarContent}>
          {/* <IoMdSnow /> */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
            alt="ethereum"
            className="w-3"
          />
          <div className={style.likesCounter}>
            <span className="pr-2">2.3K</span>
            <AiOutlineHeart />
          </div>
        </div>
      </div>
      <div>
        {selectedNft?.metadata.image && (
          <img
            src={selectedNft?.metadata.image ? selectedNft?.metadata.image : ""}
            className="lg:w-[70%] mx-auto object-cover"
          />
        )}
        {!selectedNft?.metadata.image && (
          <div
            role="status"
            className="justify-center items-center space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
          >
            <div className="flex justify-center items-center sm:w-80 h-80 bg-gray-300 rounded  dark:bg-gray-700">
              <svg
                className="w-32 h-32 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTImage;
