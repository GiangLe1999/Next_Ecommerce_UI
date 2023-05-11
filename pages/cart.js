import styled, { css } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { RevealWrapper } from "next-reveal";

import Center from "@/components/Layout/Center";
import Checkout from "@/components/CartPage/Checkout";
import OrderInfo from "@/components/CartPage/OrderInfo";
import { CartContext } from "@/store/cart-context";
import SuccessCheckout from "@/components/CartPage/SuccessCheckout";
import { largeShadow } from "@/lib/boxShadow";

const CartPage = () => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window?.location.href.includes("success")) {
      setCartProducts([]);
      setIsSuccess(true);
    }
  }, []);

  if (isSuccess) {
    return <SuccessCheckout />;
  }

  return (
    <Center>
      <RevealWrapper>
        <ColumnsWrapper>
          <Checkout />
          <OrderInfo />
        </ColumnsWrapper>
      </RevealWrapper>
    </Center>
  );
};

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;

  @media screen and (min-width: 1024px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
`;

export const BoxStyle = css`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: ${largeShadow};
`;

export const Box = styled.div`
  ${BoxStyle}
`;

export default CartPage;
