const express = require("express");
const { suggestCrop , cropSummary } = require("../apis/Gemini/GeminiController");

const router = express.Router();

router.post("/suggest", suggestCrop);

router.post("/summary", cropSummary);


module.exports = router;
