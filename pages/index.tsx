import { useWeb3, Web3ContextInterface } from "@3rdweb/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/common/Header";
import Hero from "../components/Hero";
import { useEffect } from "react";
import { client } from "../lib/sanityClient";
import toast, { Toaster } from "react-hot-toast";
const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
};

const Home: NextPage = () => {
  const { address, connectWallet } = useWeb3();

  const welcomeUser = (userName: string, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== "Unamed" ? `, ${userName}` : ""}!`,
      {
        style: {
          background: "#04111d",
          color: "#fff",
        },
      }
    );
  };
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
      welcomeUser(result.userName);
    })();
  }, [address]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
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
