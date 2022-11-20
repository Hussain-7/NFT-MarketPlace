import { ThirdwebAuth } from "@thirdweb-dev/auth/next";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  privateKey:
    process.env.ADMIN_PRIVATE_KEY ||
    "3f76309db075a07abd171a71ca83bb2c020886bcb235a87e84337cdb721c38f8",
  domain: "localhost:3000",
});

export default ThirdwebAuthHandler();
