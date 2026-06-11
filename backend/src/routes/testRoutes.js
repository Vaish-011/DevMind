const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/create-user", async (req, res) => {
  try {
    const user = await User.create({
      githubId: "123",
      username: "Muskan",
      email: "test@test.com",
      avatar: "avatar-url",
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;