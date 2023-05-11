import mongoose, { model, models, Schema } from "mongoose";

const UserInfoSchema = new Schema({
  userEmail: { type: String, unique: true, required: true },
  name: String,
  email: String,
  city: String,
  postalCode: String,
  streetAddress: String,
  country: String,
});

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema);
