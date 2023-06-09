import { useContext, useState, useEffect } from "react";
import { mongooseConnect } from "@/lib/mongoose";
import styled from "styled-components";

import Center from "@/components/Layout/Center";
import { Product } from "@/models/Product";
import ProductImages from "@/components/UI/ProductImages";
import { AddToCartIcon } from "@/components/Layout/ButtonIcon";
import { CartContext } from "@/store/cart-context";
import TitleStyle from "@/components/UI/Title";
import FlyingButton from "@/components/UI/FlyingButton";
import ProductReviews from "@/components/ProductDetailPage/ProductReviews";
import { RevealWrapper } from "next-reveal";

const ProductDetailPage = ({ product }) => {
  const { addProdToCart } = useContext(CartContext);
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      <RevealWrapper>
        <Center>
          <ColumnWrapper>
            <ProductImages images={product.images} />
            <div>
              <Title>{product.title}</Title>
              <p>{product.description}</p>
              <Price>${product.price}</Price>
              {domLoaded && (
                <FlyingButton
                  primary="yess"
                  size="l"
                  onClick={() => addProdToCart(product._id)}
                  src={product.images[0]}
                >
                  <AddToCartIcon />
                  &nbsp;Add to cart
                </FlyingButton>
              )}
            </div>
          </ColumnWrapper>
        </Center>
      </RevealWrapper>
      <Center>
        <RevealWrapper>
          <ReviewsWrapper>
            <ProductReviews product={product} />
          </ReviewsWrapper>
        </RevealWrapper>
      </Center>
    </>
  );
};

const ColumnWrapper = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ReviewsWrapper = styled.div`
  margin-top: 40px;
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

export async function getServerSideProps(context) {
  await mongooseConnect();

  const { id } = context.query;

  const product = await Product.findById(id);

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}

const Title = styled.h1`
  ${TitleStyle}
`;

export default ProductDetailPage;
