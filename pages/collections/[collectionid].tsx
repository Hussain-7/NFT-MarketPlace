import { useRouter } from "next/router";
import React from "react";

const CollectionId = () => {
  const router = useRouter();
  return <div>{router.query.collectionid}</div>;
};

export default CollectionId;
