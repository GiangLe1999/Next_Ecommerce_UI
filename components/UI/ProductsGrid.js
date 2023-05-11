import React from "react";
import styled from "styled-components";

const ProductsGrid = ({ children }) => {
  return (
    <StyledProductsGrid interval={100} delay={200}>
      {children}
    </StyledProductsGrid>
  );
};

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

export default ProductsGrid;
