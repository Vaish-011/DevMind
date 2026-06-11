const axios = require("axios");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
exports.githubLogin = async (req, res) => {

  const url =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}`;

  res.redirect(url);

};

exports.githubCallback = async (req, res) => {

  try {

    const code = req.query.code;

    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      {
        headers: {
          Accept: "application/json"
        }
      }
    );

    const accessToken =
      tokenResponse.data.access_token;

    const githubUser = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const userData = githubUser.data;

    let user = await User.findOne({
      githubId: userData.id.toString()
    });

    if (!user) {

      user = await User.create({
        githubId: userData.id.toString(),
        username: userData.login,
        avatar: userData.avatar_url,
        email: userData.email
      });

    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.redirect(
      `http://localhost:5173/dashboard?token=${token}`
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "GitHub login failed"
    });

  }

};