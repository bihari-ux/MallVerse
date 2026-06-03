import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const schema = new mongoose.Schema({ imageUrl: String, name: String }, { strict: false });
const Product = mongoose.model('Product', schema);

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://biharikumarrawat_db:biharikumarrawat123@cluster0.l22rnde.mongodb.net/TestData")
  .then(async () => {
    const products = await Product.find({}, 'name imageUrl').limit(15);
    console.log(JSON.stringify(products, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
