import mongoose from "mongoose";

// Function to connect to MongoDB
export const connectDb = async () => {
  try {
    // Register connection events BEFORE connecting
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB connection error:", err.message);
    });

    // Connect using the URI provided in .env
    await mongoose.connect(process.env.MONGODB_URI);

  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    process.exit(1); // Stop server on connection failure
  }
};
