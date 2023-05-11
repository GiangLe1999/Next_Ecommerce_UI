import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

async function handler(req, res) {
  await mongooseConnect();

  const { categories, sort, phrase, ...filters } = req.query;

  let [sortField, sortOrder] = (sort || "").split("_");

  let productsQuery = {};

  if (categories) {
    productsQuery = { category: categories.split(",") };
  }

  if (phrase) {
    productsQuery["$or"] = [
      { title: { $regex: phrase, $options: "i" } },
      { "properties.Brand": { $regex: phrase, $options: "i" } },
    ];
  }

  const filtersNames = Object.keys(filters);

  if (filtersNames.length > 0) {
    filtersNames.forEach((filterName) => {
      const value = filters[filterName];
      productsQuery["properties." + filterName] = value;
    });
  }

  const sortObject = sort
    ? { [sortField]: sortOrder === "asc" ? 1 : -1 }
    : { _id: -1 };

  const products = await Product.find(productsQuery, null, {
    sort: sortObject,
  });

  res.json(products);
}

export default handler;
