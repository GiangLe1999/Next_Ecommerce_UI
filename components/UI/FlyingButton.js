/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import css from "styled-jsx/css";

import { primary } from "@/lib/colors";
import { CartContext } from "@/store/cart-context";
import { hoverColor } from "@/lib/colors";

const FlyingButton = (props) => {
  const { addProdToCart } = useContext(CartContext);
  const imgRef = useRef();
  function sendImageToCartHandler(ev) {
    imgRef.current.style.display = "inline-block";
    imgRef.current.style.left = ev.clientX - 50 + "px";
    imgRef.current.style.top = ev.clientY - 50 + "px";
    setTimeout(() => {
      imgRef.current.style.display = "none";
    }, 1000);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef.current?.closest("div[data-sr-id]");
      if (reveal?.style.opacity === "1") {
        // visible
        reveal.style.transform = "none";
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FlyingButtonWrapper {...props} onClick={() => addProdToCart(props._id)}>
        <img src={props.src} alt="" ref={imgRef} />
        <button {...props} onClick={(e) => sendImageToCartHandler(e)}></button>
      </FlyingButtonWrapper>
    </>
  );
};

const FlyingButtonWrapper = styled.div`
  @keyframes fly {
    100% {
      top: 0;
      left: 70%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }

  img {
    display: none;
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    z-index: 5;
    animation: fly 1s ease-in;
    border-radius: 5px;
  }

  button {
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    transition: all 0.2s linear;

    &:hover {
      background-color: ${hoverColor};
      outline-color: ${hoverColor};
    }

    svg {
      margin-right: 5px;
      height: 20px;
    }

    ${(props) =>
      props.primary &&
      css`
        background-color: ${primary};
        color: #fff;
        outline: 1px solid ${primary};
        justify-content: center;
        padding: 10px 0;

        svg {
          margin-right: 5px;
          height: 20px;
        }
      `}

    ${(props) =>
      props.fullwidth &&
      css`
        width: 100%;
      `}

      ${(props) =>
      props.fullwidthmobile &&
      css`
        @media screen and (max-width: 768px) {
          width: 100%;
          padding: 5px 15px;
        }
      `}

    ${(props) =>
      props.size === "l" &&
      css`
        font-size: 1.2rem;
        padding: 10px 20px;
        font-weight: 500;

        svg {
          height: 20px;
        }
      `};

    ${(props) =>
      props.white &&
      css`
        background-color: white;
        outline: 1px solid white;
        color: #000;

        &:hover {
          background-color: ${primary};
          outline: 1px solid white;
          color: white;
        }
      `}
  }
`;

export default FlyingButton;
