import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { CgArrowsExchangeV } from "react-icons/cg";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useState } from "react";
import { dummyEvents } from "../../static/dummyEvents";
import { NFTProps } from "../../types";
import EventItem from "./itemActivity/EventItem";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useAddress } from "@thirdweb-dev/react";
import { MarketPlaceContext } from "../../context/MarketPlace";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import useMediaQuery from "../../hooks/useMediaQuery";
import { motion } from "framer-motion";
type Props = {};

const style = {
  wrapper: `w-full mt-8 border border-[#151b22] rounded-xl bg-[#303339] overflow-hidden`,
  title: `bg-[#262b2f] px-6 py-4 flex items-center`,
  titleLeft: `flex-1 flex items-center text-xl font-bold`,
  titleIcon: `text-3xl mr-2`,
  titleRight: `text-xl`,
  filter: `flex items-center border border-[#151b22] mx-4 my-6 px-3 py-4 rounded-xl bg-[#363840]`,
  filterTitle: `flex-1`,
  tableHeader: `flex w-full bg-[#262b2f] border-y border-[#151b22] mt-8 px-4 py-1`,
  tableHeaderElement: `flex-1 text-[#8a939b] text-sm`,
  filterIcon: `text-2xl`,
  activityTable: `w-full`,

  eventItem: `flex px-4`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
};

const ItemActivity = ({ selectedNft }: NFTProps) => {
  const [show, setShow] = useState(false);
  const matches = useMediaQuery({ query: "(max-width: 700px)" });

  const [toggle, setToggle] = useState(false);
  const { events } = useContext(MarketPlaceContext);
  return (
    <div className={style.wrapper}>
      <div className={style.title} onClick={() => setToggle(!toggle)}>
        <div className={style.titleLeft}>
          <span className={style.titleIcon}>
            <CgArrowsExchangeV />
          </span>
          Item Activity
        </div>
        <div className={style.titleRight}>
          {toggle ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle />}
        </div>
      </div>
      {toggle && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className={style.activityTable}
        >
          <div className={style.filter}>
            <div className={style.filterTitle}>Filter</div>
            <div className={style.filterIcon}>
              {" "}
              <FiFilter />{" "}
            </div>
          </div>
          {!matches && (
            <div className={style.tableHeader}>
              <div className={`${style.tableHeaderElement} flex-[2]`}>
                Event
              </div>
              <div className={`${style.tableHeaderElement} flex-[2]`}>
                Price
              </div>
              <div className={`${style.tableHeaderElement} flex-[3]`}>From</div>
              <div className={`${style.tableHeaderElement} flex-[3]`}>To</div>
              <div className={`${style.tableHeaderElement} flex-[2]`}>Date</div>
            </div>
          )}
          {events?.map((event, id) => (
            <EventItem key={id} event={event} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ItemActivity;
