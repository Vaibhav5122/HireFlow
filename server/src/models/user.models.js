import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    resume: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: false },
);

const User = mongoose.model("User", userSchema);

export default User;
