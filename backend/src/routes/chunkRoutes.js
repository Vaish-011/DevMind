const express = require("express");

const auth = require("../middleware/authMiddleware");

const {generateChunks}=require("../controllers/chunkController");

const router =express.Router();

router.post("/:repoId",auth,generateChunks);

module.exports = router;