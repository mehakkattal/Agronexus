const express = require("express");
const { suggestCrop , cropSummary } = require("../apis/Gemini/GeminiController");
const { chatWithAI } = require("../apis/Gemini/AIController");

const router = express.Router();

router.post("/suggest", suggestCrop);

router.post("/summary", cropSummary);
router.post("/chat", chatWithAI);


module.exports = router;
