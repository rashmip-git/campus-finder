const express = require("express");

const router = express.Router();

const verifyMatch = require("../controllers/match/verifyMatch");

// YES / NO verification from email
router.get("/:matchId", verifyMatch);

module.exports = router;