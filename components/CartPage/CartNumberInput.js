import { primary } from "@/lib/colors";
import { CartContext } from "@/store/cart-context";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const CartNumberInput = (props) => {
  const { setCartProducts } = useContext(CartContext);

  const [productsInCart, setProductsInCart] = useState(
    props.changedFormProducts || []
  );

  const inputChangeHandler = (e) => {
    setProductsInCart((prev) => {
      let newProdInCart = [...prev];
      newProdInCart.forEach((p) => {
        if (p.id === props.prodId) {
          p.quantity = Number(e.target.value);
        }
      });
      return newProdInCart;
    });
  };

  useEffect(() => {
    let products = [];
    if (productsInCart.length > 0) {
      productsInCart.forEach((p) => {
        for (let i = 0; i < p.quantity; i++) {
          products.push(p.id);
        }
      });
    }
    setCartProducts(products);
  }, [productsInCart]);

  return (
    <InputBox>
      <Input
        type="number"
        defaultValue={props.defaultValue}
        min={0}
        max={500}
        onChange={inputChangeHandler}
      />
    </InputBox>
  );
};

const InputBox = styled.div`
  position: relative;
  width: 80px;
  height: 50px;

  &:before {
    height: 50%;
    position: absolute;
    top: 1px;
    right: 1px;
    color: white;
    font-size: 16px;
    content: "+";
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
    background-color: ${primary};
    border-top-right-radius: 10px;
    border-left: 1px solid rgba(173, 173, 173, 0.5);
    border-bottom: 1px solid rgba(2, 2, 2, 0.5);
  }

  &:after {
    background-color: ${primary};
    border-bottom-right-radius: 10px;
    padding-top: 3px;
    height: 40%;
    position: absolute;
    bottom: 1px;
    right: 1px;
    color: white;
    font-size: 20px;
    content: "-";
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    width: 30%;
    border-left: 1px solid rgba(173, 173, 173, 0.5);
    border-top: 1px solid rgba(173, 173, 173, 0.5);
  }
`;

const Input = styled.input`
  font-size: 18px;
  box-sizing: border-box;
  display: block;
  margin: 0 auto 40px;
  border: none;
  border-radius: 10px;
  color: #777777;
  padding: 20px 30px 20px 20px;
  width: 100%;
  height: 50px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5) inset;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }

  &::-webkit-inner-spin-button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    margin: auto;
    transform: scale(2);
    transform-origin: right center;
    cursor: pointer;
  }

  &::-webkit-contacts-auto-fill-button {
    opacity: 0;
  }
`;

export default CartNumberInput;
