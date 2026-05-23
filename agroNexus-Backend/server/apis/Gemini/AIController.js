const { generateResponse } = require("../../services/geminiService");

exports.chatWithAI = async (req, res) => {
  try {
    const { message, role } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    let systemContext = "";

    if (role === "farmer") {
      systemContext = `
      You are an agricultural expert helping farmers.when frmers ask
      Provide practical advice about crops, land preparation,
      fertilizers, irrigation, pest control and seasonal planning.
      give only minimal and important answers okay and anything related agriulture okay
      `;
    }

    if (role === "user") {
      systemContext = `
      You are an assistant helping users understand
      agriculture services, crop availability,
      and how to book farmers.
      `;
    }

    const prompt = `
    ${systemContext}
    User Question: ${message}
    Answer clearly and practically.
    `;

    const aiReply = await generateResponse(prompt);

    res.json({
      success: true,
      reply: aiReply
    });

  } catch (error) {
    console.error("AI Chat Error:", error.message);
    res.status(500).json({
      success: false,
      message: "AI failed"
    });
  }
};