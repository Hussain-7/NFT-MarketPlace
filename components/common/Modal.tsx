import React from "react";
import { Modal } from "flowbite-react";
import Loader from "./Loader";

type Props = {
  toggle: boolean;
  loading: boolean;
  toggleShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  listItem: (price: number) => Promise<void>;
};

const CustomModal = ({
  toggle = true,
  loading = true,
  toggleShowModal,
  listItem,
}: Props) => {
  const [price, setPrice] = React.useState<number>(0);
  return (
    <Modal show={toggle}>
      <div className="flex flex-col justify-center items-center p-10 space-y-4 w-full mx-auto">
        <div className="text-3xl font-bold text-left w-full font-sans">
          List for sale
        </div>
        <button
          className="absolute top-3 right-6"
          onClick={() => toggleShowModal(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col w-full">
          {" "}
          <div className="rounded-md flex space-x-4 border-2 border-blue-600 w-full">
            {" "}
            <input
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              type="number"
              placeholder="Amout"
              className="p-4 flex-1 border-none outline-none hover:outline-none
						focus:outline-none focus:ring-0  rounded-md text-black text-lg"
            />
            {/* Create drop down menu for token name */}
            <select
              className="p-4 w-[20%] border-none outline-none  hover:outline-none
						focus:outline-none focus:ring-0  rounded-md text-black"
            >
              <option value="FUSD">ETH</option>
            </select>
          </div>
          <div className="text-gray-600 text-md font-normal">
            ${price > 0 ? price * 1100 : 0} Total
          </div>
        </div>
        <button
          // Blue open sea type button
          className="bg-blue-600 text-white rounded-md p-4 w-full"
          onClick={() => {
            listItem(price);
          }}
        >
          {loading ? <Loader text={"Listing..."} /> : " Complete listing"}
        </button>
      </div>

      <div />
    </Modal>
  );
};

export default CustomModal;
