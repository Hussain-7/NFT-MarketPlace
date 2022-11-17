import { useWeb3, Web3ContextInterface } from "@3rdweb/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { useEffect } from "react";
import { client } from "../lib/sanityClient";
const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
};

const Home: NextPage = () => {
  const { address, connectWallet } = useWeb3();
  useEffect(() => {
    if (!address) return;
    (async () => {
      const userDoc = {
        _type: "users",
        _id: address,
        userName: "Unamed",
        walletAddress: address,
      };
      const result = await client.createIfNotExists(userDoc);
    })();
  }, [address]);

  return (
    <>
      {address ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          <div className={style.button}>
            <button onClick={() => connectWallet("injected")}>
              Connect Wallet
            </button>
          </div>
          <div className={style.details}>
            Connect your wallet to view your collections
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
