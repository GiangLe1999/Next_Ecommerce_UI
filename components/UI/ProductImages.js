import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { primary } from "@/lib/colors";
import css from "styled-jsx/css";
import { Box } from "@/pages/cart";
import { LeftNavIcon, RightNavIcon } from "./ProductImagesIcon";

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  const backwardImageHandler = () => {
    setActiveImage((prev) => {
      const currentIndex = images.indexOf(prev);
      if (currentIndex === 0) {
        return images[images.length - 1];
      } else {
        return images[currentIndex - 1];
      }
    });
  };

  const upwardImageHandler = () => {
    setActiveImage((prev) => {
      const currentIndex = images.indexOf(prev);
      if (currentIndex === images.length - 1) {
        return images[0];
      } else {
        return images[currentIndex + 1];
      }
    });
  };

  return (
    <Box>
      <BigImageWrapper>
        <BigImage
          src={activeImage}
          alt={images?.[0]}
          width={400}
          height={400}
        />
        <LeftButton onClick={backwardImageHandler}>
          <LeftNavIcon />
        </LeftButton>
        <RightButton onClick={upwardImageHandler}>
          <RightNavIcon />
        </RightButton>
      </BigImageWrapper>
      <SmallImagesWrapper>
        {images.map((image) => (
          <SmallImage
            key={image}
            onClick={() => {
              setActiveImage(image);
            }}
            isActive={activeImage === image}
          >
            <Image src={image} alt={image} width={100} height={100} />
          </SmallImage>
        ))}
      </SmallImagesWrapper>
    </Box>
  );
};

const LeftButton = styled.div`
  position: absolute;
  width: 40px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  cursor: pointer;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;

  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 9px;
    left: 9px;
  }

  &:hover,
  &:active {
    background-color: #ededed;
  }
`;

const RightButton = styled.div`
  position: absolute;
  width: 40px;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  cursor: pointer;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;

  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 9px;
    left: 9px;
  }

  &:hover,
  &:active {
    background-color: #ededed;
  }
`;

const BigImageWrapper = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    ${LeftButton}, ${RightButton} {
      display: block;
      transition: all 0.4s linear;
    }
  }
`;

const BigImage = styled(Image)`
  object-fit: contain;
  width: 100% !important;
  position: relative !important;
  height: unset !important;
`;

const SmallImagesWrapper = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;

  @media screen and (max-width: 767px) and (min-width: 200px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SmallImage = styled.div`
  border: 1px solid #aaa;
  padding: 10px;
  border-radius: 3px;
  aspect-ratio: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.isActive &&
    css`
      border-color: ${primary};
    `}

  &:hover {
    border-color: ${primary};
  }
`;

export default ProductImages;
