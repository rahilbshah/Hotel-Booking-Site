import mongoose from "mongoose";
const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Hotel", ListSchema)