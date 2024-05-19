import mongoose from "mongoose";


const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
 
    contact: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
