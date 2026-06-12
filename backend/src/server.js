const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const repositoryRoutes = require("./routes/repositoryRoutes");
const analyzerRoutes = require("./routes/analyzerRoutes");
const chunkRoutes = require("./routes/chunkRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/repositories", repositoryRoutes);
app.use("/api/chunks", chunkRoutes);
app.use("/api/analyze", analyzerRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DevMind API Running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});