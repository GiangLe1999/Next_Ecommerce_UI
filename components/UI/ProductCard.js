import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import Link from "next/link";
import FlyingButton from "./FlyingButton";

import { primary, subColor } from "@/lib/colors";
import { largeShadow, smallShadow } from "@/lib/boxShadow";
import {
  AddToCartIcon,
  DefaultWishlistIcon,
  FilledWishlistIcon,
} from "../Layout/ButtonIcon";
import axios from "axios";
import { useSession } from "next-auth/react";

const ProductCard = ({
  data,
  wished,
  largeshadow = false,
  onRemoveFromWishList = () => {},
}) => {
  const { data: session } = useSession();
  const [domLoaded, setDomLoaded] = useState(false);
  const [isWished, setIsWished] = useState(wished || false);

  const addToWishlistHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const nextValue = !isWished;

    if (nextValue === false && onRemoveFromWishList) {
      onRemoveFromWishList(data._id);
    }

    axios
      .post("/api/wishlist", {
        productId: data._id,
      })
      .then(() => {});

    setIsWished(nextValue);
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const url = "/product/" + data._id;
  return (
    <ProductWrapper>
      <WhiteBox href={url} largeshadow={largeShadow}>
        {session && (
          <WishlistButton onClick={addToWishlistHandler} isWished={isWished}>
            {isWished ? <FilledWishlistIcon /> : <DefaultWishlistIcon />}
          </WishlistButton>
        )}
        <StyledImage
          src={data.images[0]}
          alt={data.title}
          width={200}
          height={200}
        />
      </WhiteBox>
      <ProductInfoBox>
        <Brand>{data.properties.Brand}</Brand>
        <TitleAndPrice>
          <Title href={url}>{data.title}</Title>
          <Price>${data.price}</Price>
        </TitleAndPrice>
        {domLoaded && (
          <FlyingButton
            _id={data._id}
            src={data.images[0]}
            fullwidth="yes"
            primary="yes"
          >
            <AddToCartIcon /> Add to cart
          </FlyingButton>
        )}
      </ProductInfoBox>
    </ProductWrapper>
  );
};

const WhiteBox = styled(Link)`
  width: 100%;
  aspect-ratio: 1;
  background-color: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  position: relative;
  > div {
    position: unset !important;
  }
  overflow: hidden;

  box-shadow: ${smallShadow};
  ${(props) =>
    props.largeshadow &&
    css`
      box-shadow: ${largeShadow};
    `}
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100% !important;
  height: unset !important;
`;

const WishlistButton = styled.button`
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  background-color: transparent;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    color: ${primary};
  }
  ${(props) =>
    props.isWished &&
    css`
      svg {
        color: ${subColor};
      }
    `}
`;

const ProductWrapper = styled.div``;

const Title = styled(Link)`
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0;
  color: ${primary};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 190px;
`;

const ProductInfoBox = styled.div`
  margin-top: 10px;
`;

const TitleAndPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 15px;
  border-bottom: 1px solid #c9c3ff;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Brand = styled.h4`
  margin: 0;
  font-weight: 400;
  font-size: 0.8rem;
  color: ${subColor};
`;

export default ProductCard;
