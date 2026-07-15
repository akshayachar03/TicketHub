import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";
import listEndpoints from "express-list-endpoints";

dotenv.config();

const PORT = process.env.PORT || 5000;

await connectDB();

console.log("=== REGISTERED ROUTES ===");
console.log(listEndpoints(app));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});