import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import Button from "@/components/UI/Button";
import Input from "../UI/Input";
import { primary } from "@/lib/colors";
import { CartContext } from "@/store/cart-context";
import axios from "axios";
import { largeShadow } from "@/lib/boxShadow";
import Spinner from "../UI/Spinner";
import { PaymentIcon } from "../Layout/ButtonIcon";
import { RevealWrapper } from "next-reveal";

const OrderInfo = () => {
  const { cartProducts } = useContext(CartContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/user-info").then(({ data }) => {
      setName(data?.name);
      setEmail(data?.email);
      setCity(data?.city);
      setPostalCode(data?.postalCode);
      setStreetAddress(data?.streetAddress);
      setCountry(data?.country);
      setIsLoading(false);
    });
  }, []);

  const goToPaymentHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (res.data.url) {
      window.location = res.data.url;
    }
  };

  return (
    <OrderInfoBox>
      <OrderTitle>Order information</OrderTitle>
      {isLoading ? (
        <Spinner fullwidth="yes" />
      ) : (
        <RevealWrapper>
          <StyledForm onSubmit={goToPaymentHandler}>
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
                <StyledLabel htmlFor="postalCode">Postal code</StyledLabel>
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
            <Actions>
              <Button type="submit" primary="yes" fullwidth="yes">
                <PaymentIcon /> Continue to payment
              </Button>
            </Actions>
          </StyledForm>
        </RevealWrapper>
      )}
    </OrderInfoBox>
  );
};

const OrderInfoBox = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
  box-shadow: ${largeShadow};
  max-height: 600px;
`;

const StyledForm = styled.form``;

const OrderTitle = styled.h2`
  margin-top: 0;
`;

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

const Actions = styled.div`
  margin-top: 10px;
`;

export default OrderInfo;
