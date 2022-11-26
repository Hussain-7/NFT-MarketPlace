import { ContractEvent } from "@thirdweb-dev/sdk";
import React from "react";
import { BsFillCartFill } from "react-icons/bs";

const style = {
  eventItem: `flex px-4 py-5 font-medium`,
  event: `flex items-center`,
  eventIcon: `mr-2 text-xl`,
  eventName: `text-lg font-semibold`,
  eventPrice: `flex items-center`,
  eventPriceValue: `text-lg`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
};

type Props = {
  event: ContractEvent<Record<string, any>>;
};

const EventItem = ({ event }: Props) => {
  return (
    <div className={style.eventItem}>
      <div className={`${style.event} flex-[2]`}>
        <div className={style.eventIcon}>
          <BsFillCartFill />
        </div>
        <div className={style.eventName}>{event.eventName}</div>
      </div>
      <div className={`${style.eventPrice} flex-[2]`}>
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
        {event.data?.lister?.slice(0, 10)}
      </div>
      <div className={`${style.accent} flex-[3]`}>
        {event.data?.buyer ? event.data?.buyer?.slice(0, 10) : "-"}
      </div>
      <div className={`${style.accent} flex-[2]`}>2 months ago</div>
    </div>
  );
};

export default EventItem;
