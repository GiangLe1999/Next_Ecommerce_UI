import React from "react";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";

import Center from "../Layout/Center";
import ProductCard from "../UI/ProductCard";
import ProductsGrid from "../UI/ProductsGrid";
import TitleRow from "../UI/TitleRow";

const NewProducts = ({ data, wishedData }) => {
  return (
    <Center>
      <Wrapper>
        <TitleRow title="New Arrivals" href={"/new"} />
        <ProductsGrid>
          {data?.length > 0 &&
            data.map((product, index) => (
              <RevealWrapper key={product._id} delay={50 * index}>
                <ProductCard
                  data={product}
                  wished={wishedData.includes(product._id)}
                />
              </RevealWrapper>
            ))}
        </ProductsGrid>
      </Wrapper>
    </Center>
  );
};

const Wrapper = styled.div`
  margin-top: 40px;
`;

export default NewProducts;
