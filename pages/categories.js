import React from "react";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";

import Center from "@/components/Layout/Center";
import ProductCard from "@/components/UI/ProductCard";
import ProductsGrid from "@/components/UI/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import TitleRow from "@/components/UI/TitleRow";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const CatergoriesPage = ({
  mainCategories,
  categoriesProducts,
  wishedProducts,
}) => {
  return (
    <Center>
      <Wrapper>
        {mainCategories.map((cate) => (
          <CategoryWrapper key={cate._id}>
            <TitleRow
              title={cate.name}
              href={`/category/${cate._id}`}
              showAll
            />

            <ProductsGrid>
              {categoriesProducts[cate._id].map((p, index) => (
                <RevealWrapper delay={50 * index} key={p._id}>
                  <ProductCard
                    data={p}
                    wished={wishedProducts.includes(p._id)}
                  />
                </RevealWrapper>
              ))}
            </ProductsGrid>
          </CategoryWrapper>
        ))}
      </Wrapper>
    </Center>
  );
};

export async function getServerSideProps(context) {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const mainCategoriesProducts = {};

  const wishedProducts = [];

  const session = await getServerSession(context.req, context.res, authOptions);

  for (const mainCate of mainCategories) {
    const mainCateId = mainCate._id.toString();
    const childCateIds = categories
      .filter((c) => c?.parent?.toString() === mainCateId)
      .map((c) => c._id.toString());

    const categoriesIds = [mainCateId, ...childCateIds];

    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 },
    });

    const productsIds = products.map((i) => i._id.toString());

    const w = session?.user
      ? await WishedProduct.find({
          userEmail: session?.user?.email,
          product: productsIds,
        })
      : [];

    wishedProducts.push(...w);

    mainCategoriesProducts[mainCate._id] = products;
  }

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(mainCategoriesProducts)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()),
    },
  };
}

const Wrapper = styled.div`
  padding-top: 40px;
`;

const CategoryWrapper = styled.div`
  padding-bottom: 40px;
`;

export default CatergoriesPage;
