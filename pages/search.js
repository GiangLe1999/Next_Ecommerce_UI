import Center from "@/components/Layout/Center";
import Input from "@/components/UI/Input";
import ProductCard from "@/components/UI/ProductCard";
import ProductsGrid from "@/components/UI/ProductsGrid";
import Spinner from "@/components/UI/Spinner";
import axios from "axios";
import { RevealWrapper } from "next-reveal";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SearchPage = () => {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (phrase.trim().length > 0) {
        setIsLoading(true);
        axios
          .get(`/api/products?phrase=${encodeURIComponent(phrase)}`)
          .then((res) => {
            if (res.data.length > 0) {
              setProducts(res.data);
              setNotFound(false);
            } else {
              setProducts([]);
              setNotFound(true);
            }
            setIsLoading(false);
          });
      } else {
        setProducts([]);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [phrase]);

  return (
    <Wrapper>
      <Center>
        <SearchInput
          placeholder="Search for products..."
          autoFocus
          onChange={(e) => {
            setPhrase(e.target.value);
            setNotFound(false);
          }}
          value={phrase}
        />
        <ContentWrapper>
          {phrase === "" &&
            products.length === 0 &&
            !isLoading &&
            !notFound && (
              <>
                <RevealWrapper>
                  <p>Type to search the products you want</p>
                  <SearchPageImageWrapper>
                    <SearchPageImage
                      src={"/assets/initial-search-page.png"}
                      alt="item not found"
                      width={450}
                      height={450}
                    />
                  </SearchPageImageWrapper>
                </RevealWrapper>
              </>
            )}
          {products.length > 0 && !isLoading && !notFound && (
            <>
              <RevealWrapper delay={0}>
                <p>
                  Found {products.length} results matching{" "}
                  <b>&quot;{phrase}&quot;</b>
                </p>
              </RevealWrapper>
              <ProductsGrid>
                {products.map((p, index) => (
                  <RevealWrapper key={p._id} delay={50 * index}>
                    <ProductCard data={p} />
                  </RevealWrapper>
                ))}
              </ProductsGrid>
            </>
          )}
          {isLoading && <Spinner fullwidth="yes" />}
          {notFound && !isLoading && (
            <RevealWrapper>
              <p>
                No products were found matching <b>&quot;{phrase}&quot;</b>
              </p>
              <SearchPageImageWrapper>
                <SearchPageImage
                  src={"/assets/item-not-found.webp"}
                  alt="item not found"
                  width={450}
                  height={450}
                />
              </SearchPageImageWrapper>
            </RevealWrapper>
          )}
        </ContentWrapper>
      </Center>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 30px 0;
`;

const ContentWrapper = styled.div`
  margin-top: 20px;
  p {
    font-size: 1.3rem;
    font-weight: 400;
  }
`;

const SearchInput = styled(Input)`
  padding: 15px;
  font-size: 1rem;
  width: 100%;
`;

const SearchPageImageWrapper = styled.div`
  width: 40%;
  margin: auto;
  > div {
    position: unset !important;
  }

  @media screen and (max-width: 1024px) {
    width: 55%;
  }

  @media screen and (max-width: 767px) {
    width: 80%;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const SearchPageImage = styled(Image)`
  object-fit: contain;
  width: 90% !important;
  height: unset !important;
`;

export default SearchPage;
