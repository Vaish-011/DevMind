const mongoose = require("mongoose");

const repositorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    repoId: {
      type: String,
      required: true
    },

    repoName: {
      type: String,
      required: true
    },

    owner: {
      type: String,
      required: true
    },

    language: {
      type: String
    },

    repoUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model(
    "Repository",
    repositorySchema
  );