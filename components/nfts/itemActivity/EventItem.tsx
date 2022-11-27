import { ContractEvent, NFT } from "@thirdweb-dev/sdk";
import React, { useEffect } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { addresses } from "../../../lib/constants";
import useMediaQuery from "../../../hooks/useMediaQuery";

const style = {
  eventItem: `flex flex-col space-y-2 w-full md:flex-row px-4 py-5 font-medium`,
  event: `flex items-center`,
  eventIcon: `mr-2 md:text-xl`,
  eventName: `md:text-lg font-semibold`,
  eventPrice: `flex items-center`,
  eventPriceValue: `text-lg`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
  heading: `flex items-center justify-between`,
};
type Props = {
  event: ContractEvent<Record<string, any>>;
};
const getDaysAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days == 0) {
    return "Today";
  }
  return `${days} days ago`;
};

const EventItem = ({ event }: Props) => {
  const matches = useMediaQuery({ query: "(max-width: 700px)" });
  return (
    <div className={style.eventItem}>
      <div className={`${style.event} flex-[2]`}>
        {matches&&<div className="mr-4  text-bold">Event : </div>}
        <div className={style.eventIcon}>
          <BsFillCartFill />
        </div>
        <div className={style.eventName}>{event.eventName}</div>
      </div>
      <div className={`${style.eventPrice} flex-[2]`}>
      {matches&&<div className="mr-4  text-bold">Price : </div>}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
          alt="eth"
          className={style.ethLogo}
        />
        <div className={style.eventPriceValue}>
          {parseInt(
            event.data?.totalPricePaid?._hex
              ? event.data?.totalPricePaid?._hex
              : event?.data?.listing[8]
          ) /
            10 ** 18}
        </div>
      </div>
      <div className={`${style.accent} flex-[3]`}>
      {matches&&<span className="mr-4  text-bold text-white">From : </span>}
        {event.data?.lister?.slice(0, 10)}
      </div>
      <div className={`${style.accent} flex-[3]`}>
      {matches&&<span className="mr-4  text-bold text-white">To : </span>}
        {event.data?.buyer
          ? event.data?.buyer?.slice(0, 10)
          : addresses.MarketPlaceContract_Address.slice(0, 10)}
      </div>
      <div className={`${style.accent} flex-[2]`}>
      {matches&&<span className="mr-4 text-bold text-white">Date : </span>}
        {event.data.listing
          ? getDaysAgo(new Date(parseInt(event?.data?.listing[4]._hex) * 1000))
          : "-"}
      </div>
    </div>
  );
};

export default EventItem;
