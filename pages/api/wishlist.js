import { mongooseConnect } from "@/lib/mongoose";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

async function Handler(req, res) {
  await mongooseConnect();
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    const { productId } = req.body;

    const wishedDoc = session?.user
      ? await WishedProduct.findOne({
          userEmail: session?.user.email,
          product: productId,
        })
      : [];

    let newDoc;

    if (wishedDoc) {
      newDoc = await WishedProduct.findByIdAndDelete(wishedDoc._id);
    } else {
      newDoc = await WishedProduct.create({
        userEmail: session?.user?.email,
        product: productId,
      });
    }

    res.json(newDoc);
  }

  if (req.method === "GET") {
    res.json(
      await WishedProduct.find({ userEmail: session?.user.email }).populate(
        "product"
      )
    );
  }
}

export default Handler;
