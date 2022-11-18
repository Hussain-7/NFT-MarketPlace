import React from "react";
type NFTCardProps = {
  nftItem: {
    image: string;
  };
};

const NFTCard = ({ nftItem }: NFTCardProps) => {
  return <img src={nftItem.image} alt="" />;
};

export default NFTCard;
