import FeaturedProducts from "@/components/HomePage/FeaturedProducts";
import NewProducts from "@/components/HomePage/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";

const HomePage = (props) => {
  return (
    <>
      <FeaturedProducts data={props.featuredProduct} />
      <NewProducts
        data={props.newProducts}
        wishedData={props.wishedNewProducts}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  const featuredProductId = "64562707467520c8651686f4";
  await mongooseConnect();

  const featuredProduct = await Product.findById(featuredProductId);

  // Fetch data mảng gồm các Product mới nhất
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });

  const newProductsIds = newProducts.map((p) => p._id.toString());

  // Fetch data mảng gồm các Product được bookmark
  const session = await getServerSession(context.req, context.res, authOptions);

  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user?.email,
        product: newProductsIds,
      })
    : [];

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((i) => i.product.toString()),
    },
  };
}

export default HomePage;
