import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect } from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
type Props = {
  children: any;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const address = useAddress();
  useEffect(() => {
    if (!address) router.push("/", undefined, { shallow: true });
  }, [address]);
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 20,
      }}
      className="overflow-hidden"
    >
      {address && <Header />}
      {children}
    </motion.div>
  );
};

export default Layout;
