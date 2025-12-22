const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const email = "sahil11@gmail.com";
        const password = "Sahil@123";
        const name = "Sahil Admin";

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            existingUser.role = "admin";
            // Update password if needed, but better to leave it if they know it. 
            // However, user specifically gave a password, so let's enforce it to match their expectation.
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUser.password = hashedPassword;
            await existingUser.save();
            console.log("Existing user updated to Admin role with provided password.");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                name,
                email,
                password: hashedPassword,
                role: "admin"
            });
            console.log("New Admin user created.");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();
