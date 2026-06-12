const mongoose = require("mongoose");

const repositoryContentSchema = new mongoose.Schema(
  {
    repoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repository",
      required: true
    },

    path: String,

    name: String,

    type: String,

    size: Number,

    githubUrl: String
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model(
    "RepositoryContent",
    repositoryContentSchema
  );