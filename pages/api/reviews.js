import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";

async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    const { title, description, stars, product } = req.body;
    res.json(await Review.create({ title, description, stars, product }));
  }

  if (req.method === "GET") {
    const { product } = req.query;
    res.json(await Review.find({ product }, null, { sort: { createdAt: -1 } }));
  }
}

export default handler;
