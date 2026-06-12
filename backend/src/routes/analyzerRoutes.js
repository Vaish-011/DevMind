const express = require("express");

const auth = require("../middleware/authMiddleware");

const { analyzeRepository } = require( "../controllers/repositoryAnalyserController" );

const router = express.Router();

router.post(
  "/:repoId",
  auth,
  analyzeRepository
);

module.exports = router;