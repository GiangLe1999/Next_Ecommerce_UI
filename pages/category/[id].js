import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { mongooseConnect } from "@/lib/mongoose";
import Image from "next/image";
import { RevealWrapper } from "next-reveal";
import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]";
import Center from "@/components/Layout/Center";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/UI/ProductsGrid";
import ProductCard from "@/components/UI/ProductCard";
import TitleRow from "@/components/UI/TitleRow";
import { primary, subColor } from "@/lib/colors";
import { smallShadow } from "@/lib/boxShadow";
import Spinner from "@/components/UI/Spinner";
import { WishedProduct } from "@/models/WishedProduct";

const CategoryPage = ({
  category,
  subCategories,
  products: originalProducts,
  wishedProducts,
}) => {
  const defaultFiltersValues = category.properties.map((c) => ({
    name: c.name,
    value: "all",
  }));

  const [products, setProducts] = useState(originalProducts);
  const [filterValues, setFilterValues] = useState(defaultFiltersValues);

  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const priceSortHandler = (e) => {
    setSort(e.target.value);
  };

  const filterChangeHandler = (e, filterName) => {
    setFilterValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? e.target.value : p.value,
      }));
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
    const params = new URLSearchParams();

    params.set("categories", catIds.join(","));

    params.set("sort", sort);

    filterValues.forEach((f) => {
      if (f.value !== "all") {
        params.set(f.name, f.value);
      }
    });
    const url = `/api/products?` + params.toString();

    axios.get(url).then((res) => {
      setProducts(res.data);
      setIsLoading(false);
    });
  }, [filterValues, sort]);

  return (
    <Center>
      <Wrapper>
        <TitleRow title={category?.name} />

        {/* Filter by propeties */}
        <FilterWrapper>
          <p>Filter by Properties:</p>
          <FilterRow>
            {category.properties.map((p) => (
              <SingleFilter key={p._id}>
                <label>{p.name}</label>
                <select onChange={(e) => filterChangeHandler(e, p.name)}>
                  <option value={"all"}>Not set</option>
                  {p.value.map((v) => (
                    <option
                      value={
                        filterValues?.find((field) => field.name === v.name)
                          ?.value
                      }
                      key={v}
                    >
                      {v}
                    </option>
                  ))}
                </select>
              </SingleFilter>
            ))}
          </FilterRow>
        </FilterWrapper>

        {/* Filter by price */}
        <FilterWrapper>
          <p>Sort by Price:</p>
          <Radio onChange={(e) => priceSortHandler(e)}>
            <RadioValue>
              <input
                type="radio"
                name="sort"
                id="unset"
                value=""
                onChange={(e) => {}}
                checked={sort === ""}
              />
              <label htmlFor="unset">Unset</label>
            </RadioValue>
            <RadioValue>
              <input
                type="radio"
                name="sort"
                id="price_asc"
                value="price_asc"
                onChange={(e) => {}}
                checked={sort === "price_asc"}
              />
              <label htmlFor="price_asc">
                From smallest to largest
                <Image
                  src={
                    sort === "price_asc"
                      ? "/assets/icon/ascending-active.svg"
                      : "/assets/icon/ascending.svg"
                  }
                  alt="ascending icon"
                  width={20}
                  height={20}
                />
              </label>
            </RadioValue>
            <RadioValue>
              <input
                type="radio"
                name="sort"
                id="price_dsc"
                value="price_dsc"
                onChange={(e) => {}}
                checked={sort === "price_dsc"}
              />
              <label htmlFor="price_dsc">
                From largest to smallest
                <Image
                  src={
                    sort === "price_dsc"
                      ? "/assets/icon/descending-active.svg"
                      : "/assets/icon/descending.svg"
                  }
                  alt="descending icon"
                  width={20}
                  height={20}
                />
              </label>
            </RadioValue>
          </Radio>
        </FilterWrapper>

        {isLoading && <Spinner fullWidth />}

        {!isLoading && (
          <>
            {products.length > 0 ? (
              <ProductsGrid>
                {products.map((p, index) => (
                  <RevealWrapper delay={50 * index} key={p._id}>
                    <ProductCard
                      data={p}
                      wished={wishedProducts.includes(p._id)}
                    />
                  </RevealWrapper>
                ))}
              </ProductsGrid>
            ) : (
              <div>Sorry, no products found!</div>
            )}
          </>
        )}
      </Wrapper>
    </Center>
  );
};

const Wrapper = styled.div`
  margin-top: 40px;
`;

const FilterWrapper = styled.div`
  margin-bottom: 30px;
  padding: 20px 20px 30px 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: ${smallShadow};

  p {
    margin-top: 0;
    color: ${subColor};
  }
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 25px;
  row-gap: 15px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Radio = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 25px;
  row-gap: 15px;

  @media screen and (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

const RadioValue = styled.div`
  input[type="radio"] {
    display: none;
  }

  label {
    background-color: #eee;
    font-size: 0.8rem;
    position: relative;
    color: initial;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    padding: 10px 40px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    &::before {
      position: absolute;
      content: "";
      height: 15px;
      width: 15px;
      top: 50%;
      transform: translateY(-50%);
      left: 15px;
      border: 1px solid #979797;
      border-radius: 50%;
    }
  }

  input[type="radio"]:checked + label {
    background-color: ${primary};
    color: white;
    border-color: ${primary};
    svg {
      color: white;
    }
  }

  input[type="radio"]:checked + label::before {
    height: 10px;
    width: 10px;
    border: 3px solid white;
    background-color: ${primary};
  }
`;

const SingleFilter = styled.div`
  label {
    display: block;
    font-size: 0.9rem;
    font-weight: bold;
    width: 15%;
    margin-bottom: 5px;
  }

  select {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid transparent;
    background-color: #eee;

    &:focus,
    &:focus-visible {
      border: 1px solid #565656;
      outline: none;
    }
  }
`;

export async function getServerSideProps(context) {
  const { id } = context.query;

  await mongooseConnect();

  const category = await Category.findById(id);

  const subCategories = await Category.find({ parent: category._id });
  const subCategoriesIds = subCategories.map((s) => s._id.toString());

  const catIds = [category._id.toString(), ...subCategoriesIds];

  const products = await Product.find({ category: catIds });

  const productsIds = products.map((p) => p._id.toString());

  const session = await getServerSession(context.req, context.res, authOptions);

  const wishedProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user?.email,
        product: productsIds,
      })
    : [];

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()),
    },
  };
}

export default CategoryPage;
