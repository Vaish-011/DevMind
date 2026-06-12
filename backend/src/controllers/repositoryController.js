const axios = require("axios");

const User = require("../models/User");

const Repository = require("../models/Repository");

exports.getRepositories =
async (req, res) => {

  try {

    const user =
      await User.findById(
        req.user.id
      );

    const repos =
      await axios.get(
        `https://api.github.com/users/${user.username}/repos`
      );

    res.json(repos.data);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.saveRepository =
async (req, res) => {

  try {

    const {
      repoId,
      repoName,
      owner,
      language,
      repoUrl
    } = req.body;

    const repo =
      await Repository.create({

        userId: req.user.id,

        repoId,

        repoName,

        owner,

        language,

        repoUrl

      });

    res.json(repo);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};