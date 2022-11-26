import Image from "next/image";
import {
  useAddress,
  useUser,
  useDisconnect,
  useLogout,
  useMetamask,
} from "@thirdweb-dev/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import logosvg from "../../assets/logo.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useRouter } from "next/router";
import { MarketPlaceContext } from "../../context/MarketPlace";
import { BiLogOut, BiLogOutCircle, BiUser } from "react-icons/bi";

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
  const address = useAddress();
  const { user } = useContext(MarketPlaceContext);
  const [showMenu, setShowMenu] = useState(false);
  const disconnect = useDisconnect();
  useEffect(() => {
    if (!address) router.push("/", undefined, { shallow: true });
  }, [address]);
  const Logout = () => {
    disconnect();
    router.push("/");
  };
  return (
    <div className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={logosvg} height={70} width={70} alt="some" />
        </div>
      </Link>
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
        <Link href="/collections/0x97c4ffB08C8438e671951Ae957Dc77c1f0777D75">
          <div className={style.headerItem}> Collections </div>
        </Link>
        <Link href="/create">
          <div className={style.headerItem}> Create </div>
        </Link>
        {/* {user.address && (
          <Link href={`/profile/${user.address}`}>
            <div className={style.headerItem}> My assets </div>
          </Link>
        )} */}

        <div
          className={style.headerIcon}
          onMouseOver={() => {
            console.log("enter");
            setShowMenu(true);
          }}
          // onMouseLeave={() => {
          //   console.log("leave");
          // }}
          onMouseOut={() => {
            console.log("out");
            setShowMenu(false);
          }}
        >
          {/* Create dropdown menu here */}
          <CgProfile />

          {showMenu && (
            <div className="relative z-50">
              <div className="absolute top-0 right-0">
                <div
                  id="dropdown"
                  className="z-1000 w-44 bg-[#04111d] text-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
                >
                  <ul
                    className="py-1 text-sm text-white dark:text-gray-200"
                    aria-labelledby="dropdownDefault"
                  >
                    <li>
                      <Link
                        href={`/profile/${user.address}`}
                        className="py-2 px-4 hover:bg-[#1b2e41] dark:hover:bg-gray-600 dark:hover:text-white flex flex-row items-center justify-start"
                      >
                        <BiUser fontSize={20} className="mr-3" />{" "}
                        <span>View Profile</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={Logout}
                        className="w-full text-left py-2 px-4 hover:bg-[#1b2e41] dark:hover:bg-gray-600 dark:hover:text-white flex flex-row items-center justify-start"
                      >
                        <BiLogOut fontSize={20} className="mr-3" />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={style.headerIcon}>
          <MdOutlineAccountBalanceWallet />
        </div>
      </div>
    </div>
  );
};

export default Header;
