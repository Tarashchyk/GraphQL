import mongoose from "mongoose";
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number
});

// authorSchema.pre('save', (req, res, next) => {

// });

export default mongoose.model("Author", authorSchema);
