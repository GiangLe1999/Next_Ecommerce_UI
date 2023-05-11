import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { UserInfo } from "../../models/UserInfo";

async function Handler(req, res) {
  await mongooseConnect();
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "PUT") {
    //   Fetch data để tìm kiếm user có email giống với email của Session
    const userInfo = session?.user
      ? await UserInfo.findOne({ userEmail: session.user.email })
      : [];

    //   Nếu userInfo tồn tại trong database, ta thực hiện edit thông tin user
    if (userInfo) {
      res.json(await UserInfo.findByIdAndUpdate(userInfo._id, req.body));
    }
    //   Nếu userInfo không có trong database, ta thực hiện tạo mới user
    else {
      res.json(
        await UserInfo.create({ userEmail: session.user.email, ...req.body })
      );
    }
  }

  if (req.method === "GET") {
    res.json(await UserInfo.findOne({ userEmail: session?.user.email }));
  }
}

export default Handler;
