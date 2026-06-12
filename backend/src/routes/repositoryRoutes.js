const express =
require("express");

const auth =
require("../middleware/authMiddleware");

const {
  getRepositories,
  saveRepository
}
=
require(
"../controllers/repositoryController"
);

const router =
express.Router();

router.get(
  "/github",
  auth,
  getRepositories
);

router.post(
  "/save",
  auth,
  saveRepository
);

module.exports =
router;