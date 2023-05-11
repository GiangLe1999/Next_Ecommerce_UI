import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    const ids = req.body.ids;

    const cartProducts = await Product.find({ _id: ids });

    res.json(cartProducts);
  }
}
