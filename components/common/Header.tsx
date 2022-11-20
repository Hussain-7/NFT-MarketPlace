import Image from "next/image";
import {
  useAddress,
  useUser,
  useDisconnect,
  useLogout,
  useMetamask,
} from "@thirdweb-dev/react";
import Link from "next/link";
import React, { useEffect } from "react";
import logosvg from "../../assets/logo.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useRouter } from "next/router";
const style = {
  wrapper: `bg-[#04111d] w-[100%] px-[10%] py-[0.8rem] flex flex-col  items-center gap-y-5 lg:flex-row`,
  logoContainer: `flex items-center cursor-pointer mr-4`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
};
const Header = () => {
  const router = useRouter();
  const disconnect = useDisconnect();
  const Logout = () => {
    disconnect();
    router.push("/");
  };
  return (
    <div className={style.wrapper}>
      <a href="/">
        <div className={style.logoContainer}>
          <Image src={logosvg} height={70} width={70} alt="some" />
        </div>
      </a>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          placeholder="Search items, collections, and accounts"
        />
      </div>
      <div className={style.headerItems}>
        <a href="/collections/0x97c4ffB08C8438e671951Ae957Dc77c1f0777D75">
          <div className={style.headerItem}> Collections </div>
        </a>
        {/* <div className={style.headerItem}> Stats </div> */}
        {/* <div className={style.headerItem}> Resources </div> */}
        <div className={style.headerItem}> Create </div>
        <div className={style.headerIcon}>
          <CgProfile onClick={Logout} />
        </div>
        <div className={style.headerIcon}>
          <MdOutlineAccountBalanceWallet />
        </div>
      </div>
    </div>
  );
};

export default Header;
