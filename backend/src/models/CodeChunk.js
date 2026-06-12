const mongoose = require("mongoose");

const codeChunkSchema = new mongoose.Schema(
  {
    repoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repository",
      required: true
    },

    filePath: String,

    chunkType: String,

    chunkName: String,

    content: String
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model(
    "CodeChunk",
    codeChunkSchema
  );