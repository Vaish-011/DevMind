const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DevMind API Running"
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});