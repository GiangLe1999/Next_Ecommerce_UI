import React, { useEffect, useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import Center from "@/components/Layout/Center";
import TitleStyle from "@/components/UI/Title";
import styled from "styled-components";
import { ButtonStyle } from "@/components/UI/Button";
import {
  LoginIcon,
  LogoutIcon,
  SaveIcon,
} from "@/components/Layout/ButtonIcon";
import { BoxStyle } from "./cart";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { primary } from "@/lib/colors";
import axios from "axios";
import Spinner from "@/components/UI/Spinner";
import ProductCard from "@/components/UI/ProductCard";
import { hoverColor } from "@/lib/colors";

const AccountPage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [wishedProducts, setWishedProducts] = useState([]);

  const [isUserInfoLoading, setIsUserInfoLoading] = useState(false);
  const [isListLoading, setIsListLoading] = useState(false);

  const loginHandler = async () => {
    await signIn("google");
  };

  const logoutHandler = async () => {
    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { name, email, city, postalCode, streetAddress, country };
    axios.put("/api/user-info", data);
  };

  useEffect(() => {
    setIsUserInfoLoading(true);
    axios.get("/api/user-info").then(({ data }) => {
      setName(data?.name);
      setEmail(data?.email);
      setCity(data?.city);
      setPostalCode(data?.postalCode);
      setStreetAddress(data?.streetAddress);
      setCountry(data?.country);
      setIsUserInfoLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsListLoading(true);
    axios.get("/api/wishlist").then((res) => {
      setWishedProducts(res.data.map((wp) => wp.product));
      setIsListLoading(false);
    });
  }, []);

  return (
    <Wrapper>
      <Center>
        <RevealWrapper>
          <ColsWrapper>
            {/* Wishlist */}
            <Box>
              <Title>Your Wishlist</Title>
              {!isListLoading && wishedProducts.length === 0 && (
                <EmptySection>
                  <EmptyImageWrapper>
                    <EmptyImage
                      src="/assets/empty-wishlist-3.png"
                      alt="Empty wishlist"
                      width={500}
                      height={373}
                    />
                  </EmptyImageWrapper>
                  <EmptyText>
                    <EmptyTitle>Your Wishlist is empty!</EmptyTitle>
                    <EmptyParagraph>
                      Seems like you don&apos;t have wishes here. Let&apos; make
                      a wish at <Link href="/products">All Products</Link> page!
                    </EmptyParagraph>
                  </EmptyText>
                </EmptySection>
              )}
              {isListLoading && <Spinner fullWidth />}
              {wishedProducts.length > 0 && !isListLoading && (
                <RevealWrapper>
                  <WishedProductGrid>
                    {wishedProducts.map((wp) => (
                      <ProductCard
                        key={wp._id}
                        data={wp}
                        wished={true}
                        largeShadow={true}
                      />
                    ))}
                  </WishedProductGrid>
                </RevealWrapper>
              )}
            </Box>

            {/* Form user info */}
            <AccountDetailBox>
              <Title>Account details</Title>
              {isUserInfoLoading ? (
                <Spinner fullWidth />
              ) : (
                <>
                  <StyledForm onSubmit={submitHandler}>
                    <div>
                      <StyledLabel htmlFor="name">Name</StyledLabel>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <StyledLabel htmlFor="email">Email</StyledLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <StyledLabel htmlFor="street">Street Address</StyledLabel>
                      <Input
                        id="street"
                        type="text"
                        placeholder="Your street address"
                        value={streetAddress}
                        name="streetAddress"
                        onChange={(e) => setStreetAddress(e.target.value)}
                      />
                    </div>
                    <CityHolder>
                      <div>
                        <StyledLabel htmlFor="city">City</StyledLabel>
                        <Input
                          id="city"
                          type="text"
                          placeholder="Your country"
                          value={city}
                          name="city"
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div>
                        <StyledLabel htmlFor="postalCode">
                          Postal code
                        </StyledLabel>
                        <Input
                          id="postalCode"
                          type="number"
                          placeholder="Only numbers"
                          value={postalCode}
                          name="postalCode"
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </div>
                    </CityHolder>
                    <div>
                      <StyledLabel htmlFor="country">Country</StyledLabel>
                      <Input
                        id="country"
                        type="text"
                        placeholder="Your country"
                        value={country}
                        name="country"
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                    <FormActions>
                      <Button type="submit" primary fullWidth>
                        <SaveIcon /> Save Info
                      </Button>
                      <Line />
                      <LogButtonSection>
                        {session ? (
                          <LogButton onClick={logoutHandler} primary fullWidth>
                            <LogoutIcon />
                            Log Out
                          </LogButton>
                        ) : (
                          <LogButton onClick={loginHandler} primary fullWidth>
                            <LoginIcon />
                            Log In
                          </LogButton>
                        )}
                      </LogButtonSection>
                    </FormActions>
                  </StyledForm>
                </>
              )}
            </AccountDetailBox>
          </ColsWrapper>
        </RevealWrapper>
      </Center>
    </Wrapper>
  );
};

const StyledForm = styled.form``;

const StyledLabel = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${primary};
`;

const CityHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
`;

const FormActions = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  margin-top: 40px;
`;

const Title = styled.h2`
  ${TitleStyle}
`;

const LogButton = styled.button`
  ${ButtonStyle}
  padding: 10px 25px;

  svg {
    height: 23px;
    width: 23px;
    margin-right: 3px;
  }
`;

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
  }
`;

const WishedProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 35px;

  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const EmptySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const EmptyImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  > div {
    position: unset !important;
  }
`;

const EmptyImage = styled(Image)`
  object-fit: contain;
  width: 80% !important;
  height: unset !important;
`;

const EmptyText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyTitle = styled.p`
  font-size: 1.5rem;
  margin: 10px 0 15px;
`;

const EmptyParagraph = styled.p`
  margin: 0;
  font-size: 0.8rem;

  a {
    font-weight: bold;
    font-size: 0.9rem;
    color: ${primary};
    text-decoration: underline;

    &:hover {
      color: ${hoverColor};
    }
  }
`;

const Box = styled.div`
  ${BoxStyle}
`;

const AccountDetailBox = styled.div`
  ${BoxStyle}
  max-height: 600px;
`;

const LogButtonSection = styled.div``;

const Line = styled.hr`
  margin: 25px 0;
  color: #ccc;
`;

export default AccountPage;
