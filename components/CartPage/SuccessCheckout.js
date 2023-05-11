import React from "react";
import { Box } from "@/pages/cart";
import Center from "../Layout/Center";

const SuccessCheckout = () => {
  return (
    <Center>
      <Box>
        <h1>Thanks for your order</h1>
        <p>We will email you when your order be ready.</p>
      </Box>
    </Center>
  );
};

export default SuccessCheckout;
