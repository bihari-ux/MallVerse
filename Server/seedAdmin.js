import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/TestData");
    
    const email = "biharikumarrawat123@gmail.com";
    const password = "Bihari12345@";
    const hashedPassword = await bcrypt.hash(password, 10);
    
    let user = await User.findOne({ email });
    if (user) {
      user.password = hashedPassword;
      user.role = "admin";
      await user.save();
      console.log("Admin user updated successfully.");
    } else {
      user = new User({
        name: "Admin Bihari",
        email,
        password: hashedPassword,
        role: "admin",
        isVerified: true
      });
      await user.save();
      console.log("Admin user created successfully.");
    }
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
