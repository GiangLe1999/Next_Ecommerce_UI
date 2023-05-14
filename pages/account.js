import React, { useEffect, useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import Center from "@/components/Layout/Center";
import TitleStyle from "@/components/UI/Title";
import styled from "styled-components";
import { ButtonStyle } from "@/components/UI/Button";
import {
  CheckIcon,
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
import TabsComponent from "@/components/UI/Tabs";
import SingleOrder from "@/components/UI/SingleOrder";

const AccountPage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [wishedProducts, setWishedProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [isUserInfoLoading, setIsUserInfoLoading] = useState(false);
  const [isListLoading, setIsListLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  // Login
  const loginHandler = async () => {
    await signIn("google");
  };

  // Logout
  const logoutHandler = async () => {
    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL });
  };

  // Xử lý update User info
  const submitHandler = (e) => {
    e.preventDefault();
    const data = { name, email, city, postalCode, streetAddress, country };
    axios.put("/api/user-info", data);
  };

  // Fetch data User info
  useEffect(() => {
    if (!session) {
      return;
    }

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
  }, [session]);

  // Fetch data wishlist
  useEffect(() => {
    if (!session) {
      return;
    }

    setIsListLoading(true);
    axios.get("/api/wishlist").then((res) => {
      setWishedProducts(res.data.map((wp) => wp.product));
      setIsListLoading(false);
    });
  }, [session]);

  // Fetch data orders
  useEffect(() => {
    if (!session) {
      return;
    }

    setIsOrderLoading(true);
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
      setIsOrderLoading(false);
    });
  }, [session]);

  // Remove Product khỏi wishilist
  const removeFromWishlistHandler = (_id) => {
    setWishedProducts((prev) => {
      return [...prev].filter((p) => p._id.toString() !== _id);
    });
  };

  return (
    <Wrapper>
      <Center>
        <RevealWrapper>
          <ColsWrapper>
            {/* Wishlist */}
            <Box>
              <TabsComponent
                tabslist={[
                  {
                    tabName: "Your Wishlist",
                    tabContent: (
                      <>
                        {!isListLoading && wishedProducts.length === 0 && (
                          <RevealWrapper>
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
                                  Seems like you don&apos;t have wishes here.
                                </EmptyParagraph>
                                <EmptyParagraph>
                                  Let&apos; make a wish at{" "}
                                  <Link href="/products">All Products</Link>{" "}
                                  page after logging your Google Account!
                                </EmptyParagraph>
                              </EmptyText>
                            </EmptySection>
                          </RevealWrapper>
                        )}
                        {isListLoading && <Spinner fullwidth="yes" />}
                        {wishedProducts.length > 0 && !isListLoading && (
                          <RevealWrapper>
                            <WishedProductGrid>
                              {wishedProducts.map((wp) => (
                                <ProductCard
                                  key={wp._id}
                                  data={wp}
                                  wished={true}
                                  largeshadow={true}
                                  onRemoveFromWishList={
                                    removeFromWishlistHandler
                                  }
                                />
                              ))}
                            </WishedProductGrid>
                          </RevealWrapper>
                        )}
                      </>
                    ),
                  },
                  {
                    tabName: "Your orders",
                    tabContent: (
                      <>
                        {isOrderLoading && <Spinner fullwidth="yes" />}
                        {!isListLoading && orders.length > 0 && (
                          <RevealWrapper>
                            <OrderTitle>
                              {orders.length} order
                              {orders.length > 1 ? "s" : ""} completed
                              <CheckIcon />
                            </OrderTitle>
                            {orders.map((o) => (
                              <SingleOrder key={o._id} order={o} />
                            ))}
                          </RevealWrapper>
                        )}
                        {!isListLoading && orders.length === 0 && (
                          <RevealWrapper>
                            <EmptySection>
                              <EmptyImageWrapper>
                                <EmptyImage
                                  src="/assets/empty-order-5.png"
                                  alt="Empty wishlist"
                                  width={500}
                                  height={373}
                                />
                              </EmptyImageWrapper>
                              <EmptyText>
                                <EmptyTitle>Your Orders is empty!</EmptyTitle>
                                <EmptyParagraph>
                                  Seems like you did not complete any Order.
                                </EmptyParagraph>
                                <EmptyParagraph>
                                  Let&apos; find interesting products on our{" "}
                                  <Link href="/products">All Products</Link>{" "}
                                  page.
                                </EmptyParagraph>
                              </EmptyText>
                            </EmptySection>
                          </RevealWrapper>
                        )}
                      </>
                    ),
                  },
                ]}
              />
            </Box>

            {/* Form user info */}
            <AccountDetailBox>
              <RevealWrapper>
                {/* Đã đăng nhập */}
                {session && (
                  <>
                    {" "}
                    <Title>Account details</Title>
                    {isUserInfoLoading ? (
                      <Spinner fullwidth="yes" />
                    ) : (
                      <RevealWrapper>
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
                            <StyledLabel htmlFor="street">
                              Street Address
                            </StyledLabel>
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
                            <Button type="submit" primary="yes" fullwidth="yes">
                              <SaveIcon /> Save Info
                            </Button>
                            <Line />
                            <LogoutBtnSection>
                              <LogoutBtn
                                onClick={logoutHandler}
                                primary="yes"
                                fullwidth="yes"
                              >
                                <LogoutIcon />
                                Log Out
                              </LogoutBtn>
                            </LogoutBtnSection>
                          </FormActions>
                        </StyledForm>
                      </RevealWrapper>
                    )}
                  </>
                )}

                {/* Chưa đăng nhập */}
                {!session && (
                  <LoginSection>
                    <LoginTitle>Your&apos;re not logged in</LoginTitle>
                    <LoginParagraph>
                      You can create a list of products you want to buy on our
                      website after logging in with your Google Account.
                    </LoginParagraph>
                    <LoginBtn onClick={loginHandler}>
                      <GoogleIconWrapper>
                        <GoogleIcon src="/assets/google-icon.webp" />
                      </GoogleIconWrapper>
                      <p>Sign in with Google</p>
                    </LoginBtn>
                  </LoginSection>
                )}
              </RevealWrapper>
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

const LogoutBtn = styled.button`
  ${ButtonStyle}
  padding: 10px 25px;

  svg {
    height: 23px;
    width: 23px;
    margin-right: 3px;
  }
`;

const LoginSection = styled.div`
  text-align: center;
`;

const LoginTitle = styled.p`
  font-size: 1.4rem;
  margin-top: 0;
  margin-bottom: 10px;
  font-weight: 500;
`;

const LoginParagraph = styled.p`
  font-size: 0.8rem;
  margin-bottom: 20px;
`;

const LoginBtn = styled.button`
  background-color: #2272f4;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 3px;

  p {
    color: #fff;
    margin: 0;
    font-size: 1.1rem;
    flex-grow: 1;
  }

  &:hover {
    background-color: #2769d5;
  }
`;

const GoogleIconWrapper = styled.div`
  width: 50px;
  aspect-ratio: 1;
  background-color: #fff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoogleIcon = styled.img`
  width: 50%;
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
  text-align: center;
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
  font-size: 1.4rem;
  font-weight: 500;
  margin: 10px 0 15px;
`;

const EmptyParagraph = styled.p`
  margin: 0 0 5px;
  font-size: 0.8rem;

  a {
    font-weight: bold;
    color: ${primary};
    text-decoration: underline;

    &:hover {
      color: ${hoverColor};
    }
  }
`;

const OrderTitle = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  gap: 5px;
  font-weight: 600;

  svg {
    width: 25px;
    height: 25px;
  }
`;

const Box = styled.div`
  ${BoxStyle}
`;

const AccountDetailBox = styled.div`
  ${BoxStyle}
  max-height: 600px;
  height: auto;
`;

const LogoutBtnSection = styled.div``;

const Line = styled.hr`
  margin: 25px 0;
  color: #ccc;
`;

export default AccountPage;
