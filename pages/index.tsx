import {
  useAddress,
  useUser,
  useDisconnect,
  useMetamask,
} from "@thirdweb-dev/react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/common/Header";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/common/Loader";
const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `w-fit border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
};

const Home: NextPage = () => {
  const connect = useMetamask();
  const address = useAddress();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const logIn = () => {
    setLoading(true);
    connect();
  };
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
    setLoading(false);
    console.log("address", address);
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
      {address && !loading ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          <div className={style.button}>
            {loading ? (
              <Loader width={2} color="04111d" text="Connect Wallet" />
            ) : (
              <button onClick={logIn}>Connect Wallet</button>
            )}
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
