import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { RevealWrapper } from "next-reveal";

import Center from "../Layout/Center";
import { AddToCartIcon, ReadMoreIcon } from "../Layout/ButtonIcon";
import ButtonLink from "../UI/ButtonLink";
import FlyingButton from "../UI/FlyingButton";
import { primary } from "@/lib/colors";

const FeaturedProducts = ({ data }) => {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <Background>
      <Center>
        <ColumnWrapper>
          <StyledRevealWrapper delay={0}>
            <Column>
              <Title>{data.title}</Title>
              <Description>{data.description}</Description>
              <ButtonWrapper>
                <ButtonLink href={`/product/${data._id}`} white={1} size="l">
                  <ReadMoreIcon />
                  Read more
                </ButtonLink>
                {domLoaded && (
                  <FlyingButton
                    src={"/assets/home-main-image2.png"}
                    size="l"
                    fullWidthMobile
                    white
                    _id={data._id}
                  >
                    <AddToCartIcon />
                    Add to cart
                  </FlyingButton>
                )}
              </ButtonWrapper>
            </Column>
          </StyledRevealWrapper>
          <StyledRevealWrapper delay={100}>
            <MainImageWrapper>
              <StyledImage
                src={"/assets/home-main-image2.png"}
                alt="Home page main image"
                width={920}
                height={420}
                priority={true}
                objectFit="contain"
              />
            </MainImageWrapper>
          </StyledRevealWrapper>
        </ColumnWrapper>
      </Center>
    </Background>
  );
};

const StyledRevealWrapper = styled(RevealWrapper)`
  display: flex;
  align-items: center;
`;

const Background = styled.div`
  background-color: ${primary};
  color: #fff;
  padding: 40px 0 60px;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Description = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100% !important;
  height: unset !important;
`;

const MainImageWrapper = styled.div`
  width: 100%;
  > div {
    position: unset !important;
  }
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    div:nth-child(1) {
      order: 0;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: flex-star;
  flex-direction: column;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;

  @media screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export default FeaturedProducts;
