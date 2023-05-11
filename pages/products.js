import { mongooseConnect } from "@/lib/mongoose";
import React from "react";
import { RevealWrapper } from "next-reveal";

import Center from "@/components/Layout/Center";
import { Product } from "@/models/Product";
import ProductCard from "@/components/UI/ProductCard";
import ProductsGrid from "@/components/UI/ProductsGrid";
import styled from "styled-components";
import TitleRow from "@/components/UI/TitleRow";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const ProductsPage = ({ data, wishedProducts }) => {
  return (
    <Center>
      <Wrapper>
        <TitleRow title="All Products" showAll={false} />
        <ProductsGrid>
          {data?.length > 0 &&
            data.map((product, index) => (
              <RevealWrapper key={product._id} delay={50 * index}>
                <ProductCard
                  data={product}
                  wished={wishedProducts.includes(product._id.toString())}
                />
              </RevealWrapper>
            ))}
        </ProductsGrid>
      </Wrapper>
    </Center>
  );
};

export async function getServerSideProps(context) {
  await mongooseConnect();

  const allProducts = await Product.find({}, null, { sort: { _id: -1 } });

  const session = await getServerSession(context.req, context.res, authOptions);

  const wishedProducts = session?.user
    ? await WishedProduct.find({ userEmail: session.user?.email })
    : [];

  return {
    props: {
      data: JSON.parse(JSON.stringify(allProducts)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()),
    },
  };
}

const Wrapper = styled.div`
  padding-top: 40px;
`;

export default ProductsPage;
