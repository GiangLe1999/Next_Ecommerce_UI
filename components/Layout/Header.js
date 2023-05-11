import Link from "next/link";
import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";

import Center from "./Center";
import { CartContext } from "@/store/cart-context";
import {
  AccountIcon,
  CartIcon,
  CategoriesIcon,
  HomeIcon,
  NavMobileButton,
  ProductIcon,
  SearchIcon,
} from "./HeaderIcon";
import { primary } from "@/lib/colors";

const Header = () => {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo onClick={() => setMobileNavActive(false)} href="/">
            Ecommerce Store
          </Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href="/" onClick={() => setMobileNavActive(false)}>
              <HomeIcon />
              Home
            </NavLink>
            <NavLink href="/products" onClick={() => setMobileNavActive(false)}>
              <ProductIcon />
              All Products
            </NavLink>
            <NavLink
              href="/categories"
              onClick={() => setMobileNavActive(false)}
            >
              <CategoriesIcon />
              Categories
            </NavLink>
            <NavLink href="/account" onClick={() => setMobileNavActive(false)}>
              <AccountIcon />
              Account
            </NavLink>
            <CartNavLink href="/cart" onClick={() => setMobileNavActive(false)}>
              <CartIcon />
              Cart ({cartProducts.length})
            </CartNavLink>
          </StyledNav>
          <SideIcons>
            <NavLinkSearch
              href={"/search"}
              onClick={() => setMobileNavActive(false)}
            >
              <SearchIcon /> <p>Search</p>
            </NavLinkSearch>
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              <NavMobileButton />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background-color: ${primary};
  border-bottom: solid 1px #aaa;
  position: sticky;
  top: 0;
  z-index: 3;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;

  @media screen and (min-width: 1024px) {
    position: static;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}

  gap: 25px;
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: ${primary};
  z-index: 2;

  @media screen and (min-width: 1024px) {
    display: flex;
    position: static;
    padding: 5px 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  width: 40px;
  height: 40px;
  color: white;
  cursor: pointer;
  right: 20px;
  top: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  gap: 3px;
  padding: 10px 0;
  @media screen and (min-width: 1024px) {
    padding: 0;
  }
`;

const NavLinkSearch = styled(Link)`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  gap: 3px;
  padding: 10px 0;
  z-index: 3;

  p {
    margin: none;
    display: none;
    @media screen and (min-width: 1024px) {
      display: inline-block;
    }
  }

  svg {
    width: 25px;
    height: 25px;
    @media screen and (min-width: 1024px) {
      width: 20px;
      height: 20px;
    }
  }

  @media screen and (min-width: 1024px) {
    padding: 0;
  }
`;

const CartNavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  gap: 3px;
  width: 100px;
  padding: 10px 0;
  @media screen and (min-width: 1024px) {
    padding: 0;
  }
`;

export default Header;
